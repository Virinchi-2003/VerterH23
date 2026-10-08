import { createClient } from '@libsql/client/web';

const TURSO_URL = 
  import.meta.env?.VITE_TURSO_DATABASE_URL || 
  'https://vertexh-virinchi-2003.aws-ap-south-1.turso.io';

const TURSO_AUTH_TOKEN = 
  import.meta.env?.VITE_TURSO_AUTH_TOKEN || 
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTE0NDM5NjYsImlkIjoiMDFhMTFhNjEtODMwMS03MzU2LWJjNjMtMTkxZDIwZWY4OWRjIiwia2lkIjoiYzdhbkp0dS1RNE1rRUtCYlNEMlJ5TjI0X2ZsT3lZSE5qSmZHeS1PWTRfayIsInJpZCI6IjM0YzJkOGU4LWIwMTMtNDEwYi1hMzE4LTZlMmEwYWFhMGU3NyJ9.s2AaVYzrJFu7OAErNIMhHcQN_PDzgR1wjpXhVdAwq3B_Xiwhs1dxdwl6RD6pWn2i1Lddqw_Vi7JVRD5qNSH2BQ';

// Ensure URL is HTTPS for browser LibSQL web client
const normalizedUrl = TURSO_URL.replace(/^libsql:\/\//, 'https://');

export const turso = createClient({
  url: normalizedUrl,
  authToken: TURSO_AUTH_TOKEN,
});

/**
 * Fetch all properties from Turso database
 */
export async function getDbProperties() {
  try {
    const res = await turso.execute('SELECT * FROM properties ORDER BY is_featured DESC, price DESC');
    return res.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      tagline: r.tagline,
      price: Number(r.price),
      formattedPrice: r.formatted_price,
      pricePerSqft: r.price_per_sqft,
      listingType: r.listing_type,
      type: r.type,
      category: r.category,
      isFeatured: Boolean(r.is_featured),
      status: r.status,
      possessionDate: r.possession_date,
      location: r.location_json ? JSON.parse(r.location_json) : {},
      specs: r.specs_json ? JSON.parse(r.specs_json) : {},
      images: r.images_json ? JSON.parse(r.images_json) : [],
      videoUrl: r.video_url,
      virtualTour: Boolean(r.virtual_tour),
      description: r.description,
      highlights: r.highlights_json ? JSON.parse(r.highlights_json) : [],
      amenities: r.amenities_json ? JSON.parse(r.amenities_json) : [],
      agent: r.agent_json ? JSON.parse(r.agent_json) : null,
      nearbyLandmarks: r.nearby_landmarks_json ? JSON.parse(r.nearby_landmarks_json) : [],
    }));
  } catch (err) {
    console.warn('Turso: Could not fetch properties, falling back to local cache', err);
    return null;
  }
}

/**
 * Fetch all projects from Turso database
 */
export async function getDbProjects() {
  try {
    const res = await turso.execute('SELECT * FROM projects ORDER BY price_numeric ASC');
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      tagline: r.tagline,
      city: r.city,
      location: r.location,
      developer: r.developer,
      startingPrice: r.starting_price,
      priceNumeric: Number(r.price_numeric),
      configurations: r.configurations,
      totalUnits: Number(r.total_units),
      availableUnits: Number(r.available_units),
      possessionDate: r.possession_date,
      heroImage: r.hero_image,
      secondaryImages: r.secondary_images_json ? JSON.parse(r.secondary_images_json) : [],
      videoUrl: r.video_url,
      story: r.story,
      features: r.features_json ? JSON.parse(r.features_json) : [],
      reraNumber: r.rera_number,
    }));
  } catch (err) {
    console.warn('Turso: Could not fetch projects, falling back to local cache', err);
    return null;
  }
}

/**
 * Fetch all locations from Turso database
 */
export async function getDbLocations() {
  try {
    const res = await turso.execute('SELECT * FROM locations');
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      state: r.state,
      propertyCount: Number(r.property_count),
      avgPricePerSqft: r.avg_price_per_sqft,
      appreciationRate: r.appreciation_rate,
      popularTypes: r.popular_types,
      image: r.image,
      description: r.description,
      neighborhoods: r.neighborhoods_json ? JSON.parse(r.neighborhoods_json) : [],
    }));
  } catch (err) {
    console.warn('Turso: Could not fetch locations', err);
    return null;
  }
}

/**
 * Fetch all CRM leads from Turso database
 */
export async function getDbLeads() {
  try {
    const res = await turso.execute('SELECT * FROM leads ORDER BY created_at DESC');
    return res.rows.map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      phone: r.phone,
      email: r.email,
      propertyName: r.property_name,
      propertyId: r.property_id,
      budget: r.budget,
      source: r.source,
      stage: r.stage,
      followUpDate: r.follow_up_date,
      assignedAgent: r.assigned_agent,
      notes: r.notes,
      priority: r.priority,
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.warn('Turso: Could not fetch leads', err);
    return null;
  }
}

/**
 * Save new lead into Turso database
 */
