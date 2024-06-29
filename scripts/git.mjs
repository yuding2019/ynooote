import { spawn, spawnSync } from 'node:child_process';

/** 配置一下git，防止中文路径出现异常 */
function gitConfig() {
  spawn('git', ['config', 'core.quotepath', 'false']);
}

/**
 * git add
 * @param {string} target
 */
export function gitAdd(target) {
  spawnSync('git', ['add', target]);
}

/**
 * 获取本次变更的文件信息
 */
export function gitDiff() {
  return spawnSync('git', ['diff', '--name-status', '--staged'], {
    encoding: 'utf-8',
  });
}

/** git操作关键字 */
export const GIT_ACTION = {
  ADD: 'A',
  RENAME: 'R',
  MODIFY: 'M',
  DELETE: 'D',
};

/**
 * @typedef FileChangeInfo 文件变更信息
 * @property {string} action
 * @property {string} filePath
 * @property {string} [newFilePath]
 */

/**
 * git diff --name-status 结果为：
 *```
 * A\txxx/xxxx.xx\n
 * D\txxx/xxxx.xx\n
 * R99\txxx/xxx.xx\n
 *```
 * 经过一系列的 replace，最后的形式为
 * [action][ ][filepath][ ][newFilepath?]
 *
 * @returns {FileChangeInfo[]}
 */
export function getFileChangeInfos() {
  gitConfig();

  const { error, stdout, stderr } = gitDiff();
  if (error) {
    console.error(error);
    console.error(stderr);
    return [];
  }
  return processOriginChangeInfo(stdout.toString());
}

/**
 * @param {string} changedInfo
 * @returns {FileChangeInfo}
 */
export function processOriginChangeInfo(changedInfo) {
  // 从变更信息中将mdx文件取出，这个文件作为笔记文件
  return changedInfo
    .split('\n')
    .filter((line) => line.endsWith('mdx'))
    .map((info) => {
      return info
        .replace(/\?\?/, GIT_ACTION.ADD)
        .replace(/R\d+/g, GIT_ACTION.RENAME)
        .replace(/\t|\n/g, ' ')
        .split(' ');
    })
    .map(createFileChangeInfo);
}

/**
 * @param {string[]}
 */
export function createFileChangeInfo([action, filePath, newFilePath]) {
  return { action, filePath, newFilePath };
}
