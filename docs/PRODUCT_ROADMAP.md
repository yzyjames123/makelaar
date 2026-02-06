# Makelaar Product Roadmap

> Helping expats find their Dutch home - faster, smarter, stress-free

## Vision

Transform from a lead generation platform into the **#1 resource for expats buying homes in the Netherlands** by providing tools and intelligence that no other platform offers.

## Success Metrics

| Metric | Current | Target (6 months) |
|--------|---------|-------------------|
| Monthly active users | TBD | 5,000 |
| Intake form completions | TBD | 500/month |
| Property alerts sent | 0 | 10,000/month |
| Calculator usage | 0 | 2,000/month |

---

## Phase 1: Quick Wins (Weeks 1-2)

### 1.1 Mortgage Calculator
**Route:** `/calculator/mortgage`
**Priority:** P0 | **Effort:** 3 days

Calculate maximum mortgage for expats with Dutch-specific rules.

**Features:**
- Gross annual salary input
- Contract type (permanent, temporary, self-employed)
- 30% ruling toggle (major impact on affordability)
- Partner income option
- Down payment amount
- Scenario comparison (with/without 30% ruling)

**Output:**
- Maximum mortgage amount
- Monthly payment estimate
- Loan-to-value ratio
- Affordability warning if over-stretched

**Files:**
- `src/app/calculator/mortgage/page.tsx`
- `src/app/api/calculator/mortgage/route.ts`
- `src/components/calculators/mortgage-form.tsx`
- `src/components/calculators/mortgage-results.tsx`

---

### 1.2 Total Cost Calculator
**Route:** `/calculator/costs`
**Priority:** P0 | **Effort:** 2 days

Show all hidden costs of buying a property in NL.

**Features:**
- Purchase price input
- Buyer type (first-time buyer, investor)
- Property type (existing, new construction)
- Itemized cost breakdown

**Cost Categories:**
| Cost | Typical Amount |
|------|---------------|
| Transfer tax (overdrachtsbelasting) | 0% first-time (<€510k), 2% regular, 10.4% investor |
| Notary fees (notariskosten) | €1,500 - €2,500 |
| Valuation report (taxatierapport) | €500 - €800 |
| Mortgage advisor | €2,000 - €3,500 |
| Buyers' agent (aankoopmakelaar) | 1-2% of price |
| Building inspection | €300 - €500 |
| Bank guarantee | €250 - €500 |
| NHG (if applicable) | 0.6% of mortgage |

**Files:**
- `src/app/calculator/costs/page.tsx`
- `src/app/api/calculator/costs/route.ts`
- `src/components/calculators/cost-form.tsx`
- `src/components/calculators/cost-breakdown.tsx`

---

### 1.3 School Finder
**Route:** `/schools`
**Priority:** P1 | **Effort:** 3 days

Database of international schools in the Netherlands.

**Features:**
- Map view with school markers
- Filter by curriculum (IB, British, American, French, German)
- Filter by grade levels (Primary, Secondary, K-12)
- Filter by city/region
- Tuition range filter
- Distance from address search

**Data per school:**
- Name, address, coordinates
- Curriculum type
- Grade levels
- Annual tuition
- Website, contact info
- Waiting list status (if known)

**Initial Data:** ~50 international schools (manually curated)

**Files:**
- `src/app/schools/page.tsx`
- `src/data/schools.json`
- `src/components/schools/school-map.tsx`
- `src/components/schools/school-card.tsx`
- `src/components/schools/school-filters.tsx`

---

## Phase 2: Property Discovery (Weeks 3-5)

### 2.1 Property Database Schema
**Priority:** P0 | **Effort:** 1 day

New database tables for property data.

**Tables:**
```sql
properties
├── id (UUID)
├── external_id (source reference)
├── source (funda, jaap, pararius)
├── url
├── title
├── description
├── price
├── price_per_sqm
├── address, city, postcode
├── latitude, longitude
├── bedrooms, bathrooms
├── living_area_sqm
├── plot_size_sqm
├── property_type
├── year_built
├── energy_label
├── photos (array)
├── status (active, sold, delisted)
├── listed_at
├── scraped_at
└── timestamps

user_saved_properties
├── id
├── user_id → user
├── property_id → properties
├── notes
├── viewing_date
├── rating (1-5)
└── timestamps

property_alerts
├── id
├── user_id → user (nullable for intake profiles)
├── intake_profile_id → intake_profiles (nullable)
├── regions (array)
├── min_price, max_price
├── min_bedrooms
├── property_types (array)
├── frequency (instant, daily, weekly)
├── is_active
└── timestamps
```

**Files:**
- `src/lib/schema.ts` (update)

---

### 2.2 Property Search Page
**Route:** `/properties`
**Priority:** P0 | **Effort:** 5 days

