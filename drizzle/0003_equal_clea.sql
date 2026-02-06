CREATE TABLE "mortgage_calculations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"session_id" text,
	"gross_annual_salary" integer NOT NULL,
	"has_30_percent_ruling" boolean DEFAULT false,
	"contract_type" text NOT NULL,
	"partner_income" integer,
	"down_payment" integer,
	"max_mortgage" integer NOT NULL,
	"monthly_payment" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "neighborhood_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"neighborhood_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"rating" integer NOT NULL,
	"review" text NOT NULL,
	"expat_background" text,
	"family_type" text,
	"years_lived" integer,
	"is_approved" boolean DEFAULT false,
	"upvotes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "neighborhoods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"city" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"expat_density_score" integer,
	"english_friendly_score" integer,
	"safety_score" integer,
	"family_friendly_score" integer,
	"nightlife_score" integer,
	"green_space_score" integer,
	"avg_price_sqm" integer,
	"avg_rent_price" integer,
	"population" integer,
	"international_schools_count" integer,
	"ns_stations" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "neighborhoods_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text,
	"source" text NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"price_per_sqm" integer,
	"address" text,
	"city" text NOT NULL,
	"neighborhood" text,
	"postcode" text,
	"latitude" double precision,
	"longitude" double precision,
	"bedrooms" integer,
	"bathrooms" integer,
	"living_area_sqm" integer,
	"plot_size_sqm" integer,
	"property_type" text,
	"year_built" integer,
	"energy_label" text,
	"photos" text[],
	"status" text DEFAULT 'active' NOT NULL,
	"listed_at" timestamp,
	"sold_at" timestamp,
	"scraped_at" timestamp DEFAULT now() NOT NULL,
	"agent_name" text,
	"agent_phone" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_alerts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"intake_profile_id" uuid,
	"email" text NOT NULL,
	"regions" text[] NOT NULL,
	"min_price" integer,
	"max_price" integer,
	"min_bedrooms" integer,
	"property_types" text[],
	"frequency" text DEFAULT 'daily' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_sent_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"curriculum" text NOT NULL,
	"grades" text[],
	"address" text NOT NULL,
	"city" text NOT NULL,
	"postcode" text,
	"latitude" double precision,
	"longitude" double precision,
	"tuition_annual" integer,
	"website" text,
	"phone" text,
	"email" text,
	"waiting_list_months" integer,
	"languages" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_saved_properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"property_id" uuid NOT NULL,
	"notes" text,
	"viewing_date" timestamp,
	"rating" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mortgage_calculations" ADD CONSTRAINT "mortgage_calculations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood_reviews" ADD CONSTRAINT "neighborhood_reviews_neighborhood_id_neighborhoods_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhoods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood_reviews" ADD CONSTRAINT "neighborhood_reviews_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_alerts" ADD CONSTRAINT "property_alerts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_alerts" ADD CONSTRAINT "property_alerts_intake_profile_id_intake_profiles_id_fk" FOREIGN KEY ("intake_profile_id") REFERENCES "public"."intake_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_saved_properties" ADD CONSTRAINT "user_saved_properties_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_saved_properties" ADD CONSTRAINT "user_saved_properties_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mortgage_calculations_user_idx" ON "mortgage_calculations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "mortgage_calculations_session_idx" ON "mortgage_calculations" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "neighborhood_reviews_neighborhood_idx" ON "neighborhood_reviews" USING btree ("neighborhood_id");--> statement-breakpoint
CREATE INDEX "neighborhood_reviews_user_idx" ON "neighborhood_reviews" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "neighborhoods_city_idx" ON "neighborhoods" USING btree ("city");--> statement-breakpoint
CREATE INDEX "neighborhoods_slug_idx" ON "neighborhoods" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "properties_city_idx" ON "properties" USING btree ("city");--> statement-breakpoint
CREATE INDEX "properties_postcode_idx" ON "properties" USING btree ("postcode");--> statement-breakpoint
CREATE INDEX "properties_price_idx" ON "properties" USING btree ("price");--> statement-breakpoint
CREATE INDEX "properties_status_idx" ON "properties" USING btree ("status");--> statement-breakpoint
CREATE INDEX "properties_external_id_idx" ON "properties" USING btree ("external_id","source");--> statement-breakpoint
CREATE INDEX "property_alerts_user_idx" ON "property_alerts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "property_alerts_email_idx" ON "property_alerts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "property_alerts_active_idx" ON "property_alerts" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "schools_city_idx" ON "schools" USING btree ("city");--> statement-breakpoint
CREATE INDEX "schools_curriculum_idx" ON "schools" USING btree ("curriculum");--> statement-breakpoint
CREATE INDEX "user_saved_properties_user_idx" ON "user_saved_properties" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_saved_properties_property_idx" ON "user_saved_properties" USING btree ("property_id");