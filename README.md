# VERTEX HORIZON // Architectural Landmark & Luxury Sky Residences

![Vertex Horizon](https://img.shields.io/badge/VERTEX-HORIZON-d4af37?style=for-the-badge&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP 3](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

**VERTEX HORIZON** is a state-of-the-art ultra-luxury real estate web application curated for high-net-worth individuals, institutional investors, and discerning private clients. Centered around Hyderabad's Financial District architectural landmarks, the platform marries cinematic visual engineering with high-performance real estate technology.

---

## ✨ Key Features

- **4K Architectural Blueprint Transformation**: Cinematic hero canvas showcasing the metamorphosis of wireframe blueprint geometry into a 24-storey double-glazed glass monolith with animated nocturnal light trails.
- **Master Inventory & Multi-View Explorer**:
  - Filter across price tiers, property typologies (Sky Penthouses, Ridge Mansions, Sky Villas, Commercial Monoliths), and metropolitan locations.
  - Switch seamlessly between **Grid View**, **List View**, and **Interactive Map View**.
- **Side-by-Side Property Comparison Matrix**:
  - Benchmarks up to 4 properties side-by-side across valuations, price per sq.ft, carpet areas, RERA registration, and 9+ luxury amenities.
  - Fully responsive with touch-enabled horizontal scrolling.
- **Private Client CRM & Executive Admin Portal**:
  - Live lead pipeline management (New, Contacted, Site Visit Scheduled, Negotiation, Converted).
  - Inventory CRUD management with instantaneous portfolio recalculation.
  - Assigned private banking partners and director desks.
- **High-Net-Worth Financial Calculators**:
  - Bespoke super-luxury mortgage amortization modeling.
  - 10-year Capital Appreciation & Rental Yield ROI forecast models.
- **Private Client Services & Schedule Visit Modal**:
  - Direct WhatsApp and telephone connectivity to managing directors.
  - VIP Atelier site visit scheduler generating encrypted passcodes.
  - Private collection drawer for saved architectural properties.
- **Precision Atelier Design System**:
  - Bespoke vector **Vertex Horizon** emblem and favicon.
  - Smooth inertia scrolling powered by Lenis + GSAP ScrollTrigger ticker synchronization.
  - Fault-tolerant luxury **ErrorBoundary** fallback system.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Motion & Scroll** | [GSAP 3.15](https://greensock.com/gsap/) + ScrollTrigger, [Lenis 1.3](https://lenis.darkroom.engineering/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Styling** | Vanilla CSS Design Tokens (Custom Luxury Palette & HSL Glassmorphism) |
| **Linter** | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (0 errors, 0 warnings) |
| **Hosting** | [Netlify](https://www.netlify.com/) (configured via `netlify.toml` and `_redirects`) |

---

## 📁 Repository Structure

```
Estate/
├── dist/                          # Production bundle (generated on build)
├── public/
│   ├── _redirects                 # Netlify SPA redirect rules
│   ├── favicon.svg                # Official Vertex Horizon vector emblem
│   ├── frames/                    # 4K transformation frames
│   ├── images/                    # High-resolution architectural photography
│   └── videos/                    # 4K looping video monoliths
├── src/
│   ├── animations/                # GSAP ScrollTrigger & counter controllers
│   ├── assets/                    # Static branding vectors
│   ├── components/
│   │   ├── About/                 # Heritage manifesto & metrics
│   │   ├── Admin/                 # Executive CRM governance portal
│   │   ├── ArchitectureStory/     # Technical curtain-wall engineering
│   │   ├── Auth/                  # Private Client Portal login & registration
│   │   ├── Calculators/           # Mortgage & ROI financial models
│   │   ├── common/                # VertexLogo, ErrorBoundary, ToastContainer
│   │   ├── CTA/                   # Final call-to-action & Schedule Modal
│   │   ├── Dashboard/             # Private client saved portfolio
│   │   ├── Favorites/             # Drawer for saved properties
│   │   ├── Footer/                # Atelier closing footer & legal compliance
│   │   ├── Hero/                  # 4K video canvas & quick concierge search
│   │   ├── Location/              # Transit times & connectivity radar
│   │   ├── Locations/             # Metropolitan destination discovery
│   │   ├── maps/                  # Interactive pinpoint radar map
│   │   ├── Navbar/                # Global glass header & mobile drawer
│   │   ├── Projects/              # Flagship towers showcase
│   │   ├── PropertyCompare/       # Side-by-side technical comparison table
│   │   ├── PropertyDetail/        # Comprehensive property modal & floorplans
│   │   ├── PropertyIntro/         # Project overview split showcase
│   │   ├── PropertyListing/       # Master inventory directory & views
│   │   ├── PropertySearch/        # Advanced multi-parameter search bar
│   │   ├── PropertyShowcase/      # Horizontal scroll cards track
│   │   ├── PropertyStats/         # Animated engineering statistics
│   │   ├── Services/              # Private client advisory services
│   │   └── WireframeBuilding/     # Video player & boulevard light trails canvas
│   ├── context/                   # Global React state (AppContext)
│   ├── data/                      # Initial properties, projects & CRM mock data
│   ├── pages/                     # Primary Home page view router
│   ├── styles/                    # Global CSS variables, reset & responsive rules
│   ├── App.jsx                    # Root component with Lenis scroll sync
│   └── main.jsx                   # React entry point with ErrorBoundary
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML root entry with SEO tags & favicon
├── netlify.toml                   # Netlify build configuration & HTTP headers
├── package.json                   # Project metadata & scripts
└── vite.config.js                 # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 1. Installation

Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Run Local Development Server

Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Code Quality / Linting

Run Oxlint to check code quality:
```bash
npm run lint
```

### 4. Build for Production

Compile minified production assets into the `dist/` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Netlify

This project is pre-configured with:
- **`netlify.toml`**: Configures publish directory (`dist`), build command (`npm run build`), SPA rewrite rules (`/* -> /index.html 200`), and performance caching headers for assets and videos.
- **`public/_redirects`**: Automatically copied to `dist/_redirects` as a failsafe for Netlify client-side routing.

### Option 1: Deploy via GitHub (Continuous Deployment)

1. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Vertex Horizon luxury real estate application"
   ```

2. **Push to your GitHub repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

3. **Link to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com/).
   - Click **Add new site** → **Import an existing project**.
   - Select **GitHub** and choose your repository.
   - Netlify will automatically detect settings from `netlify.toml`:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click **Deploy site**.

---

### Option 2: Deploy via Netlify CLI

If you prefer to deploy directly from your terminal:

1. **Install Netlify CLI** (or run via npx):
   ```bash
   npx netlify login
   ```

2. **Initialize and Link Site**:
   ```bash
   npx netlify init
   ```

3. **Deploy Production Build**:
   ```bash
   npm run build
   npx netlify deploy --prod --dir=dist
   ```

---

### Option 3: Manual Drag & Drop Deployment

1. Run the production build command:
   ```bash
   npm run build
   ```
2. Navigate to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated **`dist`** folder into the browser window.
4. Your site will be live within seconds with custom Netlify domain and HTTPS.

---

## 📄 License & Governance

© 2026 VERTEX HORIZON ATELIER. All Rights Reserved.  
Registered RERA Telangana: **TS-RERA: P02400005821**.