Search and browse properties with expat-optimized filters.

**Features:**
- List view + Map view toggle
- Filters sidebar:
  - Location (city, region, postcode)
  - Price range (slider)
  - Bedrooms (1, 2, 3, 4+)
  - Property type (apartment, house, townhouse)
  - Living area (min sqm)
  - Year built
  - Energy label (A, B, C+)
- Sort by: Price, Date listed, Price/sqm
- Pagination / infinite scroll
- Save search as alert

**Expat-Specific Filters:**
- Distance to international school
- Distance to NS train station
- Commute time to workplace (if set in profile)

**Files:**
- `src/app/properties/page.tsx`
- `src/app/properties/[id]/page.tsx`
- `src/app/api/properties/route.ts`
- `src/app/api/properties/search/route.ts`
- `src/components/properties/property-card.tsx`
- `src/components/properties/property-filters.tsx`
- `src/components/properties/property-map.tsx`
- `src/components/properties/property-grid.tsx`

---

### 2.3 Property Watchlist
**Route:** `/properties/saved`
**Priority:** P1 | **Effort:** 2 days

Save and compare properties.

**Features:**
- Save/unsave button on property cards
- Saved properties list
- Add notes to properties
- Record viewing dates
- Comparison mode (up to 4 properties side-by-side)
- Price change tracking

**Files:**
- `src/app/properties/saved/page.tsx`
- `src/app/api/properties/saved/route.ts`
- `src/components/properties/save-button.tsx`
- `src/components/properties/property-comparison.tsx`

---

### 2.4 Property Scraper
**Priority:** P1 | **Effort:** 5 days

Background job to scrape property listings.

**Sources (in order of priority):**
1. **Jaap.nl** - Less restrictive ToS, good coverage
2. **Pararius.nl** - Rental focused, some sales
3. **Funda.nl** - Main source, but aggressive anti-scraping

**Technical Approach:**
- Playwright for browser automation
- Crawlee for anti-detection
- BullMQ for job queue (or Vercel Cron)
- Rate limiting: 1 request/2 seconds
- Proxy rotation for IP protection

**Scrape Schedule:**
- New listings: Every 30 minutes
- Price updates: Every 6 hours
- Full refresh: Weekly

**Files:**
- `src/lib/jobs/property-scraper.ts`
- `src/lib/scrapers/jaap-scraper.ts`
- `src/lib/scrapers/funda-scraper.ts`
- `src/app/api/cron/scrape-properties/route.ts`

---

### 2.5 Property Alerts
**Priority:** P1 | **Effort:** 2 days

Email notifications for new properties.

**Features:**
- Set alert from intake profile (auto-created)
- Set alert from saved search
- Frequency options: instant, daily digest, weekly
- Unsubscribe link in emails

**Files:**
- `src/app/api/alerts/route.ts`
- `src/lib/jobs/send-alerts.ts`
- `src/emails/property-alert.tsx` (React Email)

---

## Phase 3: Neighborhood Intelligence (Weeks 6-8)

### 3.1 Neighborhood Database
**Priority:** P0 | **Effort:** 3 days

Store neighborhood data with expat-relevant scores.

**Table:**
```sql
neighborhoods
├── id
├── name
├── city
├── slug
├── description
├── boundary (GeoJSON)
├── expat_density_score (1-10)
├── english_friendly_score (1-10)
├── safety_score (1-10)
├── family_friendly_score (1-10)
├── nightlife_score (1-10)
├── green_space_score (1-10)
├── avg_price_sqm
├── avg_rent_price
├── population
├── international_schools_count
├── ns_stations (array)
└── timestamps
```

**Data Sources:**
- CBS (demographics, income)
- Police (crime stats)
- Manual curation (expat scores)

**Files:**
- `src/lib/schema.ts` (update)
- `src/data/neighborhoods/*.json`
- `src/app/api/neighborhoods/route.ts`

---

### 3.2 Neighborhood Explorer
**Route:** `/neighborhoods`
**Priority:** P0 | **Effort:** 4 days

Browse and compare neighborhoods.

**Features:**
- Map view with color-coded neighborhoods
- Filter by scores (expat-friendly, family-friendly, etc.)
- Filter by price range
- Comparison mode (up to 3 neighborhoods)
- Link to properties in neighborhood

**Files:**
- `src/app/neighborhoods/page.tsx`
- `src/app/neighborhoods/[slug]/page.tsx`
- `src/components/neighborhoods/neighborhood-map.tsx`
- `src/components/neighborhoods/neighborhood-card.tsx`
- `src/components/neighborhoods/score-badges.tsx`

---

### 3.3 Commute Calculator
**Priority:** P1 | **Effort:** 2 days

Calculate commute from property to workplace.

