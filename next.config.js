/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config;
  },
  sassOptions: {
    additionalData: `@import "src/styles/root/_mixins.scss"; @import "src/styles/root/_colors.scss";`,
  },
};

module.exports = nextConfig;
