import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  ArrowUpRight, 
  Heart, 
  MapPin, 
  Layers
} from 'lucide-react';
import './FavoritesDrawer.css';

export default function FavoritesDrawer() {
  const { 
    properties, 
    favorites, 
    toggleFavorite, 
    isFavoritesDrawerOpen, 
    setIsFavoritesDrawerOpen, 
    setSelectedProperty, 
    openScheduleModal,
    toggleCompare,
    compareList,
    setActiveView 
  } = useApp();

  if (!isFavoritesDrawerOpen) return null;

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={() => setIsFavoritesDrawerOpen(false)}>
      <aside className="favorites-drawer-shell" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Heart size={18} className="fav-title-heart" fill="currentColor" />
            <h3 className="drawer-title">SAVED COLLECTION</h3>
            <span className="fav-counter-badge">{savedProperties.length}</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsFavoritesDrawerOpen(false)}
            aria-label="Close saved collection"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-body">
          {savedProperties.length === 0 ? (
            <div className="empty-fav-box">
              <Heart size={40} className="empty-heart-icon" />
              <h4>Your Collection is Empty</h4>
              <p>
                Click the heart icon on any residence to curate your private portfolio of prospective acquisitions.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setIsFavoritesDrawerOpen(false);
                  setActiveView('properties');
                }}
              >
                EXPLORE PROPERTIES
              </button>
            </div>
          ) : (
            <div className="fav-list-items">
              {savedProperties.map((prop) => {
                const isCompared = compareList.includes(prop.id);
                return (
                  <div key={prop.id} className="fav-card-item glass-panel">
                    <img src={prop.images[0]} alt={prop.title} className="fav-card-img" />

                    <div className="fav-card-info">
                      <div className="fav-loc">
                        <MapPin size={12} />
                        <span>{prop.location.area}, {prop.location.city}</span>
                      </div>
                      <h4 
                        className="fav-title"
                        onClick={() => {
                          setIsFavoritesDrawerOpen(false);
                          setSelectedProperty(prop);
                        }}
                      >
                        {prop.title}
                      </h4>
                      <div className="fav-price">{prop.formattedPrice}</div>

                      <div className="fav-actions-row">
                        <button
                          type="button"
                          className="fav-view-btn"
                          onClick={() => {
                            setIsFavoritesDrawerOpen(false);
                            setSelectedProperty(prop);
                          }}
                        >
                          <span>View</span>
                          <ArrowUpRight size={13} />
                        </button>

                        <button
                          type="button"
                          className={`fav-compare-btn ${isCompared ? 'active' : ''}`}
                          onClick={() => toggleCompare(prop.id)}
                          title="Add to comparison"
                        >
                          <Layers size={13} />
                          <span>{isCompared ? 'Compared' : 'Compare'}</span>
                        </button>

                        <button
                          type="button"
                          className="fav-remove-btn"
                          onClick={() => toggleFavorite(prop.id)}
                          title="Remove from saved collection"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedProperties.length > 0 && (
          <div className="drawer-footer">
            <button
              type="button"
              className="drawer-cta-btn"
              onClick={() => {
                setIsFavoritesDrawerOpen(false);
                openScheduleModal(savedProperties[0]);
              }}
            >
              SCHEDULE PRIVATE ATELIER VIEWING
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
