const Fs = require("fs");
const Path = require("path");

const dayjs = require("dayjs");

const Git = require('./git');

const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const CURRENT_YEAR = dayjs().year();
const PUBLIC_MANIFEST_PATH = `public/manifest.${CURRENT_YEAR}.json`;

/**
 * @typedef ManifestItem
 * @property {string} title - 标题
 * @property {string} path - 路径
 * @property {string} [createTime] - 创建时间
 * @property {string} [updateTime] - 更新时间
 * @property {string[]} [tags] - md文件标签数组
 */

/**
 * @param {string} relativePath 
 */
function resolvePath(relativePath) {
  return Path.resolve(process.cwd(), relativePath);
}

/**
 * 同步读取manifest
 * @returns {ManifestItem[]}
 */
function readManifest() {
  try {
    const json = Fs.readFileSync(
      resolvePath(PUBLIC_MANIFEST_PATH),
      {
        encoding: "utf-8",
      },
    ).toString();
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
  Fs.writeFileSync(resolvePath(PUBLIC_MANIFEST_PATH), data, { encoding: "utf-8" });
}

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
      return JSON.parse(value.replace(/\"/g, '\'').replace(/\'/g, '\"'));
    },
  }
];
function getMate(meta = '') {
  const metaObj = {};
  MATE_RULES.forEach((rule) => {
    const matched = meta.match(rule.match);
    if (matched) {
      let value = matched[1];
      if (rule.process) {
        value = rule.process(value);
      }
      metaObj[rule.key] = value;
    }
  });
  return metaObj;
}

/**
 * 
 * @param {string} filePath
 * @returns {ManifestItem}
 */
function createManifestItem(filePath) {
  const mdxFile = Fs.readFileSync(resolvePath(filePath), { encoding: 'utf-8' }).toString();
  const mateEndIndex = mdxFile.indexOf('}');
  const mate = getMate(mdxFile.slice(0, mateEndIndex));
  
  return {
    ...mate,
    path: filePath.replace(/pages|\.mdx/ig, ''),
    createTime: dayjs().format(DATE_FORMAT),
  }
}

/**
 * 
 * @param {ManifestItem} item 
 * @param {Git.FileChangeInfo} file
 */
function updateManifestItem(item, file) {
  item.path = file.filePath.replace(/pages|\.mdx/ig, '');
  item.updateTime = dayjs().format(DATE_FORMAT);
}

function build() {
  const manifest = readManifest();
  const changedFiles = Git.getFileChangeInfos();
  for (const file of changedFiles) {
    const { filePath, oldFilePath = '' } = file;
    const old = manifest.find((item) => {
      return  filePath.includes(item.path) || oldFilePath.includes(item.path);
    });
    if (!old) {
      manifest.push(createManifestItem(filePath));
    } else {
      updateManifestItem(old, file);
    }
  }
  console.log(manifest);
  writeManifest(JSON.stringify(manifest));

  process.env.IN_PRE_COMMIT = true;

  Git.gitAdd(PUBLIC_MANIFEST_PATH);
}

if (process.env.IN_PRE_COMMIT !== true) {
  build();
}
