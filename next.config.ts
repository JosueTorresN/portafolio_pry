import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Add the output property here
  output: 'export',
  // your other config options
};

export default withNextIntl(nextConfig)