**Features:**
- Save workplace address in user profile
- Show commute time on property cards
- Multi-modal: bike, train, car, bike+train
- Door-to-door estimates

**API:** Google Maps Distance Matrix

**Files:**
- `src/components/properties/commute-badge.tsx`
- `src/app/api/commute/route.ts`
- Profile settings for workplace address

---

## Phase 4: Market Intelligence (Weeks 9-12)

### 4.1 WOZ Value Integration
**Priority:** P0 | **Effort:** 5 days

Show official property valuations.

**Features:**
- WOZ value for any address
- Asking price vs WOZ comparison
- Price per sqm vs neighborhood average
- Historical WOZ values (if available)

**Data Source:** [waardeloket.nl](https://www.waardeloket.nl)

**Files:**
- `src/lib/services/woz-service.ts`
- `src/components/properties/woz-comparison.tsx`

---

### 4.2 Fair Price Estimator
**Route:** Component on property detail
**Priority:** P1 | **Effort:** 5 days

AI-powered price analysis.

**Features:**
- Compare to recent sales (Kadaster data)
- Price per sqm analysis
- AI explanation: "This property is 8% above market average because..."
- Confidence score

**Files:**
- `src/lib/services/price-estimator.ts`
- `src/components/properties/fair-price-analysis.tsx`

---

### 4.3 Bidding Strategy Advisor
**Route:** Chat interface on property detail
**Priority:** P2 | **Effort:** 4 days

AI-powered bidding recommendations.

**Features:**
- Chat interface: "What should I offer?"
- Considers: Days on market, price reductions, comps, market temperature
- Suggests: Starting bid, max bid, contingencies to include

**Files:**
- `src/components/properties/bidding-advisor.tsx`
- `src/app/api/chat/bidding/route.ts`

---

## Database Schema Summary

### New Tables
| Table | Purpose |
|-------|---------|
| `properties` | Scraped property listings |
| `user_saved_properties` | User's watchlist |
| `property_alerts` | Notification preferences |
| `neighborhoods` | Area data + scores |
| `neighborhood_reviews` | User reviews |
| `schools` | International schools |

### Existing Tables (No Changes)
- `user` - BetterAuth users
- `session` - BetterAuth sessions
- `account` - BetterAuth accounts
- `verification` - Email verification
- `intake_profiles` - Expat intake forms

---

## API Endpoints Summary

### Calculator APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/calculator/mortgage` | Calculate max mortgage |
| POST | `/api/calculator/costs` | Calculate total costs |

### Property APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List properties |
| GET | `/api/properties/[id]` | Property detail |
| POST | `/api/properties/search` | Advanced search |
| GET | `/api/properties/saved` | User's watchlist |
| POST | `/api/properties/saved` | Save property |
| DELETE | `/api/properties/saved/[id]` | Unsave property |

### Neighborhood APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/neighborhoods` | List neighborhoods |
| GET | `/api/neighborhoods/[slug]` | Neighborhood detail |

### Alert APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts` | User's alerts |
| POST | `/api/alerts` | Create alert |
| PUT | `/api/alerts/[id]` | Update alert |
| DELETE | `/api/alerts/[id]` | Delete alert |

### School APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schools` | List schools |
| GET | `/api/schools/[id]` | School detail |

---

## Tech Stack Additions

### New Dependencies
```json
{
  "dependencies": {
    "leaflet": "^1.9.4",           // Maps
    "react-leaflet": "^4.2.1",     // React map components
    "@react-email/components": "^0.0.22", // Email templates
    "resend": "^3.2.0"             // Email sending
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.8"
  }
}
```

### Optional (for scraping)
```json
{
  "dependencies": {
    "playwright": "^1.42.0",       // Browser automation
    "crawlee": "^3.8.0",           // Scraping framework
    "bullmq": "^5.4.0"             // Job queue
  }
}
```

---

## Environment Variables (New)

```env
# Google Maps (for commute calculator)
GOOGLE_MAPS_API_KEY=

# Email (for alerts)
RESEND_API_KEY=

# Scraping (optional)
PROXY_URL=
```

---

## Milestones

### Milestone 1: Calculator Launch (Week 2)
- [x] Mortgage calculator live
- [x] Cost calculator live
- [ ] Blog post announcing tools

### Milestone 2: Property Search Beta (Week 5)
- [ ] Property database populated
- [ ] Search page functional
- [ ] Watchlist working
- [ ] First alerts sent

### Milestone 3: Neighborhood Intelligence (Week 8)
- [ ] Neighborhood pages live
- [ ] School finder functional
- [ ] Commute calculator working

### Milestone 4: Full Platform (Week 12)
- [ ] WOZ integration
- [ ] Fair price estimator
- [ ] Bidding advisor

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2024-XX-XX | 1.0 | Initial roadmap |
