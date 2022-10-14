const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const currentMonth = dayjs().format('YYYYMM');

const files = fs.readdirSync(path.resolve(process.cwd(), 'pages/note'));

const sameMonthFilesCount = files.filter((file) => file.startsWith(currentMonth)).length;
const newNoteNumber = sameMonthFilesCount + 1;
const newNoteMdxFileName = `${currentMonth}${newNoteNumber > 10 ? newNoteNumber : '0' + newNoteNumber}.mdx`;

const initMdxContent = [
  "import MDXPageLayout from '../../components/MDXComponents';",
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

fs.writeFileSync(path.resolve(process.cwd(), `pages/note/${newNoteMdxFileName}`), initMdxContent)
