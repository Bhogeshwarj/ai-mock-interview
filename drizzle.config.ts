import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./src/utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Todo_owner:wnW7PNurbhz6@ep-yellow-lab-a1jljt4p.ap-southeast-1.aws.neon.tech/AI-Mock-generator?sslmode=require',
    },
    verbose: true,
    strict: true,
  })
  