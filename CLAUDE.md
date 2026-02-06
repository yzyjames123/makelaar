# Makelaar - Expat Home Buying Platform

## Project Overview

Platform helping expats find and buy homes in the Netherlands. Connects international home buyers with local buyers' agents and provides tools for property discovery, neighborhood intelligence, and financial planning.

### Business Model
- **Free for expats**: No cost to users
- **Revenue**: Success fees from matched buyers' agents

### Key Documentation
- `docs/PRODUCT_ROADMAP.md` - Full feature roadmap and specifications
- `docs/DATA_SOURCES.md` - All Dutch APIs and data sources reference
- `docs/features/*.md` - Individual feature specifications

## Tech Stack

### Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **AI Integration**: Vercel AI SDK 5 + OpenRouter (access to 100+ AI models)
- **Authentication**: BetterAuth with Email/Password
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: shadcn/ui components with Tailwind CSS 4
- **Styling**: Tailwind CSS with dark mode support (next-themes)

## AI Integration with OpenRouter

### Key Points

- This project uses **OpenRouter** as the AI provider, NOT direct OpenAI
- OpenRouter provides access to 100+ AI models through a single unified API
- Default model: `openai/gpt-5-mini` (configurable via `OPENROUTER_MODEL` env var)
- Users browse models at: https://openrouter.ai/models
- Users get API keys from: https://openrouter.ai/settings/keys

### AI Implementation Files

- `src/app/api/chat/route.ts` - Chat API endpoint using OpenRouter
- Package: `@openrouter/ai-sdk-provider` (not `@ai-sdk/openai`)
- Import: `import { openrouter } from "@openrouter/ai-sdk-provider"`

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth route group
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   ├── forgot-password/     # Forgot password page
│   │   └── reset-password/      # Reset password page
│   ├── api/
│   │   ├── auth/[...all]/       # Better Auth catch-all route
│   │   ├── chat/route.ts        # AI chat endpoint (OpenRouter)
│   │   └── diagnostics/         # System diagnostics
│   ├── chat/page.tsx            # AI chat interface (protected)
│   ├── dashboard/page.tsx       # User dashboard (protected)
│   ├── profile/page.tsx         # User profile (protected)
│   ├── page.tsx                 # Home/landing page
│   └── layout.tsx               # Root layout
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── sign-in-button.tsx   # Sign in form
│   │   ├── sign-up-form.tsx     # Sign up form
│   │   ├── forgot-password-form.tsx
│   │   ├── reset-password-form.tsx
│   │   ├── sign-out-button.tsx
│   │   └── user-profile.tsx
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── mode-toggle.tsx      # Dark/light mode toggle
│   │   └── github-stars.tsx
│   ├── site-header.tsx          # Main navigation header
│   ├── site-footer.tsx          # Footer component
│   ├── theme-provider.tsx       # Dark mode provider
│   ├── setup-checklist.tsx      # Setup guide component
│   └── starter-prompt-modal.tsx # Starter prompts modal
└── lib/
    ├── auth.ts                  # Better Auth server config
    ├── auth-client.ts           # Better Auth client hooks
    ├── db.ts                    # Database connection
    ├── schema.ts                # Drizzle schema (users, sessions, etc.)
    ├── storage.ts               # File storage abstraction (Vercel Blob / local)
    └── utils.ts                 # Utility functions (cn, etc.)
```

## Environment Variables

Required environment variables (see `env.example`):

```env
# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/db_name

# Better Auth
BETTER_AUTH_SECRET=32-char-random-string

