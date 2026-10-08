import { createClient } from '@libsql/client';
import { INITIAL_PROPERTIES } from '../src/data/propertiesData.js';
import { PROJECTS_DATA } from '../src/data/projectsData.js';
import { LOCATIONS_DATA } from '../src/data/locationsData.js';
import { SERVICES_DATA } from '../src/data/servicesData.js';
import { INITIAL_LEADS, INITIAL_AGENTS } from '../src/data/crmData.js';

const url = 'libsql://vertexh-virinchi-2003.aws-ap-south-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTE0NDM5NjYsImlkIjoiMDFhMTFhNjEtODMwMS03MzU2LWJjNjMtMTkxZDIwZWY4OWRjIiwia2lkIjoiYzdhbkp0dS1RNE1rRUtCYlNEMlJ5TjI0X2ZsT3lZSE5qSmZHeS1PWTRfayIsInJpZCI6IjM0YzJkOGU4LWIwMTMtNDEwYi1hMzE4LTZlMmEwYWFhMGU3NyJ9.s2AaVYzrJFu7OAErNIMhHcQN_PDzgR1wjpXhVdAwq3B_Xiwhs1dxdwl6RD6pWn2i1Lddqw_Vi7JVRD5qNSH2BQ';

const client = createClient({
  url,
  authToken,
});

