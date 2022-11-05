const withLess = require("next-with-less");
const withPlugins = require("next-compose-plugins");

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

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {},
    }
  ],
  [withMDX],
];

module.exports = withPlugins(plugins, nextConfig);
