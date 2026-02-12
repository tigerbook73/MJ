import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file for tests
config({ path: resolve(__dirname, "../.env"), quiet: true });

// Set default JWT_SECRET for tests
process.env.JWT_SECRET = "test-jwt-secret-key";
