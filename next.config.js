const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
};

module.exports = withMDX(nextConfig);