async function seed() {
  console.log('🚀 Initializing Turso Database for VERTEX HORIZON...');

  // 1. Create Tables
  console.log('📦 Creating schema tables...');

  await client.execute(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT,
      tagline TEXT,
      price REAL,
      formatted_price TEXT,
      price_per_sqft TEXT,
      listing_type TEXT,
      type TEXT,
      category TEXT,
      is_featured INTEGER DEFAULT 1,
      status TEXT,
      possession_date TEXT,
      location_json TEXT,
      specs_json TEXT,
      images_json TEXT,
      video_url TEXT,
      virtual_tour INTEGER DEFAULT 0,
      description TEXT,
      highlights_json TEXT,
      amenities_json TEXT,
      agent_json TEXT,
      nearby_landmarks_json TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT,
      tagline TEXT,
      city TEXT,
      location TEXT,
      developer TEXT,
      starting_price TEXT,
      price_numeric REAL,
      configurations TEXT,
      total_units INTEGER,
      available_units INTEGER,
      possession_date TEXT,
      hero_image TEXT,
      secondary_images_json TEXT,
      video_url TEXT,
      story TEXT,
      features_json TEXT,
      rera_number TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      state TEXT,
      property_count INTEGER,
      avg_price_per_sqft TEXT,
      appreciation_rate TEXT,
      popular_types TEXT,
      image TEXT,
      description TEXT,
      neighborhoods_json TEXT
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      icon TEXT,
      description TEXT,
      perks_json TEXT
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      property_name TEXT,
      property_id TEXT,
      budget TEXT,
      source TEXT,
      stage TEXT,
      follow_up_date TEXT,
      assigned_agent TEXT,
      notes TEXT,
      priority TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT,
      phone TEXT,
      whatsapp TEXT,
      email TEXT,
      experience TEXT,
      active_listings INTEGER,
      rating REAL,
      avatar TEXT,
      specialties_json TEXT
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id TEXT,
      property_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, property_id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS site_visits (
      id TEXT PRIMARY KEY,
      reservation_code TEXT UNIQUE,
      customer_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      property_id TEXT,
      property_name TEXT,
      visit_date TEXT,
      time_slot TEXT,
      guests TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('✅ Tables created successfully.');

  // 2. Seed Properties
  console.log(`🌱 Seeding ${INITIAL_PROPERTIES.length} properties...`);
  for (const p of INITIAL_PROPERTIES) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO properties (
        id, title, slug, tagline, price, formatted_price, price_per_sqft,
        listing_type, type, category, is_featured, status, possession_date,
        location_json, specs_json, images_json, video_url, virtual_tour,
        description, highlights_json, amenities_json, agent_json, nearby_landmarks_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id,
        p.title,
        p.slug,
        p.tagline || '',
        p.price,
        p.formattedPrice,
        p.pricePerSqft,
        p.listingType,
        p.type,
        p.category,
        p.isFeatured ? 1 : 0,
        p.status,
        p.possessionDate,
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
  }

  // 3. Seed Projects
  console.log(`🌱 Seeding ${PROJECTS_DATA.length} flagship projects...`);
  for (const pr of PROJECTS_DATA) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO projects (
        id, name, slug, tagline, city, location, developer, starting_price,
        price_numeric, configurations, total_units, available_units, possession_date,
        hero_image, secondary_images_json, video_url, story, features_json, rera_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        pr.id,
        pr.name,
        pr.slug,
        pr.tagline || '',
        pr.city,
        pr.location,
        pr.developer,
        pr.startingPrice,
        pr.priceNumeric,
        pr.configurations,
        pr.totalUnits,
        pr.availableUnits,
        pr.possessionDate,
        pr.heroImage,
        JSON.stringify(pr.secondaryImages || []),
        pr.videoUrl || '',
        pr.story || '',
        JSON.stringify(pr.features || []),
        pr.reraNumber || '',
      ],
    });
  }

  // 4. Seed Locations
  console.log(`🌱 Seeding ${LOCATIONS_DATA.length} metro locations...`);
  for (const loc of LOCATIONS_DATA) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO locations (
        id, name, state, property_count, avg_price_per_sqft, appreciation_rate,
        popular_types, image, description, neighborhoods_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        loc.id,
        loc.name,
        loc.state,
        loc.propertyCount,
        loc.avgPricePerSqft,
        loc.appreciationRate,
        loc.popularTypes,
        loc.image,
        loc.description,
        JSON.stringify(loc.neighborhoods || []),
      ],
    });
  }

  // 5. Seed Services
  console.log(`🌱 Seeding ${SERVICES_DATA.length} bespoke services...`);
  for (const s of SERVICES_DATA) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO services (
        id, title, subtitle, icon, description, perks_json
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        s.id,
        s.title,
        s.subtitle,
        s.icon,
        s.description,
        JSON.stringify(s.perks || []),
      ],
    });
  }

  // 6. Seed Leads
  console.log(`🌱 Seeding ${INITIAL_LEADS.length} CRM leads...`);
  for (const l of INITIAL_LEADS) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO leads (
        id, customer_name, phone, email, property_name, property_id,
        budget, source, stage, follow_up_date, assigned_agent, notes, priority, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        l.id,
        l.customerName,
        l.phone,
        l.email,
        l.propertyName,
        l.propertyId,
        l.budget,
        l.source,
        l.stage,
        l.followUpDate,
        l.assignedAgent,
        l.notes,
        l.priority,
        l.createdAt || new Date().toISOString(),
      ],
    });
  }

  // 7. Seed Agents
  console.log(`🌱 Seeding ${INITIAL_AGENTS.length} private partners & agents...`);
  for (const a of INITIAL_AGENTS) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO agents (
        id, name, title, phone, whatsapp, email, experience,
        active_listings, rating, avatar, specialties_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        a.id,
        a.name,
        a.title,
        a.phone,
        a.whatsapp,
        a.email,
        a.experience,
        a.activeListings,
        a.rating,
        a.avatar,
        JSON.stringify(a.specialties || []),
      ],
    });
  }

  // 8. Verification Counts
  const [propCount, projCount, locCount, srvCount, leadCount, agentCount] = await Promise.all([
    client.execute('SELECT COUNT(*) as count FROM properties'),
    client.execute('SELECT COUNT(*) as count FROM projects'),
    client.execute('SELECT COUNT(*) as count FROM locations'),
    client.execute('SELECT COUNT(*) as count FROM services'),
    client.execute('SELECT COUNT(*) as count FROM leads'),
    client.execute('SELECT COUNT(*) as count FROM agents'),
  ]);

  console.log('\n📊 DATABASE SEEDING COMPLETE & VERIFIED:');
  console.log(`   - Properties: ${propCount.rows[0].count}`);
  console.log(`   - Projects:   ${projCount.rows[0].count}`);
  console.log(`   - Locations:  ${locCount.rows[0].count}`);
  console.log(`   - Services:   ${srvCount.rows[0].count}`);
  console.log(`   - Leads:      ${leadCount.rows[0].count}`);
  console.log(`   - Agents:     ${agentCount.rows[0].count}`);
  console.log('✨ All tables and records synchronized in Turso cloud!\n');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
