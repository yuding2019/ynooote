const withPlugins = require('next-compose-plugins');
const stylexPlugin = require('@stylexjs/nextjs-plugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

const withStylex = stylexPlugin({
  rootDir: __dirname,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  output: 'export',
  experimental: {
    mdxRs: true,
  },
};

const plugins = [[withMDX], [withStylex]];

module.exports = withPlugins(plugins, nextConfig);
