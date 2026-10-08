import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES } from '../data/propertiesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SERVICES_DATA } from '../data/servicesData';
import { INITIAL_LEADS, INITIAL_AGENTS, CRM_METRICS } from '../data/crmData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Theme State (Luxury Obsidian & Midnight Sapphire Dark Theme)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('vertex_theme');
    if (!saved || saved === 'light') {
      localStorage.setItem('vertex_theme', 'dark');
      return 'dark';
    }
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('vertex_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Active Page View Mode
  const [activeView, setActiveView] = useState('home');

  // 3. Properties State (supports Admin CRUD)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_properties_v2');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vertex_properties_v2', JSON.stringify(properties));
    } catch (e) {
      console.warn('Storage limit for properties:', e);
    }
  }, [properties]);

  // 4. Projects, Locations, Services, Agents
  const [projects] = useState(PROJECTS_DATA);
  const [locations] = useState(LOCATIONS_DATA);
  const [services] = useState(SERVICES_DATA);
  const [agents] = useState(INITIAL_AGENTS);

  // 5. CRM Leads State
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_crm_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vertex_crm_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Storage limit for leads:', e);
    }
  }, [leads]);

  // 6. Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  useEffect(() => {
    localStorage.setItem('vertex_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed from Collection', 'Property removed from your private portfolio.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Saved to Collection', 'Property added to your private portfolio.', 'success');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  // 7. Property Comparison State (Up to 4 properties)
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        addToast('Removed from Comparison', 'Property removed from comparison matrix.', 'info');
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        addToast('Comparison Limit Reached', 'You can compare up to 4 properties simultaneously.', 'warning');
        return prev;
      }
      addToast('Added to Comparison', 'Property ready in side-by-side comparison matrix.', 'success');
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // 8. Selected Property for Detail Modal
  const [selectedProperty, setSelectedProperty] = useState(null);

  // 9. Search & Filter State
  const defaultFilters = {
    keyword: '',
    listingType: 'all', // 'all', 'buy', 'rent'
    propertyType: 'all',
    city: 'all',
    minPrice: 0,
    maxPrice: 800000000,
    bhk: 'all',
    status: 'all',
    amenities: [],
    sortOption: 'featured', // 'featured', 'price-asc', 'price-desc', 'sqft-desc'
  };

  const [searchFilters, setSearchFilters] = useState(defaultFilters);

  const setFilter = (key, value) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchFilters(defaultFilters);
    addToast('Filters Reset', 'Displaying all available curated properties.', 'info');
  };

  // 10. Filtered Properties Selector
  const filteredProperties = properties.filter((prop) => {
    // Keyword
    if (searchFilters.keyword.trim()) {
      const q = searchFilters.keyword.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q) ||
        prop.location.area.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Listing Type (Buy / Rent)
    if (searchFilters.listingType !== 'all' && prop.listingType !== searchFilters.listingType) {
      return false;
    }

    // Property Type
    if (searchFilters.propertyType !== 'all' && prop.type !== searchFilters.propertyType) {
      return false;
    }

    // City
    if (searchFilters.city !== 'all' && prop.location.city.toLowerCase() !== searchFilters.city.toLowerCase()) {
      return false;
    }

    // BHK
    if (searchFilters.bhk !== 'all') {
      if (!prop.specs.bhk || !prop.specs.bhk.includes(searchFilters.bhk)) {
        return false;
      }
    }

    // Status
    if (searchFilters.status !== 'all' && prop.status !== searchFilters.status) {
      return false;
    }

    // Price
    if (prop.price < searchFilters.minPrice || prop.price > searchFilters.maxPrice) {
      return false;
    }

    // Amenities
    if (searchFilters.amenities.length > 0) {
      const hasAll = searchFilters.amenities.every((amenity) =>
        prop.amenities && prop.amenities.includes(amenity)
      );
      if (!hasAll) return false;
    }

    return true;
  }).sort((a, b) => {
    if (searchFilters.sortOption === 'price-asc') return a.price - b.price;
    if (searchFilters.sortOption === 'price-desc') return b.price - a.price;
    if (searchFilters.sortOption === 'sqft-desc') return (b.specs.builtUpSqft || 0) - (a.specs.builtUpSqft || 0);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  // 11. User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (role = 'buyer', customData = {}) => {
    let user;
    if (role === 'admin') {
      user = {
        id: 'usr-admin-1',
        name: 'Lord Alistair Sterling',
        email: 'governance@vertexhorizon.com',
        role: 'admin',
        avatar: '/images/cta_tower.jpg',
        title: 'Master Portfolio Administrator',
      };
    } else if (role === 'agent') {
      user = {
        id: 'agent-1',
        name: 'Vikramaditya Singhania',
        email: 'vikram.singhania@vertexhorizon.com',
        role: 'agent',
        avatar: '/images/cta_tower.jpg',
        title: 'Senior Managing Director · Ultra-Luxury',
      };
    } else {
      user = {
        id: 'usr-buyer-1',
        name: customData.name || 'Aarav Singhania',
        email: customData.email || 'aarav.singhania@apexcapital.in',
        role: 'buyer',
        avatar: '/images/property_penthouse.jpg',
        title: 'Private Client · Accredited Investor',
      };
    }
    setCurrentUser(user);
    localStorage.setItem('vertex_auth_user', JSON.stringify(user));
    addToast('Authentication Granted', `Welcome back, ${user.name}.`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vertex_auth_user');
    addToast('Signed Out', 'Your session has been securely ended.', 'info');
  };

  // 12. Modal States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState(null);

  const openScheduleModal = (targetProperty = null) => {
    setScheduleTarget(targetProperty);
    setIsScheduleOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleOpen(false);
    setScheduleTarget(null);
  };

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryTarget, setEnquiryTarget] = useState(null);

  const openEnquiryModal = (targetProperty = null) => {
    setEnquiryTarget(targetProperty);
    setIsEnquiryOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryOpen(false);
    setEnquiryTarget(null);
  };

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

  // 13. Toast Notification Engine
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 14. Admin & CRM Actions
  const addProperty = (newProp) => {
    const id = `prop-${Date.now()}`;
    const formatted = {
      ...newProp,
      id,
      slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      viewsCount: 0,
      favoriteCount: 0,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setProperties((prev) => [formatted, ...prev]);
    addToast('Property Published', `${newProp.title} has been added to the master inventory.`, 'success');
  };

  const updateProperty = (id, updatedFields) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    addToast('Property Updated', 'Modifications saved successfully.', 'success');
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((item) => item.id !== id));
    addToast('Property Removed', 'The listing has been permanently deleted.', 'info');
  };

  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      priority: leadData.priority || 'High',
      stage: leadData.stage || 'New',
    };
    setLeads((prev) => [newLead, ...prev]);
    addToast('Lead Recorded', 'Inquiry entered into CRM pipeline with high priority.', 'success');
  };

  const updateLeadStage = (leadId, nextStage) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, stage: nextStage } : lead))
    );
    addToast('CRM Pipeline Updated', `Lead moved to: ${nextStage}`, 'success');
  };

  const addLeadNote = (leadId, note) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        return {
          ...lead,
          notes: lead.notes ? `${lead.notes} | ${note}` : note,
        };
      })
    );
    addToast('Note Appended', 'Follow-up log saved to lead profile.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeView,
        setActiveView,
        properties,
        filteredProperties,
        projects,
        locations,
        services,
        agents,
        leads,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        selectedProperty,
        setSelectedProperty,
        searchFilters,
        setFilter,
        resetFilters,
        currentUser,
        login,
        logout,
        isScheduleOpen,
        scheduleTarget,
        openScheduleModal,
        closeScheduleModal,
        isEnquiryOpen,
        enquiryTarget,
        openEnquiryModal,
        closeEnquiryModal,
        isAuthOpen,
        setIsAuthOpen,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        toasts,
        addToast,
        removeToast,
        addProperty,
        updateProperty,
        deleteProperty,
        addLead,
        updateLeadStage,
        addLeadNote,
        metrics: CRM_METRICS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
