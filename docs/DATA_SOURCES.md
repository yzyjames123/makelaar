# Dutch Real Estate Data Sources

Reference guide for all external APIs and data sources used in the Makelaar platform.

---

## 1. Property Listings

### Funda.nl (Main Portal)
**Status:** No public API - scraping required

| Aspect | Details |
|--------|---------|
| Coverage | 90%+ of Dutch property listings |
| API | Partner API (broker-only) or reverse-engineered mobile API |
| Legal | ToS prohibits scraping; aggressive enforcement |
| Recommendation | Use with caution, prefer alternatives |

**Scraping approach:**
- Use Playwright with stealth mode
- Residential proxies required
- Rate limit: 1 request / 3 seconds
- Third-party option: [Apify Funda Scraper](https://apify.com/store)

---

### Jaap.nl (Alternative)
**Status:** Less restrictive than Funda

| Aspect | Details |
|--------|---------|
| Coverage | Good coverage, includes private sellers |
| API | No public API |
| Legal | Check ToS, less aggressive than Funda |
| Recommendation | Primary scraping target |

**Data available:**
- Price, address, photos
- Bedrooms, bathrooms, sqm
- Property type, year built
- Listing date

---

### Pararius.nl
**Status:** Primarily rentals

| Aspect | Details |
|--------|---------|
| Coverage | Strong rental listings, some sales |
| API | No public API |
| Recommendation | Useful for rental market data |

---

## 2. Official Government Data

### CBS (Statistics Netherlands)
**Status:** FREE - Public API available

**URL:** https://opendata.cbs.nl

| Data Type | Endpoint | Update Frequency |
|-----------|----------|------------------|
| Demographics | StatLine API | Quarterly |
| Income by postcode | Kerncijfers postcodes | Annual |
| Housing stats | Woningvoorraad | Quarterly |
| Crime stats | Politiestatistiek | Annual |

**API Examples:**

```typescript
// Get postcode statistics
const CBS_BASE = 'https://opendata.cbs.nl/ODataApi/odata/84286NED';

// Fetch neighborhood demographics
async function getCBSData(postcode: string) {
  const response = await fetch(
    `${CBS_BASE}/TypedDataSet?$filter=Codering_3 eq '${postcode}'`
  );
  return response.json();
}
```

**Useful datasets:**
- `84286NED` - Key figures by postcode
- `83765NED` - Regional income data
- `84799NED` - Housing transactions

**Rate limits:** No strict limits, be respectful

---

### Kadaster (Land Registry)
**Status:** API available with registration

**URL:** https://apiportal.kadaster.nl

| API | Description | Access |
|-----|-------------|--------|
| BAG API | Building & address register | Free (rate limited) |
| BRK API | Property ownership | Paid |
| Transaction API | Historical sales | Paid |

**BAG API (Free):**
```typescript
// Look up address details
const BAG_API = 'https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2';

async function getAddressDetails(postcode: string, houseNumber: number) {
  const response = await fetch(
    `${BAG_API}/adressen?postcode=${postcode}&huisnummer=${houseNumber}`,
    {
      headers: {
        'X-Api-Key': process.env.KADASTER_API_KEY,
        'Accept': 'application/hal+json'
      }
    }
  );
  return response.json();
}
```

**Data available:**
- Building ID (pandId)
- Address details
- Building footprint (geometry)
- Construction year
- Building status

---

### WOZ Waardeloket
**Status:** FREE - Public access

**URL:** https://www.waardeloket.nl

| Aspect | Details |
|--------|---------|
| Data | Property tax valuations |
| Access | Web portal (no API) |
| Update | Annual (January-February) |

**Scraping approach:**
```typescript
// WOZ values require scraping waardeloket.nl
// Use Playwright to:
// 1. Navigate to waardeloket.nl
// 2. Enter postcode + house number
// 3. Extract WOZ value from result page

async function getWOZValue(postcode: string, houseNumber: string) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.waardeloket.nl');
  // ... fill form and extract value
}
```

**Data available:**
- WOZ value (current year)
- WOZ value (previous years, limited)
- Reference date

---

### Energy Labels (RVO)
**Status:** PUBLIC - Web lookup available

**URL:** https://www.energielabel.nl/woningen/zoek-je-energielabel/

| Aspect | Details |
|--------|---------|
| Data | Energy performance certificate |
| Labels | A++++ to G |
| Access | Web lookup by postcode |

**Data available:**
- Energy label (A-G)
- Label valid until
- Building characteristics

---

## 3. Schools Data

### Open Onderwijs Data
**Status:** FREE API

**URL:** https://www.openonderwijsdata.nl/oo-api/

| Data | Description |
|------|-------------|
| Schools | All Dutch schools |
| Ratings | Inspection results |
| Locations | Addresses & coordinates |

**API Example:**
```typescript
const ONDERWIJS_API = 'https://api.duo.nl/v0/';

async function getSchools(city: string) {
  const response = await fetch(
    `${ONDERWIJS_API}/organisaties?plaats=${city}&type=VO`
  );
  return response.json();
}
```

---

### International Schools (Manual)
**Status:** Manually curated

International schools require manual data collection from:
- School websites
- [International Schools Database](https://www.international-schools-database.com)
- [Expat Focus](https://www.expatfocus.com)

**Schema:**
```json
{
  "name": "International School of Amsterdam",
  "curriculum": "IB",
  "grades": ["K", "1-5", "6-8", "9-12"],
  "address": "Sportlaan 45, 1185 TB Amstelveen",
  "lat": 52.2957,
  "lng": 4.8419,
  "tuition_annual_eur": 25000,
  "website": "https://www.isa.nl",
  "waiting_list_months": 12
}
```

---

## 4. Transport & Commute

### NS API (Dutch Railways)
**Status:** FREE with registration

**URL:** https://apiportal.ns.nl

| Endpoint | Description |
|----------|-------------|
| Stations | All NS stations |
| Travel advice | Route planning |
| Departures | Real-time schedules |

**Registration:** Create account at NS API Portal

**API Example:**
```typescript
const NS_API = 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3';

async function getNearestStation(lat: number, lng: number) {
  const response = await fetch(
    `${NS_API}/stations/nearest?lat=${lat}&lng=${lng}`,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY
      }
    }
  );
  return response.json();
}
```

---

### 9292 (Multi-modal transport)
**Status:** No public API

Alternative: Use Google Maps Directions API

---

### Google Maps APIs
**Status:** PAID (with free tier)

| API | Use Case | Free Tier |
|-----|----------|-----------|
| Distance Matrix | Commute times | 10,000 requests/month |
| Geocoding | Address → coordinates | 40,000 requests/month |
| Places | Amenities search | 10,000 requests/month |

**Pricing:** ~$5 per 1,000 requests after free tier

**API Example:**
```typescript
const GOOGLE_MAPS = 'https://maps.googleapis.com/maps/api';

async function getCommuteTime(origin: string, destination: string) {
  const response = await fetch(
    `${GOOGLE_MAPS}/distancematrix/json?` +
    `origins=${encodeURIComponent(origin)}&` +
    `destinations=${encodeURIComponent(destination)}&` +
    `mode=transit&` +
    `key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return response.json();
}
```

---

## 5. Amenities & POI

### OpenStreetMap Overpass API
**Status:** FREE - Public

**URL:** https://overpass-turbo.eu

| Aspect | Details |
|--------|---------|
| Data | Global POI database |
| Coverage | Good in Netherlands |
| Rate limit | None (be respectful) |

**Query Example:**
```typescript
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

async function getAmenities(lat: number, lng: number, radius: number) {
  const query = `
    [out:json];
    (
      node["amenity"="supermarket"](around:${radius},${lat},${lng});
      node["amenity"="pharmacy"](around:${radius},${lat},${lng});
      node["amenity"="hospital"](around:${radius},${lat},${lng});
    );
    out body;
  `;

  const response = await fetch(OVERPASS_API, {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`
  });
  return response.json();
}
```

**Amenity types:**
- `supermarket`, `convenience`
- `pharmacy`, `hospital`, `doctors`
- `school`, `kindergarten`
- `restaurant`, `cafe`, `bar`
- `bank`, `atm`
- `park`, `playground`

---

## 6. Crime Statistics

### Police Open Data
**Status:** FREE - Limited granularity

**URL:** https://data.politie.nl

| Data | Granularity |
|------|-------------|
| Crime incidents | Municipality level |
| Crime types | Category breakdown |
| Trends | Year-over-year |

**Alternative sources:**
- CBS crime statistics (postcode level, annual)
- AlleCijfers.nl (aggregated data)

---

## Environment Variables

```env
# Required for full functionality
GOOGLE_MAPS_API_KEY=           # Commute calculator
NS_API_KEY=                     # Train stations
KADASTER_API_KEY=               # Property data (BAG)

# Optional
RESEND_API_KEY=                 # Email alerts
PROXY_URL=                      # Scraping proxies
```

---

## Rate Limits Summary

| API | Limit | Recommendation |
|-----|-------|----------------|
| CBS Open Data | None | Cache results |
| Kadaster BAG | 10 req/sec | Batch requests |
| NS API | 50 req/min | Cache stations |
| Google Maps | 10,000/month free | Cache aggressively |
| Overpass | None | Be respectful |
| Funda scraping | N/A | 1 req/3 sec + proxies |

---

## Data Caching Strategy

| Data Type | Cache Duration | Storage |
|-----------|---------------|---------|
| Property listings | 30 minutes | PostgreSQL |
| WOZ values | 1 year | PostgreSQL |
| Neighborhood stats | 1 week | PostgreSQL |
| School data | 1 month | PostgreSQL |
| Station locations | 1 month | Static JSON |
| Commute times | 1 day | Redis/Memory |

---

## Implementation Priority

1. **Phase 1 (Immediate):**
   - Static school data (manual JSON)
   - Mortgage calculation (no external API)
   - Cost calculation (no external API)

2. **Phase 2 (Week 2-3):**
   - Google Maps API (commute)
   - NS API (stations)
   - Property scraping (Jaap.nl)

3. **Phase 3 (Week 4-6):**
   - CBS demographics
   - WOZ values (scraping)
   - Kadaster BAG API

4. **Phase 4 (Week 7+):**
   - Overpass API (amenities)
   - Crime statistics
   - Funda scraping (if needed)
