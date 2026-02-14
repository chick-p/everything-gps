# everything-gps(web)

## Development

Install dependencies:

```shell
pnpm install
```

Setup D1:

```shell
# Create database
npx wrangler d1 create everyting-gps-database

# Create migration files
npx drizzle-kit generate

# Run migration
npx wrangler d1 migrations apply everything-gps-database --local

# Add dummy data
npx wrangler d1 execute everything-gps-database \
  --command="INSERT INTO Locations (name, lat, lng) VALUES ('Himeji Castle', '34.8394324', '134.693894'), ('Matsuyama Castle', '36.2386483', '137.9688873')" \
  --local
```

## Deploy

Create a new DB

```shell
npx wrangler d1 migrations apply everything-gps-database --remote
```

Deploy app to Cloudflare Pages:

```shell
pnpm run deploy
```
