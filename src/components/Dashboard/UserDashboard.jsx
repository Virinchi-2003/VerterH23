import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Heart, 
  Calendar, 
  LogOut, 
  ArrowUpRight, 
  ShieldCheck, 
  Trash2
} from 'lucide-react';
import './UserDashboard.css';

export default function UserDashboard() {
  const { 
    currentUser, 
    logout, 
    properties, 
    favorites, 
    toggleFavorite, 
    setSelectedProperty, 
    leads, 
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'visits' | 'agents'

  if (!currentUser) {
    return (
      <section className="dashboard-section empty-auth">
        <div className="container">
          <div className="empty-auth-card glass-panel">
            <User size={48} className="empty-auth-icon" />
            <h2>Private Client Session Inactive</h2>
            <p>Please authenticate to access your portfolio dashboard, scheduled site viewings, and personal private banker contacts.</p>
            <button className="btn-primary" onClick={() => setActiveView('home')}>
              RETURN TO ATELIER
            </button>
          </div>
        </div>
      </section>
    );
  }

  const savedListings = properties.filter((p) => favorites.includes(p.id));
  const userLeads = leads.filter(
    (l) => l.email === currentUser.email || l.customerName?.toLowerCase().includes(currentUser.name?.toLowerCase())
  );

  return (
    <section className="dashboard-section" id="user-dashboard-section">
      <div className="container">
        {/* Profile Banner */}
        <div className="user-profile-banner glass-panel">
          <div className="user-avatar-circle">
            <User size={32} />
          </div>

          <div className="user-banner-meta">
            <div className="user-tier-tag">
              <ShieldCheck size={13} />
              <span>ACCREDITED INVESTOR · PRIVATE CLIENT TIER</span>
            </div>
            <h1 className="user-full-name">{currentUser.name}</h1>
            <p className="user-contact-email">{currentUser.email} • {currentUser.title}</p>
          </div>

          <div className="user-banner-actions">
            <button
              type="button"
              className="btn-secondary logout-btn"
              onClick={logout}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs-row">
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart size={15} />
            <span>Saved Portfolio ({savedListings.length})</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'visits' ? 'active' : ''}`}
            onClick={() => setActiveTab('visits')}
          >
            <Calendar size={15} />
            <span>Scheduled Viewings & Inquiries ({userLeads.length})</span>
          </button>
        </div>

        {/* Tab 1: Saved Properties */}
        {activeTab === 'saved' && (
          <div className="dash-tab-content">
            {savedListings.length === 0 ? (
              <div className="dash-empty-box glass-panel">
                <Heart size={36} />
                <h3>No Properties Saved Yet</h3>
                <p>Browse our curated architectural inventory and save properties to build your portfolio.</p>
                <button className="btn-primary" onClick={() => setActiveView('properties')}>
                  EXPLORE PROPERTIES
                </button>
              </div>
            ) : (
              <div className="dash-properties-grid">
                {savedListings.map((prop) => (
                  <div key={prop.id} className="dash-prop-card glass-panel">
                    <img src={prop.images[0]} alt={prop.title} className="dash-prop-img" />
                    <div className="dash-prop-body">
                      <span className="dash-prop-cat">{prop.category}</span>
                      <h4 className="dash-prop-title" onClick={() => setSelectedProperty(prop)}>
                        {prop.title}
                      </h4>
                      <div className="dash-prop-price">{prop.formattedPrice}</div>
                      <p className="dash-prop-loc">{prop.location.area}, {prop.location.city}</p>

                      <div className="dash-prop-actions">
                        <button
                          type="button"
                          className="dash-view-btn"
                          onClick={() => setSelectedProperty(prop)}
                        >
                          <span>Explore Residence</span>
                          <ArrowUpRight size={14} />
                        </button>
                        <button
                          type="button"
                          className="dash-remove-btn"
                          onClick={() => toggleFavorite(prop.id)}
                          title="Remove from saved"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Scheduled Visits */}
        {activeTab === 'visits' && (
          <div className="dash-tab-content">
            {userLeads.length === 0 ? (
              <div className="dash-empty-box glass-panel">
                <Calendar size={36} />
                <h3>No Active Site Bookings</h3>
                <p>You have not scheduled any private viewings yet. Reserve a twilight architectural preview on any property.</p>
                <button className="btn-primary" onClick={() => setActiveView('properties')}>
                  BROWSE RESIDENCES
                </button>
              </div>
            ) : (
              <div className="visits-table-wrapper glass-panel">
                <table className="visits-table">
                  <thead>
                    <tr>
                      <th>Property Interested</th>
                      <th>Viewing Date / Slot</th>
                      <th>Assigned Director</th>
                      <th>Pipeline Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <strong>{lead.propertyName}</strong>
                        </td>
                        <td>{lead.followUpDate || 'Confirmed Slot'}</td>
                        <td>{lead.assignedAgent}</td>
                        <td>
                          <span className="status-badge-chip">{lead.stage}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="dash-table-btn"
                            onClick={() => {
                              const found = properties.find((p) => p.id === lead.propertyId || p.title === lead.propertyName);
                              if (found) setSelectedProperty(found);
                            }}
                          >
                            View Property
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
