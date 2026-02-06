import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uuid,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";

// IMPORTANT! ID fields should ALWAYS use UUID types, EXCEPT the BetterAuth tables.


export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("user_email_idx").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_token_idx").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
    index("account_provider_account_idx").on(table.providerId, table.accountId),
  ]
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Intake profiles for expat home buyers
export const intakeProfiles = pgTable(
  "intake_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Core fields (required for quick intake)
    email: text("email").notNull(),
    preferredRegions: text("preferred_regions").array().notNull(),
    budgetRange: text("budget_range").notNull(),
    purchaseTimeline: text("purchase_timeline").notNull(),
    consentToShare: boolean("consent_to_share").notNull(),
    marketingConsent: boolean("marketing_consent").default(false),
    // Deferred fields (now nullable for quick intake)
    firstName: text("first_name"),
    lastName: text("last_name"),
    phone: text("phone"),
    nationality: text("nationality"),
    currentLocation: text("current_location"),
    expectedMoveDate: text("expected_move_date"),
    employmentType: text("employment_type"),
    annualIncome: text("annual_income"),
    hasPartner: boolean("has_partner"),
    partnerEmploymentType: text("partner_employment_type"),
    partnerIncome: text("partner_income"),
    hasSavings: boolean("has_savings"),
    propertyTypes: text("property_types").array(),
    hasStartedViewing: boolean("has_started_viewing"),
    hasMortgageAdvisor: text("has_mortgage_advisor"),
    // Metadata
    intakeType: text("intake_type").default("quick").notNull(), // 'quick' or 'full'
    status: text("status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("intake_profiles_email_idx").on(table.email),
    index("intake_profiles_status_idx").on(table.status),
  ]
);

// ============================================
// PROPERTY TABLES
// ============================================

// Scraped property listings from Funda, Jaap, etc.
export const properties = pgTable(
  "properties",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    externalId: text("external_id"), // Source-specific ID
    source: text("source").notNull(), // 'funda', 'jaap', 'pararius'
    url: text("url").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    pricePerSqm: integer("price_per_sqm"),
    // Location
    address: text("address"),
    city: text("city").notNull(),
    neighborhood: text("neighborhood"),
    postcode: text("postcode"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    // Property details
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    livingAreaSqm: integer("living_area_sqm"),
    plotSizeSqm: integer("plot_size_sqm"),
    propertyType: text("property_type"), // 'apartment', 'house', 'townhouse'
    yearBuilt: integer("year_built"),
    energyLabel: text("energy_label"), // 'A', 'B', 'C', etc.
    photos: text("photos").array(),
    // Status
    status: text("status").default("active").notNull(), // 'active', 'sold', 'delisted'
    listedAt: timestamp("listed_at"),
    soldAt: timestamp("sold_at"),
    scrapedAt: timestamp("scraped_at").defaultNow().notNull(),
    // Agent info
    agentName: text("agent_name"),
    agentPhone: text("agent_phone"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("properties_city_idx").on(table.city),
    index("properties_postcode_idx").on(table.postcode),
    index("properties_price_idx").on(table.price),
    index("properties_status_idx").on(table.status),
    index("properties_external_id_idx").on(table.externalId, table.source),
  ]
);

// User's saved/watchlisted properties
export const userSavedProperties = pgTable(
  "user_saved_properties",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    notes: text("notes"),
    viewingDate: timestamp("viewing_date"),
    rating: integer("rating"), // 1-5 stars
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("user_saved_properties_user_idx").on(table.userId),
    index("user_saved_properties_property_idx").on(table.propertyId),
  ]
);

