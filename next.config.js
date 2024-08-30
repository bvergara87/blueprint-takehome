const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations ...
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
