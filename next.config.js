/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  env: {
    AUTH0_SECRET: "use [openssl rand -hex 32] to generate a 32 bytes value",
    AUTH0_BASE_URL: "http://localhost:3000",
    AUTH0_ISSUER_BASE_URL: "https://dev-38yuyxf4eh45cx16.us.auth0.com",
    AUTH0_CLIENT_ID: "dXmzoVVLo1RCxstjf34PiBYa7LTYMBG5",
    AUTH0_CLIENT_SECRET:
      "5KASlLUo4TWqHlMoXrHYnu4_pHd6IrBxO-MkdDiCHPuUkFU4AlfiWH67QEfhhg90",
  },
  poweredByHeader: false,
};
