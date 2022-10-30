const withTM = require("next-transpile-modules")(["ui", "app"], {
  debug: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: "./",
  experimental: {
    images: {
      unoptimized: true,
    },
  },
})

module.exports = nextConfig
