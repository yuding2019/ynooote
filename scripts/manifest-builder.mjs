import path from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import dayjs from 'dayjs';

import { getFileChangeInfos, gitAdd } from './git.mjs';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const PUBLIC_MANIFEST_PATH = `public/manifest.json`;

/**
 * @typedef ManifestItem
 * @property {string} title - 标题
 * @property {string} path - 路径
 * @property {string} [img] - 路径
 * @property {string} [createTime] - 创建时间
 * @property {string} [updateTime] - 更新时间
 * @property {string[]} [tags] - mdx文件标签数组
 */

/**
 * @param {string} relativePath
 */
function resolvePath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}

/**
 * 同步读取manifest
 * @returns {ManifestItem[]}
 */
function readManifest() {
  try {
    const json = readFileSync(resolvePath(PUBLIC_MANIFEST_PATH), {
      encoding: 'utf-8',
    }).toString();
    return json ? JSON.parse(json) : [];
  } catch (error) {
    return [];
  }
}

/**
 * 更新manifest
 * @param {string} data
 */
function writeManifest(data) {
  writeFileSync(resolvePath(PUBLIC_MANIFEST_PATH), data, {
    encoding: 'utf-8',
  });
}

// 获取mdx文件中的元信息
const MATE_RULES = [
  {
    key: 'title',
    match: /title.+\'(.+)\'\,/,
  },
  {
    key: 'tags',
    match: /tags?.+(\[.+\])\,/,
    process: (value = '') => {
      if (!value) {
        return [];
      }
      return JSON.parse(value.replace(/\"/g, "'").replace(/\'/g, '"'));
    },
  },
  {
    key: 'img',
    match: /img.+\'(.+)\'\,/,
  },
];

function getMeta(metaStr = '') {
  const meta = {};
  MATE_RULES.forEach((rule) => {
    const matched = metaStr.match(rule.match);
    if (matched) {
      let value = matched[1];
      if (rule.process) {
        value = rule.process(value);
      }
      meta[rule.key] = value;
    }
  });
  return meta;
}

/**
 *
 * @param {string} filePath
 * @returns {ManifestItem}
 */
function createManifestItem(filePath) {
  const mdxFile = readFileSync(resolvePath(filePath), {
    encoding: 'utf-8',
  }).toString();
  const meta = getMeta(mdxFile.slice(0, mdxFile.indexOf('}')));

  return {
    ...meta,
    path: filePath.replace(/pages|\.mdx/gi, ''),
    createTime: dayjs().format(DATE_FORMAT),
  };
}

/**
 *
 * @param {ManifestItem} item
 * @param {Git.FileChangeInfo} file
 */
function updateManifestItem(item, file) {
  const filePath = file.newFilePath || file.filePath;
  const mdxFile = readFileSync(resolvePath(filePath), {
    encoding: 'utf-8',
  }).toString();
  const meta = getMeta(mdxFile.slice(0, mdxFile.indexOf('}')));

  item.img = meta.img;
  item.tags = meta.tags;
  item.title = meta.title;
  item.path = filePath.replace(/pages|\.mdx/gi, '');
  item.updateTime = dayjs().format(DATE_FORMAT);
}

function build() {
  const manifest = readManifest();
  const changedFiles = getFileChangeInfos();
  console.log('changedFiles', changedFiles, manifest);
  changedFiles.forEach((file) => {
    const { filePath, newFilePath = '' } = file;
    const old = manifest.find((item) => {
      return filePath.endsWith(`${item.path}.mdx`) || newFilePath.endsWith(`${item.path}.mdx`);
    });
    if (!old) {
      manifest.push(createManifestItem(filePath));
    } else {
      updateManifestItem(old, file);
    }
  });

  writeManifest(JSON.stringify(manifest));

  process.env.IN_PRE_COMMIT = true;

  gitAdd(PUBLIC_MANIFEST_PATH);
}

if (process.env.IN_PRE_COMMIT !== true) {
  build();
}