# AI via OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=openai/gpt-5-mini  # or any model from openrouter.ai/models

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Storage (optional)
BLOB_READ_WRITE_TOKEN=  # Leave empty for local dev, set for Vercel Blob in production
```

## Available Scripts

```bash
npm run dev          # Start dev server (DON'T run this yourself - ask user)
npm run build        # Build for production (runs db:migrate first)
npm run build:ci     # Build without database (for CI/CD pipelines)
npm run start        # Start production server
npm run lint         # Run ESLint (ALWAYS run after changes)
npm run typecheck    # TypeScript type checking (ALWAYS run after changes)
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)
npm run db:dev       # Push schema for development
npm run db:reset     # Reset database (drop all tables)
```

## Documentation Files

The project includes technical documentation in `docs/`:

- `docs/technical/ai/streaming.md` - AI streaming implementation guide
- `docs/technical/ai/structured-data.md` - Structured data extraction
- `docs/technical/react-markdown.md` - Markdown rendering guide
- `docs/technical/betterauth/polar.md` - Polar payment integration
- `docs/business/starter-prompt.md` - Business context for AI prompts

## Guidelines for AI Assistants

### CRITICAL RULES

1. **ALWAYS run lint and typecheck** after completing changes:

   ```bash
   npm run lint && npm run typecheck
   ```

2. **NEVER start the dev server yourself**

   - If you need dev server output, ask the user to provide it
   - Don't run `npm run dev` or `pnpm dev`

3. **Use OpenRouter, NOT OpenAI directly**

   - Import from `@openrouter/ai-sdk-provider`
   - Use `openrouter()` function, not `openai()`
   - Model names follow OpenRouter format: `provider/model-name`

4. **Styling Guidelines**

   - Stick to standard Tailwind CSS utility classes
   - Use shadcn/ui color tokens (e.g., `bg-background`, `text-foreground`)
   - Avoid custom colors unless explicitly requested
   - Support dark mode with appropriate Tailwind classes

5. **Authentication**

   - Server-side: Import from `@/lib/auth` (Better Auth instance)
   - Client-side: Import hooks from `@/lib/auth-client`
   - Protected routes should check session in Server Components
   - Use existing auth components from `src/components/auth/`

6. **Database Operations**

   - Use Drizzle ORM (imported from `@/lib/db`)
   - Schema is defined in `@/lib/schema`
   - Always run migrations after schema changes
   - PostgreSQL is the database (not SQLite, MySQL, etc.)

7. **File Storage**

   - Use the storage abstraction from `@/lib/storage`
   - Automatically uses local storage (dev) or Vercel Blob (production)
   - Import: `import { upload, deleteFile } from "@/lib/storage"`
   - Example: `const result = await upload(buffer, "avatar.png", "avatars")`
   - Storage switches based on `BLOB_READ_WRITE_TOKEN` environment variable

8. **Component Creation**

   - Use existing shadcn/ui components when possible
   - Follow the established patterns in `src/components/ui/`
   - Support both light and dark modes
   - Use TypeScript with proper types

9. **API Routes**
   - Follow Next.js 16 App Router conventions
   - Use Route Handlers (route.ts files)
   - Return Response objects
   - Handle errors appropriately

### Best Practices

- Read existing code patterns before creating new features
- Maintain consistency with established file structure
- Use the documentation files when implementing related features
- Test changes with lint and typecheck before considering complete
- When modifying AI functionality, refer to `docs/technical/ai/` guides

### Common Tasks

**Adding a new page:**

1. Create in `src/app/[route]/page.tsx`
2. Use Server Components by default
3. Add to navigation if needed

**Adding a new API route:**

1. Create in `src/app/api/[route]/route.ts`
2. Export HTTP method handlers (GET, POST, etc.)
3. Use proper TypeScript types

**Adding authentication to a page:**

1. Import auth instance: `import { auth } from "@/lib/auth"`
2. Get session: `const session = await auth.api.getSession({ headers: await headers() })`
3. Check session and redirect if needed

**Working with the database:**

1. Update schema in `src/lib/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`
4. Import `db` from `@/lib/db` to query

**Modifying AI chat:**

1. Backend: `src/app/api/chat/route.ts`
2. Frontend: `src/app/chat/page.tsx`
3. Reference streaming docs: `docs/technical/ai/streaming.md`
4. Remember to use OpenRouter, not direct OpenAI

**Working with file storage:**

1. Import storage functions: `import { upload, deleteFile } from "@/lib/storage"`
2. Upload files: `const result = await upload(fileBuffer, "filename.png", "folder")`
3. Delete files: `await deleteFile(result.url)`
4. Storage automatically uses local filesystem in dev, Vercel Blob in production
5. Local files are saved to `public/uploads/` and served at `/uploads/`

## Package Manager

This project uses **pnpm** (see `pnpm-lock.yaml`). When running commands:

- Use `pnpm` instead of `npm` when possible
- Scripts defined in package.json work with `pnpm run [script]`

---

## Makelaar Platform Architecture

### Core Features

| Feature | Route | Status |
|---------|-------|--------|
| Intake Form | `/intake` | Live |
| Mortgage Calculator | `/calculator/mortgage` | Building |
| Cost Calculator | `/calculator/costs` | Building |
| School Finder | `/schools` | Building |
| Property Search | `/properties` | Planned |
| Neighborhood Explorer | `/neighborhoods` | Planned |

### Database Schema (New Tables)

```
properties              # Scraped property listings
├── id, external_id, source
├── url, title, description, price
├── address, city, postcode, lat/lng
├── bedrooms, bathrooms, living_area_sqm
├── property_type, year_built, energy_label
├── photos[], status, listed_at
└── timestamps

user_saved_properties   # User watchlist
├── id, user_id, property_id
├── notes, viewing_date, rating
└── timestamps

