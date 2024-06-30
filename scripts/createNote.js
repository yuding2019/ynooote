const fs = require('fs');
const path = require('path');

let fileName = process.argv[2];

if (!fileName) {
  console.log('请指定文件名');
  process.exit();
}

if (!fileName.endsWith('.mdx')) {
  fileName += '.mdx';
}

console.log('新建笔记:', fileName);

const initMdxContent = [
  "import MDXPageLayout from './components/MDXLayout'",
  "",
  "export const meta = {",
  "  title: '',",
  "  tags: [],",
  "  img: '',",
  "};",
  "",
  "",
  "",
  "export default ({ children }) => <MDXPageLayout meta={meta}>{children}</MDXPageLayout>;",
  "",
].join('\n');

fs.writeFileSync(path.resolve(process.cwd(), `pages/note/${fileName}`), initMdxContent)
