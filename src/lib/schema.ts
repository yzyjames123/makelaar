import { pgTable, text, timestamp, boolean, index, uuid } from "drizzle-orm/pg-core";

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
