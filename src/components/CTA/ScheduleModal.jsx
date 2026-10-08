import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Calendar, Clock, User, Mail, Phone, Building, ArrowUpRight } from 'lucide-react';

export default function ScheduleModal() {
  const { 
    isScheduleOpen, 
    closeScheduleModal, 
    scheduleTarget, 
    properties, 
    addLead 
  } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    propertyName: '',
    slot: 'Twilight Golden Hour (05:30 PM)',
    date: '2026-10-15',
    guests: '2 Guests',
    message: '',
  });

  useEffect(() => {
    if (isScheduleOpen) {
      setSubmitted(false);
      const initialProp = scheduleTarget || properties[0];
      setFormData((prev) => ({
        ...prev,
        propertyId: initialProp ? initialProp.id : '',
        propertyName: initialProp ? initialProp.title : 'The Celestial Sky Penthouse',
      }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isScheduleOpen, scheduleTarget, properties]);

  if (!isScheduleOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `VIP-VH-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);

    // Save lead into CRM with pipeline stage 'Site Visit Scheduled'
    addLead({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: formData.propertyName,
      propertyId: formData.propertyId,
      budget: 'Accredited HNI',
      source: 'Direct Site Visit Booking',
      stage: 'Site Visit Scheduled',
      followUpDate: formData.date,
      assignedAgent: 'Vikramaditya Singhania',
      notes: `Site visit scheduled for ${formData.date} at ${formData.slot}. Party size: ${formData.guests}. Message: ${formData.message || 'None'}. Pass: ${code}`,
      priority: 'High',
    });

    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={closeScheduleModal}>
      <div className="modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeScheduleModal} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <div className="modal-content-form">
            <div className="modal-header">
              <span className="meta-tag">PRIVATE ATELIER PREVIEW</span>
              <h3 className="modal-title">SCHEDULE PRIVATE SITE VISIT</h3>
              <p className="modal-desc">
                Experience VERTEX HORIZON firsthand with an exclusive private architectural tour accompanied by our Managing Directors.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label><User size={14} /> Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label><Mail size={14} /> Corporate / Personal Email</label>
                  <input
                    type="email"
                    required
                    placeholder="reddy@apexcapital.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label><Phone size={14} /> WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label><Building size={14} /> Residence / Landmark Interested In</label>
                <select
                  value={formData.propertyName}
                  onChange={(e) => {
                    const found = properties.find((p) => p.title === e.target.value);
                    setFormData({
                      ...formData,
                      propertyName: e.target.value,
                      propertyId: found ? found.id : '',
                    });
                  }}
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.formattedPrice}) · {p.location.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label><Calendar size={14} /> Preferred Visit Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label><Clock size={14} /> Curated Viewing Slot</label>
                  <select
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                  >
                    <option>Morning Architectural Daylight (10:30 AM)</option>
                    <option>Afternoon Technical Briefing (02:30 PM)</option>
                    <option>Twilight Golden Hour (05:30 PM)</option>
                    <option>Night Sky Starlight Preview (07:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Private Delegation Size</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option>1 Principal</option>
                  <option>2 Guests (Principal & Spouse)</option>
                  <option>Family Delegation (3-5 Guests)</option>
                  <option>Corporate Advisory Board</option>
                </select>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <span>CONFIRM PRIVATE VISIT RESERVATION</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="modal-success-state">
            <CheckCircle size={56} className="success-icon" />
            <h3 className="success-title">VISIT SCHEDULED SUCCESSFULLY</h3>
            <p className="success-text">
              Thank you, <strong>{formData.name}</strong>. Your private viewing invitation for <strong>{formData.propertyName}</strong> has been confirmed for <strong>{formData.date}</strong> during the <strong>{formData.slot}</strong>.
            </p>
            <div className="reservation-code-box">
              <span>VIP RESERVATION IDENTIFIER:</span>
              <strong>{reservationCode}</strong>
            </div>
            <p className="success-sub">
              A private chauffeur briefing and confirmation has been dispatched to {formData.email}.
            </p>
            <button className="btn-primary" onClick={closeScheduleModal}>
              <span>RETURN TO EXPLORATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
