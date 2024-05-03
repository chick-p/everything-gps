# everything-gps(scheduler)

## Development

1. Install dependencies:

   ```shell
   pnpm install
   ```

1. Rename `wrangler.toml`.example to `wrangler.toml`.

1. Set up the environment variables in `wrangler.toml`.

   - `database-id` - The ID of the database.
   - `SLACK_WEBHOOK_URL` - The URL of the Slack webhook.
   - cron job

1. Setup DB:

   ```shell
   # Create database
   npx wrangler d1 create everyting-gps-database

   # Create migration files
   npx drizzle-kit generate:sqlite

   # Run migration
   npx wrangler d1 migrations apply everything-gps-database --local

   # Add dummy data
   npx wrangler d1 execute everything-gps-database \
     --command="INSERT INTO Locations (name, lat, lng) VALUES ('Himeji Castle', '34.8394324', '134.693894'), ('Matsuyama Castle', '36.2386483', '137.9688873')" \
     --local
   ```

1. Run the following commands:

   ```shell
   # Start the dev server
   pnpm run dev:schedule

   # Run the worker
   curl "http://localhost:8787/__scheduled"
   ```

## Deploy

Deploy app to Cloudflare Workers:

```shell
pnpm run deploy
```