property_alerts        # Notification preferences
├── id, user_id, intake_profile_id
├── regions[], min/max_price, min_bedrooms
├── property_types[], frequency
└── is_active, timestamps

neighborhoods          # Area data + scores
├── id, name, city, slug
├── expat_density_score, english_friendly_score
├── safety_score, family_friendly_score
├── avg_price_sqm, avg_rent_price
└── timestamps

schools               # International schools
├── id, name, curriculum, grades
├── address, lat/lng, tuition_annual
├── website, waiting_list_months
└── timestamps
```

### API Endpoints (New)

**Calculators:**
- `POST /api/calculator/mortgage` - Calculate max mortgage
- `POST /api/calculator/costs` - Calculate total buying costs

**Properties:**
- `GET /api/properties` - List/search properties
- `GET /api/properties/[id]` - Property detail
- `GET/POST /api/properties/saved` - User watchlist
- `POST /api/alerts` - Create property alert

**Neighborhoods:**
- `GET /api/neighborhoods` - List neighborhoods
- `GET /api/neighborhoods/[slug]` - Neighborhood detail

**Schools:**
- `GET /api/schools` - List/search schools

### Data Sources (External APIs)

| Source | Use | Access |
|--------|-----|--------|
| CBS Open Data | Demographics, income | Free API |
| Kadaster BAG | Property data | Free API (limited) |
| WOZ Waardeloket | Property valuations | Web scraping |
| NS API | Train stations | Free (register) |
| Google Maps | Commute times | Paid (free tier) |
| Overpass | Amenities | Free |

See `docs/DATA_SOURCES.md` for full documentation.

### Component Organization (New)

```
src/components/
├── calculators/           # Financial calculators
│   ├── mortgage-form.tsx
│   ├── mortgage-results.tsx
│   ├── cost-form.tsx
│   └── cost-breakdown.tsx
├── properties/            # Property search & display
│   ├── property-card.tsx
│   ├── property-filters.tsx
│   ├── property-map.tsx
│   └── save-button.tsx
├── neighborhoods/         # Neighborhood explorer
│   ├── neighborhood-card.tsx
│   ├── score-badges.tsx
│   └── neighborhood-map.tsx
└── schools/              # School finder
    ├── school-card.tsx
    └── school-filters.tsx
```

### Mortgage Calculator Logic (Dutch Rules)

```typescript
// Key factors for expat mortgages:
// 1. Max LTV: 100% (no down payment required)
// 2. Income multiplier: ~4.5x gross annual
// 3. 30% ruling: Increases net income significantly
// 4. Temporary contracts: Reduce borrowing capacity
// 5. NHG (National Mortgage Guarantee): Up to €435,000

function calculateMaxMortgage(input: {
  grossAnnualSalary: number;
  has30PercentRuling: boolean;
  contractType: 'permanent' | 'temporary' | 'self_employed';
  partnerIncome?: number;
}) {
  // Simplified calculation
  let effectiveIncome = input.grossAnnualSalary;

  if (input.has30PercentRuling) {
    effectiveIncome = effectiveIncome * 1.3; // 30% tax-free
  }

  if (input.contractType === 'temporary') {
    effectiveIncome = effectiveIncome * 0.8; // 20% reduction
  }

  const multiplier = 4.5;
  return effectiveIncome * multiplier;
}
```

### Total Cost Calculator (Dutch Fees)

| Cost | Amount | Notes |
|------|--------|-------|
| Transfer tax | 0% / 2% / 10.4% | First-time (<€510k) / Regular / Investor |
| Notary | €1,500-2,500 | Deed transfer + mortgage deed |
| Valuation | €500-800 | Required for mortgage |
| Mortgage advisor | €2,000-3,500 | Optional but recommended |
| Buyers' agent | 1-2% of price | Optional |
| Building inspection | €300-500 | Highly recommended |
| Bank guarantee | €250-500 | Alternative to 10% deposit |
| NHG fee | 0.6% | If mortgage ≤ €435k |

### Key Business Logic

**Intake Flow:**
1. User lands on homepage
2. Completes quick intake (email, regions, budget, timeline)
3. Profile stored in `intake_profiles`
4. Matched with buyers' agents (manual process currently)
5. Agents contact user directly

**Property Alert Flow:**
1. User saves search criteria
2. Stored in `property_alerts`
3. Cron job checks for new matching properties
4. Email sent via Resend/SendGrid

### Environment Variables (New)

```env
# Google Maps (commute calculator)
GOOGLE_MAPS_API_KEY=

# Email alerts
RESEND_API_KEY=

# External APIs (optional)
NS_API_KEY=
KADASTER_API_KEY=
```
