import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { uiText } from "@/modules/data/ui-text";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL must be configured.");
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const socialProviders = {
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  plugins: [],
  // Database
  database: new Pool({
    connectionString: databaseUrl,
    ssl: true,
  }),

  // Email Provider
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      if (!resend) {
        throw new Error("RESEND_API_KEY must be configured.");
      }

      const { error } = await resend.emails.send({
        from: uiText.email.verificationFrom,
        to: user.email,
        subject: uiText.email.verificationSubject,
        text: `${uiText.email.verificationBody} ${url}`,
      });

      if (error) {
        throw new Error("Unable to send verification email.", {
          cause: error,
        });
      }
    },
  },

  // Proveedores
  socialProviders,
});
