import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Users, 
  Layers, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  BarChart3, 
  ArrowUpRight,
  X,
  MessageSquare
} from 'lucide-react';
import './AdminPortal.css';

const CRM_STAGES = [
  'New',
  'Contacted',
  'Interested',
  'Site Visit Scheduled',
  'Negotiation',
  'Converted',
  'Closed',
];

export default function AdminPortal() {
  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    projects, 
    leads, 
    updateLeadStage, 
    addLeadNote, 
    agents, 
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState('crm'); // 'crm' | 'properties' | 'projects' | 'agents' | 'analytics'
  const [leadFilterStage, setLeadFilterStage] = useState('all');
  const [selectedLeadForNote, setSelectedLeadForNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Add Property Modal State
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [newPropData, setNewPropData] = useState({
    title: '',
    formattedPrice: '₹15.0 Cr',
    price: 150000000,
    pricePerSqft: '₹20,000 / sq.ft',
    listingType: 'buy',
    type: 'Sky Penthouse',
    category: 'Luxury',
    status: 'Ready to Move',
    city: 'Hyderabad',
    area: 'Financial District',
    bhk: '5 BHK',
    builtUpSqft: 7500,
    carpetSqft: 6200,
    baths: 5,
    parking: 3,
    description: '',
    possessionDate: 'Immediate Possession',
  });

  const handleCreateProperty = (e) => {
    e.preventDefault();
    if (!newPropData.title) return;

    if (editingProperty) {
      updateProperty(editingProperty.id, {
        title: newPropData.title,
        formattedPrice: newPropData.formattedPrice,
        price: Number(newPropData.price),
        pricePerSqft: newPropData.pricePerSqft,
        listingType: newPropData.listingType,
        type: newPropData.type,
        category: newPropData.category,
        status: newPropData.status,
        possessionDate: newPropData.possessionDate,
        location: {
          ...editingProperty.location,
          city: newPropData.city,
          area: newPropData.area,
        },
        specs: {
          ...editingProperty.specs,
          bhk: newPropData.bhk,
          builtUpSqft: Number(newPropData.builtUpSqft),
          carpetSqft: Number(newPropData.carpetSqft),
          baths: Number(newPropData.baths),
          parking: Number(newPropData.parking),
        },
        description: newPropData.description || editingProperty.description,
      });
      setEditingProperty(null);
    } else {
      addProperty({
        title: newPropData.title,
        formattedPrice: newPropData.formattedPrice,
        price: Number(newPropData.price),
        pricePerSqft: newPropData.pricePerSqft,
        listingType: newPropData.listingType,
        type: newPropData.type,
        category: newPropData.category,
        isFeatured: true,
        status: newPropData.status,
        possessionDate: newPropData.possessionDate,
        location: {
          city: newPropData.city,
          area: newPropData.area,
          state: 'Telangana',
          address: `${newPropData.area}, ${newPropData.city}`,
          lat: 17.4401,
          lng: 78.3489,
        },
        specs: {
          bhk: newPropData.bhk,
          beds: 5,
          baths: Number(newPropData.baths),
          builtUpSqft: Number(newPropData.builtUpSqft),
          carpetSqft: Number(newPropData.carpetSqft),
          parking: Number(newPropData.parking),
          floor: 18,
          totalFloors: 25,
          facing: 'North-East',
          furnishing: 'Designer Turnkey Furnished',
          reraId: 'P02400009988',
        },
        images: [
          '/images/property_penthouse.jpg',
          '/images/property_atrium.jpg',
          '/images/architecture_story.jpg',
        ],
        videoUrl: '/videos/hero_building_transform.mp4',
        virtualTour: true,
        description: newPropData.description || 'Architectural masterwork constructed with floor-to-ceiling acoustic glass curtain walls and private biometric elevators.',
        highlights: [
          'Panoramic skyline vistas over central business district',
          'Triple-height entertaining salon with Italian Calacatta marble',
          'Private cantilevered infinity plunge pool and sundeck',
        ],
        amenities: [
          'Private Infinity Pool',
          'Private Elevator',
          'Concierge 24/7',
          'Smart Home Automation',
          'Italian Marble',
          '3-Tier Biometric Security',
        ],
        agent: agents[0],
      });
    }

    setIsAddPropertyOpen(false);
  };

  const handleOpenEdit = (prop) => {
    setEditingProperty(prop);
    setNewPropData({
      title: prop.title,
      formattedPrice: prop.formattedPrice,
      price: prop.price,
      pricePerSqft: prop.pricePerSqft,
      listingType: prop.listingType,
      type: prop.type,
      category: prop.category,
      status: prop.status,
      city: prop.location.city,
      area: prop.location.area,
      bhk: prop.specs.bhk,
      builtUpSqft: prop.specs.builtUpSqft || 6000,
      carpetSqft: prop.specs.carpetSqft || 5000,
      baths: prop.specs.baths || 4,
      parking: prop.specs.parking || 3,
      description: prop.description,
      possessionDate: prop.possessionDate,
    });
    setIsAddPropertyOpen(true);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLeadForNote) return;
    addLeadNote(selectedLeadForNote.id, newNoteText.trim());
    setNewNoteText('');
    setSelectedLeadForNote(null);
  };

  const filteredLeads = leadFilterStage === 'all'
    ? leads
    : leads.filter((l) => l.stage === leadFilterStage);

  return (
    <section className="admin-portal-section" id="admin-portal-section">
      <div className="container">
        {/* Top Header & Fast Switch */}
        <div className="admin-top-header">
          <div>
            <div className="meta-tag">
              <span className="tag-dot"></span>
              <span>EXECUTIVE GOVERNANCE CONSOLE</span>
            </div>
            <h1 className="admin-portal-title">REAL ESTATE CRM & ADMIN PORTAL</h1>
            <p className="admin-portal-sub">
              Manage inventory, oversee high-value lead pipelines, assign partners, and analyze portfolio metrics.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setEditingProperty(null);
                setIsAddPropertyOpen(true);
              }}
            >
              <Plus size={16} />
              <span>NEW LISTING</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setActiveView('home')}
            >
              <span>RETURN TO FRONTEND</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Stats Ribbon */}
        <div className="admin-kpi-ribbon">
          <div className="kpi-card glass-panel">
            <div className="kpi-header">
              <span className="kpi-lbl">Total Inventory Valuation</span>
              <DollarSign size={16} className="kpi-icon" />
            </div>
            <div className="kpi-num gold">₹2,480 Cr</div>
            <span className="kpi-sub">+18.5% YoY Portfolio Growth</span>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-header">
              <span className="kpi-lbl">Active Properties</span>
              <Building size={16} className="kpi-icon" />
            </div>
            <div className="kpi-num">{properties.length} Listings</div>
            <span className="kpi-sub">Across 7 Global Metros</span>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-header">
              <span className="kpi-lbl">Total CRM Pipeline Leads</span>
              <Users size={16} className="kpi-icon" />
            </div>
            <div className="kpi-num">{leads.length} Active Leads</div>
            <span className="kpi-sub">{leads.filter(l => l.stage === 'New').length} New Enquiries Awaiting Call</span>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-header">
              <span className="kpi-lbl">Lead Conversion Rate</span>
              <TrendingUp size={16} className="kpi-icon" />
            </div>
            <div className="kpi-num gold">22.4%</div>
            <span className="kpi-sub">Avg 42 Days to Closing</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <Users size={15} />
            <span>LEADS & CRM PIPELINE ({leads.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <Building size={15} />
            <span>PROPERTIES MANAGEMENT ({properties.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Layers size={15} />
            <span>FLAGSHIP PROJECTS ({projects.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'agents' ? 'active' : ''}`}
            onClick={() => setActiveTab('agents')}
          >
            <ShieldCheck size={15} />
            <span>MANAGING PARTNERS ({agents.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={15} />
            <span>PORTFOLIO ANALYTICS</span>
          </button>
        </div>

        {/* TAB 1: CRM LEADS & PIPELINE */}
        {activeTab === 'crm' && (
          <div className="admin-tab-pane">
            <div className="pane-control-bar">
              <div className="stage-filter-pills">
                <button
                  type="button"
                  className={`stage-pill ${leadFilterStage === 'all' ? 'active' : ''}`}
                  onClick={() => setLeadFilterStage('all')}
                >
                  All ({leads.length})
                </button>
                {CRM_STAGES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`stage-pill ${leadFilterStage === st ? 'active' : ''}`}
                    onClick={() => setLeadFilterStage(st)}
                  >
                    {st} ({leads.filter((l) => l.stage === st).length})
                  </button>
                ))}
              </div>
            </div>

            <div className="leads-table-shell glass-panel">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Customer Name & Contact</th>
                    <th>Property Interested</th>
                    <th>Source & Budget</th>
                    <th>Pipeline Stage</th>
                    <th>Follow-Up Date</th>
                    <th>Assigned Director</th>
                    <th>Actions & Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="client-name-cell">
                          <strong>{lead.customerName}</strong>
                          <span className="client-contact">{lead.phone} • {lead.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className="prop-name-tag">{lead.propertyName}</span>
                      </td>
                      <td>
                        <div className="source-budget-cell">
                          <span className="lead-src">{lead.source}</span>
                          <span className="lead-budget">{lead.budget}</span>
                        </div>
                      </td>
                      <td>
                        <select
                          value={lead.stage}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                          className={`stage-select-box stage-${lead.stage.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {CRM_STAGES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div className="followup-date-cell">
                          <Calendar size={13} />
                          <span>{lead.followUpDate || 'Pending'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="agent-tag">{lead.assignedAgent}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="table-action-icon-btn"
                          onClick={() => setSelectedLeadForNote(lead)}
                          title="View / Append Notes"
                        >
                          <MessageSquare size={15} />
                          <span>Notes</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTIES INVENTORY CRUD */}
        {activeTab === 'properties' && (
          <div className="admin-tab-pane">
            <div className="leads-table-shell glass-panel">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Property Title</th>
                    <th>Location</th>
                    <th>Typology & BHK</th>
                    <th>Valuation</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop.id}>
                      <td>
                        <div className="prop-table-title-cell">
                          <img src={prop.images[0]} alt={prop.title} className="table-thumb" />
                          <div>
                            <strong>{prop.title}</strong>
                            <span className="table-prop-cat">{prop.category}</span>
                          </div>
                        </div>
                      </td>
                      <td>{prop.location.area}, {prop.location.city}</td>
                      <td>{prop.type} • {prop.specs.bhk || 'Commercial'}</td>
                      <td>
                        <strong className="table-price">{prop.formattedPrice}</strong>
                      </td>
                      <td>
                        <span className="status-chip">{prop.status}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`featured-toggle-btn ${prop.isFeatured ? 'is-feat' : ''}`}
                          onClick={() => updateProperty(prop.id, { isFeatured: !prop.isFeatured })}
                        >
                          {prop.isFeatured ? 'Featured ★' : 'Standard'}
                        </button>
                      </td>
                      <td>
                        <div className="table-actions-cluster">
                          <button
                            type="button"
                            className="table-icon-btn edit"
                            onClick={() => handleOpenEdit(prop)}
                            title="Edit Listing"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            className="table-icon-btn delete"
                            onClick={() => deleteProperty(prop.id)}
                            title="Delete Listing"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="admin-tab-pane">
            <div className="projects-admin-grid">
              {projects.map((proj) => (
                <div key={proj.id} className="project-admin-card glass-panel">
                  <img src={proj.heroImage} alt={proj.name} className="proj-card-img" />
                  <div className="proj-card-content">
                    <h3>{proj.name}</h3>
                    <p className="proj-dev-text">{proj.developer} • {proj.location}</p>
                    <div className="proj-specs-row">
                      <span>Starting: <strong>{proj.startingPrice}</strong></span>
                      <span>Inventory: <strong>{proj.availableUnits} / {proj.totalUnits}</strong></span>
                    </div>
                    <span className="proj-rera-chip">RERA: {proj.reraNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MANAGING PARTNERS */}
        {activeTab === 'agents' && (
          <div className="admin-tab-pane">
            <div className="agents-admin-grid">
              {agents.map((ag) => (
                <div key={ag.id} className="agent-admin-card glass-panel">
                  <div className="agent-avatar-circle">
                    <ShieldCheck size={28} />
                  </div>
                  <h3>{ag.name}</h3>
                  <span className="agent-card-title">{ag.title}</span>
                  <div className="agent-contacts-box">
                    <span><Phone size={13} /> {ag.phone}</span>
                    <span><Mail size={13} /> {ag.email}</span>
                  </div>
                  <div className="agent-meta-ribbon">
                    <span>{ag.activeListings} Active Listings</span>
                    <span>★ {ag.rating} Rating</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PORTFOLIO ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="admin-tab-pane">
            <div className="analytics-bi-grid">
              <div className="chart-card glass-panel">
                <h3 className="chart-title">MONTHLY HIGH-NET-WORTH INQUIRY VELOCITY</h3>
                <div className="mock-bar-chart">
                  {[
                    { m: 'May', h: 45, l: 31 },
                    { m: 'Jun', h: 60, l: 42 },
                    { m: 'Jul', h: 70, l: 56 },
                    { m: 'Aug', h: 85, l: 68 },
                    { m: 'Sep', h: 95, l: 82 },
                    { m: 'Oct', h: 100, l: 94 },
                  ].map((bar, idx) => (
                    <div key={idx} className="bar-column">
                      <div className="bar-fill" style={{ height: `${bar.h}%` }}>
                        <span className="bar-val">{bar.l}</span>
                      </div>
                      <span className="bar-lbl">{bar.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card glass-panel">
                <h3 className="chart-title">ASSET TYPOLOGY DISTRIBUTION</h3>
                <div className="distribution-bars-list">
                  {[
                    { label: 'Sky Penthouses', pct: 40, count: '₹980 Cr' },
                    { label: 'Luxury Ridge Villas', pct: 32, count: '₹790 Cr' },
                    { label: 'Waterfront Estates', pct: 18, count: '₹450 Cr' },
                    { label: 'Commercial Monoliths', pct: 10, count: '₹260 Cr' },
                  ].map((item, idx) => (
                    <div key={idx} className="dist-item">
                      <div className="dist-labels">
                        <span>{item.label}</span>
                        <strong>{item.count} ({item.pct}%)</strong>
                      </div>
                      <div className="dist-track">
                        <div className="dist-fill" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD / EDIT PROPERTY MODAL */}
        {isAddPropertyOpen && (
          <div className="modal-overlay" onClick={() => setIsAddPropertyOpen(false)}>
            <div className="modal-container admin-prop-modal glass-panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingProperty ? 'EDIT PROPERTY LISTING' : 'CREATE NEW LUXURY LISTING'}</h3>
                <button type="button" className="auth-close-btn" onClick={() => setIsAddPropertyOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateProperty} className="admin-form">
                <div className="form-group">
                  <label>Property Name / Landmark</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Apex Horizon Villa"
                    value={newPropData.title}
                    onChange={(e) => setNewPropData({ ...newPropData, title: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Formatted Price</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹22.5 Cr"
                      value={newPropData.formattedPrice}
                      onChange={(e) => setNewPropData({ ...newPropData, formattedPrice: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Numeric Price (INR)</label>
                    <input
                      type="number"
                      required
                      placeholder="225000000"
                      value={newPropData.price}
                      onChange={(e) => setNewPropData({ ...newPropData, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      value={newPropData.city}
                      onChange={(e) => setNewPropData({ ...newPropData, city: e.target.value })}
                    >
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Dubai">Dubai</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Neighborhood / Area</label>
                    <input
                      type="text"
                      required
                      placeholder="Financial District"
                      value={newPropData.area}
                      onChange={(e) => setNewPropData({ ...newPropData, area: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Typology</label>
                    <select
                      value={newPropData.type}
                      onChange={(e) => setNewPropData({ ...newPropData, type: e.target.value })}
                    >
                      <option value="Sky Penthouse">Sky Penthouse</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Waterfront Estate">Waterfront Estate</option>
                      <option value="Commercial Monolith">Commercial Monolith</option>
                      <option value="Land / Plot">Land / Plot</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Configuration</label>
                    <select
                      value={newPropData.bhk}
                      onChange={(e) => setNewPropData({ ...newPropData, bhk: e.target.value })}
                    >
                      <option value="4 BHK">4 BHK</option>
                      <option value="5 BHK">5 BHK</option>
                      <option value="6 BHK">6+ BHK</option>
                      <option value="Commercial Floors">Commercial Floors</option>
                      <option value="Estate Land">Estate Land</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Built-Up Sq.Ft</label>
                    <input
                      type="number"
                      required
                      placeholder="7500"
                      value={newPropData.builtUpSqft}
                      onChange={(e) => setNewPropData({ ...newPropData, builtUpSqft: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Possession Timeline</label>
                    <input
                      type="text"
                      placeholder="Immediate Possession"
                      value={newPropData.possessionDate}
                      onChange={(e) => setNewPropData({ ...newPropData, possessionDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Architectural Narrative</label>
                  <textarea
                    rows={3}
                    placeholder="Enter architectural highlights, materials, and view descriptions..."
                    value={newPropData.description}
                    onChange={(e) => setNewPropData({ ...newPropData, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  <span>{editingProperty ? 'SAVE MODIFICATIONS' : 'PUBLISH TO MASTER INVENTORY'}</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* LEAD NOTES MODAL */}
        {selectedLeadForNote && (
          <div className="modal-overlay" onClick={() => setSelectedLeadForNote(null)}>
            <div className="modal-container lead-note-modal glass-panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>CRM ACTIVITY LOG: {selectedLeadForNote.customerName}</h3>
                <button type="button" className="auth-close-btn" onClick={() => setSelectedLeadForNote(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="lead-note-body">
                <div className="lead-quick-info">
                  <p><strong>Property:</strong> {selectedLeadForNote.propertyName}</p>
                  <p><strong>Stage:</strong> {selectedLeadForNote.stage}</p>
                  <p><strong>Contact:</strong> {selectedLeadForNote.phone} | {selectedLeadForNote.email}</p>
                </div>

                <div className="existing-notes-box">
                  <h4>Recorded Conversation Notes:</h4>
                  <p>{selectedLeadForNote.notes || 'No prior notes logged.'}</p>
                </div>

                <form onSubmit={handleSaveNote} className="append-note-form">
                  <label>Append Follow-Up Conversation Note</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Conducted twilight preview with family. Client expressed strong interest in 24th floor triplex..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                  />
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                    <span>SAVE LOG NOTE</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