// Property alert preferences (for email notifications)
export const propertyAlerts = pgTable(
  "property_alerts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Can be linked to user OR intake profile (for non-registered users)
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    intakeProfileId: uuid("intake_profile_id").references(
      () => intakeProfiles.id,
      { onDelete: "cascade" }
    ),
    email: text("email").notNull(), // For non-registered users
    // Search criteria
    regions: text("regions").array().notNull(),
    minPrice: integer("min_price"),
    maxPrice: integer("max_price"),
    minBedrooms: integer("min_bedrooms"),
    propertyTypes: text("property_types").array(),
    // Alert settings
    frequency: text("frequency").default("daily").notNull(), // 'instant', 'daily', 'weekly'
    isActive: boolean("is_active").default(true).notNull(),
    lastSentAt: timestamp("last_sent_at"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("property_alerts_user_idx").on(table.userId),
    index("property_alerts_email_idx").on(table.email),
    index("property_alerts_active_idx").on(table.isActive),
  ]
);

// ============================================
// NEIGHBORHOOD TABLES
// ============================================

// Neighborhood data with expat-relevant scores
export const neighborhoods = pgTable(
  "neighborhoods",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    city: text("city").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    // Expat-relevant scores (1-10)
    expatDensityScore: integer("expat_density_score"),
    englishFriendlyScore: integer("english_friendly_score"),
    safetyScore: integer("safety_score"),
    familyFriendlyScore: integer("family_friendly_score"),
    nightlifeScore: integer("nightlife_score"),
    greenSpaceScore: integer("green_space_score"),
    // Price data
    avgPriceSqm: integer("avg_price_sqm"),
    avgRentPrice: integer("avg_rent_price"),
    // Demographics
    population: integer("population"),
    // Points of interest
    internationalSchoolsCount: integer("international_schools_count"),
    nsStations: text("ns_stations").array(),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("neighborhoods_city_idx").on(table.city),
    index("neighborhoods_slug_idx").on(table.slug),
  ]
);

// User reviews of neighborhoods
export const neighborhoodReviews = pgTable(
  "neighborhood_reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    neighborhoodId: uuid("neighborhood_id")
      .notNull()
      .references(() => neighborhoods.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(), // 1-5
    review: text("review").notNull(),
    // Reviewer context
    expatBackground: text("expat_background"), // Country of origin
    familyType: text("family_type"), // 'single', 'couple', 'family'
    yearsLived: integer("years_lived"),
    // Moderation
    isApproved: boolean("is_approved").default(false),
    upvotes: integer("upvotes").default(0),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("neighborhood_reviews_neighborhood_idx").on(table.neighborhoodId),
    index("neighborhood_reviews_user_idx").on(table.userId),
  ]
);

// ============================================
// SCHOOL TABLES
// ============================================

// International schools database
export const schools = pgTable(
  "schools",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    curriculum: text("curriculum").notNull(), // 'IB', 'British', 'American', 'French', 'German'
    grades: text("grades").array(), // ['Primary', 'Secondary'] or ['K-12']
    // Location
    address: text("address").notNull(),
    city: text("city").notNull(),
    postcode: text("postcode"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    // Details
    tuitionAnnual: integer("tuition_annual"), // In EUR
    website: text("website"),
    phone: text("phone"),
    email: text("email"),
    // Additional info
    waitingListMonths: integer("waiting_list_months"),
    languages: text("languages").array(), // ['English', 'Dutch']
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("schools_city_idx").on(table.city),
    index("schools_curriculum_idx").on(table.curriculum),
  ]
);

// ============================================
// CALCULATOR TABLES (for saving user calculations)
// ============================================

// Saved mortgage calculations
export const mortgageCalculations = pgTable(
  "mortgage_calculations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    sessionId: text("session_id"), // For non-logged-in users
    // Input
    grossAnnualSalary: integer("gross_annual_salary").notNull(),
    has30PercentRuling: boolean("has_30_percent_ruling").default(false),
    contractType: text("contract_type").notNull(), // 'permanent', 'temporary', 'self_employed'
    partnerIncome: integer("partner_income"),
    downPayment: integer("down_payment"),
    // Output
    maxMortgage: integer("max_mortgage").notNull(),
    monthlyPayment: integer("monthly_payment"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("mortgage_calculations_user_idx").on(table.userId),
    index("mortgage_calculations_session_idx").on(table.sessionId),
  ]
);
