import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "dist/**",
    ".next/**",
    ".vinext/**",
    ".wrangler/**",
    ".sites-runtime/**",
    "outputs/**",
    "work/**",
  ]),
  {
    files: ["app/Showcase.jsx", "app/not-found.tsx"],
    rules: {
      // These entry points intentionally use native navigation.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    files: ["app/Showcase.jsx", "app/ArtworkLayers.jsx", "app/CaseVideo.jsx", "app/ImageComparison.jsx"],
    rules: {
      // Artwork and comparisons render the curated originals and supplied srcsets.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
