import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSS}@cluster0.mndvni1.mongodb.net/?appName=Cluster0`);
const db = client.db('wonder-lust');

export const auth = betterAuth({

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            // max-age 7 days
            maxAge: 7 * 24 * 60 * 60
        }
    },
    plugins: [
        jwt(),
    ],

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});