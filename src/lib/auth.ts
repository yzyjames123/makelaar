import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"

// Check if we're in build mode (no database needed)
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.POSTGRES_URL;

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        // Log password reset URL to terminal (no email integration yet)
        // eslint-disable-next-line no-console
        console.log(`\n${"=".repeat(60)}\nPASSWORD RESET REQUEST\nUser: ${user.email}\nReset URL: ${url}\n${"=".repeat(60)}\n`)
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        // Log verification URL to terminal (no email integration yet)
        // eslint-disable-next-line no-console
        console.log(`\n${"=".repeat(60)}\nEMAIL VERIFICATION\nUser: ${user.email}\nVerification URL: ${url}\n${"=".repeat(60)}\n`)
      },
    },
  })
}

// Lazy initialization - don't create auth at build time
let _auth: ReturnType<typeof betterAuth> | null = null;

export const auth: ReturnType<typeof betterAuth> = isBuildTime
  ? ({} as ReturnType<typeof betterAuth>)
  : new Proxy({} as ReturnType<typeof betterAuth>, {
      get(_target, prop) {
        if (!_auth) _auth = createAuth();
        return _auth[prop as keyof typeof _auth];
      },
    });