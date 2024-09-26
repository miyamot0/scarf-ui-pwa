import * as fs from 'fs';
import packageJson from '../package.json';
import licenses from './licenses.json';
import { SavedGlobalStateType } from '../src/questions/types/GlobalStateType';

const coverageSummary = {
  total: {
    lines: {
      pct: 0,
    },
  },
};

/**
 * Write out current build date to string for easy reference
 */
function write_date() {
  const build_date = new Date().toLocaleDateString('en-US');
  const object_to_write = {
    date: build_date,
  };

  fs.writeFileSync('./src/assets/build_date.json', JSON.stringify(object_to_write), 'utf-8');
}

/**
 * Populate the software section of the README with the licenses
 */
function populate_software() {
  return licenses.map((relevant_license) => {
    const author = relevant_license.author.trim() === 'n/a' ? '' : ` ${relevant_license.author}`;

    const license = relevant_license?.licenseType ?? 'Error';

    const author_text = author === '' ? '' : `Copyright${author} -- `;

    return `${relevant_license.name} (${
      relevant_license.installedVersion
    }). ${author_text}${license} Licensed: [Repo](${relevant_license.link.replace('git+', '')}) `;
  });
}

/**
 * Pull the contents of the README.md file
 *
 * @returns the contents of the README.md file
 */
function read_md() {
  return fs.readFileSync('./scripts/README.md', 'utf-8');
}

/**
 * Write the contents to the README.md file
 *
 * @param content the content to write to the README.md file
 */
function write_md(content: string) {
  fs.writeFileSync('README.md', content, 'utf-8');
}

function generate_manifest_archive() {
  const files_json = fs.readdirSync('./public/archives', 'utf-8');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const archive_vector: any[] = [];

  files_json.forEach((file) => {
    const file_stats = fs.readFileSync(`./public/archives/${file}`, { encoding: 'utf8' });
    const file_json = JSON.parse(file_stats) as SavedGlobalStateType;

    archive_vector.push({
      ID: file.replace('.json', ''),
      Author: file_json.Author,
      Title: file_json.Title,
      DateSaved: file_json.DateSaved,
    });
  });

  fs.writeFileSync('./src/assets/archives.json', JSON.stringify(archive_vector), 'utf-8');
}

const converage_pct = `${coverageSummary.total.lines.pct}_Percent`;
const version_text = `Version ${packageJson.version}\r\n`;
const software_pkg_text = populate_software().join('\r\n \r\n');

const coverage_color = coverageSummary.total.lines.pct < 80 ? 'orange' : 'green';

let readme_md = read_md();
readme_md = readme_md.replace('{{VERSION}}', version_text);
readme_md = readme_md.replace('{{VERSION_NUMBER}}', packageJson.version);
readme_md = readme_md.replace('{{LICENSES}}', software_pkg_text);
readme_md = readme_md.replace('{{PERCENTAGE}}', converage_pct);
readme_md = readme_md.replace('{{PERCENTAGE_COLOR}}', coverage_color);

write_md(readme_md);

write_date();

generate_manifest_archive();
