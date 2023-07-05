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
    return config;
  },
  sassOptions: {
    additionalData: `@import "src/styles/root/_mixins.scss";`,
  },
};

module.exports = nextConfig;
