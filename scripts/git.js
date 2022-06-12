const ChildProcess = require("child_process");

/**
 * 防止中文路径出现异常
 */
function gitConfig() {
  ChildProcess.spawn("git", ["config", "core.quotepath", "false"]);
}

/**
 * git add 
 * @param {string} target 
 */
function gitAdd(target) {
  ChildProcess.spawnSync("git", ["add", target]);
}

/**
 * 获取本次变更的文件信息
 */
function gitDiff() {
  return ChildProcess.spawnSync(
    "git",
    ["diff", "--name-status", '--staged'],
    {
      encoding: 'utf-8',
    },
  );
};

const GIT_ACTION = {
  ADD: "A",
  RENAME: "R",
  MODIFY: "M",
  DELETE: "D",
};

/**
 * @typedef FileChangeInfo
 * @property {string} action
 * @property {string} filePath
 * @property {string} [oldFilePath]
 */

/**
 * git diff --name-status 结果为：
 *
 * A\txxx/xxxx.xx\n
 * D\txxx/xxxx.xx\n
 * R99\txxx/xxx.xx\n
 *
 * 经过一系列的 replace，最后的形式为
 * [action][ ][filepath][ ][oldFilepath?]
 * 
 * @returns {FileChangeInfo[]}
 */
function getFileChangeInfos() {
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
function processOriginChangeInfo(changedInfo) {
  return changedInfo
    .split("\n")
    .filter((line) => line.endsWith('mdx'))
    .map((info) => {
      return info
        .replace(/\?\?/, GIT_ACTION.ADD)
        .replace(/R\d+/g, GIT_ACTION.RENAME)
        .replace(/\t|\n/g, " ")
        .split(" ");
    })
    .map(createFileChangeInfo);
}

/**
 * @param {string[]}
 */
function createFileChangeInfo([action, filePath, oldFilePath]) {
  return { action, filePath, oldFilePath };
}

module.exports = {
  GIT_ACTION,
  gitAdd,
  gitDiff,
  gitConfig,
  getFileChangeInfos,
};
