/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === '1'

const nextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/web-pousada-melodie' : '',
  assetPrefix: isGitHubPages ? '/web-pousada-melodie/' : '',
  images: {
    ...(isGitHubPages ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  ...(isGitHubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
              ],
            },
          ]
        },
      }),
}

module.exports = {
  ...nextConfig,
  experimental: {
    turbo: {
      rules: {
        '*.mdx': { loaders: ['@next/mdx-rs'] },
      },
    },
  },
}

