import * as fs from 'fs';

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

write_date();
