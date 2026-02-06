CREATE TABLE "intake_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"preferred_regions" text[] NOT NULL,
	"budget_range" text NOT NULL,
	"purchase_timeline" text NOT NULL,
	"consent_to_share" boolean NOT NULL,
	"marketing_consent" boolean DEFAULT false,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"nationality" text,
	"current_location" text,
	"expected_move_date" text,
	"employment_type" text,
	"annual_income" text,
	"has_partner" boolean,
	"partner_employment_type" text,
	"partner_income" text,
	"has_savings" boolean,
	"property_types" text[],
	"has_started_viewing" boolean,
	"has_mortgage_advisor" text,
	"intake_type" text DEFAULT 'quick' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "intake_profiles_email_idx" ON "intake_profiles" USING btree ("email");--> statement-breakpoint
CREATE INDEX "intake_profiles_status_idx" ON "intake_profiles" USING btree ("status");