export async function insertDbLead(lead) {
  try {
    const id = lead.id || `lead-${Date.now()}`;
    await turso.execute({
      sql: `INSERT INTO leads (
        id, customer_name, phone, email, property_name, property_id,
        budget, source, stage, follow_up_date, assigned_agent, notes, priority, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        lead.customerName,
        lead.phone || '',
        lead.email || '',
        lead.propertyName || '',
        lead.propertyId || '',
        lead.budget || 'Private Client',
        lead.source || 'Website Experience',
        lead.stage || 'New',
        lead.followUpDate || '',
        lead.assignedAgent || 'Vikramaditya Singhania',
        lead.notes || '',
        lead.priority || 'High',
        lead.createdAt || new Date().toISOString(),
      ],
    });
    return { ...lead, id };
  } catch (err) {
    console.error('Turso: Failed to insert lead', err);
    return lead;
  }
}

/**
 * Record a VIP Site Visit into Turso database
 */
export async function insertDbSiteVisit(visit) {
  try {
    const id = `visit-${Date.now()}`;
    await turso.execute({
      sql: `INSERT INTO site_visits (
        id, reservation_code, customer_name, email, phone,
        property_id, property_name, visit_date, time_slot, guests, message, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        visit.reservationCode,
        visit.name,
        visit.email || '',
        visit.phone || '',
        visit.propertyId || '',
        visit.propertyName || '',
        visit.date || '',
        visit.slot || '',
        visit.guests || '2 Guests',
        visit.message || '',
        new Date().toISOString(),
      ],
    });
    return true;
  } catch (err) {
    console.error('Turso: Failed to insert site visit', err);
    return false;
  }
}

/**
 * Save a new property into Turso database
 */
export async function insertDbProperty(p) {
  try {
    const id = p.id || `prop-${Date.now()}`;
    await turso.execute({
      sql: `INSERT INTO properties (
        id, title, slug, tagline, price, formatted_price, price_per_sqft,
        listing_type, type, category, is_featured, status, possession_date,
        location_json, specs_json, images_json, video_url, virtual_tour,
        description, highlights_json, amenities_json, agent_json, nearby_landmarks_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        p.title,
        p.slug || '',
        p.tagline || '',
        Number(p.price || 0),
        p.formattedPrice || '',
        p.pricePerSqft || '',
        p.listingType || 'buy',
        p.type || 'Sky Penthouse',
        p.category || 'Luxury',
        p.isFeatured ? 1 : 0,
        p.status || 'Ready to Move',
        p.possessionDate || 'Immediate',
        JSON.stringify(p.location || {}),
        JSON.stringify(p.specs || {}),
        JSON.stringify(p.images || []),
        p.videoUrl || '',
        p.virtualTour ? 1 : 0,
        p.description || '',
        JSON.stringify(p.highlights || []),
        JSON.stringify(p.amenities || []),
        JSON.stringify(p.agent || {}),
        JSON.stringify(p.nearbyLandmarks || []),
      ],
    });
    return { ...p, id };
  } catch (err) {
    console.error('Turso: Failed to insert property', err);
    return p;
  }
}

/**
 * Update an existing property in Turso database
 */
export async function updateDbProperty(id, updates) {
  try {
    await turso.execute({
      sql: `UPDATE properties SET 
        title = COALESCE(?, title),
        price = COALESCE(?, price),
        formatted_price = COALESCE(?, formatted_price),
        price_per_sqft = COALESCE(?, price_per_sqft),
        status = COALESCE(?, status),
        location_json = COALESCE(?, location_json),
        specs_json = COALESCE(?, specs_json),
        updated_at = datetime('now')
      WHERE id = ?`,
      args: [
        updates.title || null,
        updates.price ? Number(updates.price) : null,
        updates.formattedPrice || null,
        updates.pricePerSqft || null,
        updates.status || null,
        updates.location ? JSON.stringify(updates.location) : null,
        updates.specs ? JSON.stringify(updates.specs) : null,
        id,
      ],
    });
    return true;
  } catch (err) {
    console.error('Turso: Failed to update property', err);
    return false;
  }
}

/**
 * Delete a property from Turso database
 */
export async function deleteDbProperty(id) {
  try {
    await turso.execute({
      sql: 'DELETE FROM properties WHERE id = ?',
      args: [id],
    });
    return true;
  } catch (err) {
    console.error('Turso: Failed to delete property', err);
    return false;
  }
}

/**
 * Update lead stage in Turso database
 */
export async function updateDbLeadStage(id, stage) {
  try {
    await turso.execute({
      sql: 'UPDATE leads SET stage = ? WHERE id = ?',
      args: [stage, id],
    });
    return true;
  } catch (err) {
    console.error('Turso: Failed to update lead stage', err);
    return false;
  }
}

/**
 * Add note to a lead in Turso database
 */
export async function addDbLeadNote(id, noteText) {
  try {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const formatted = `\n[${timestamp}] ${noteText}`;
    await turso.execute({
      sql: 'UPDATE leads SET notes = notes || ? WHERE id = ?',
      args: [formatted, id],
    });
    return true;
  } catch (err) {
    console.error('Turso: Failed to add lead note', err);
    return false;
  }
}
