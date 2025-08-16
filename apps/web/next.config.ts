import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();
// Instead of module.exports = nextConfig, do this:
module.exports = withVercelToolbar(nextConfig);

export default nextConfig;
