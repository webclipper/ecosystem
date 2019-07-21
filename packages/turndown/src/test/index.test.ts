import plugins from '../index';
import TurndownService from 'turndown';
import fs from 'mz/fs';
import * as path from 'path';

const service = new TurndownService();
service.use(plugins);

const fixturesFolder = path.join(__dirname, './fixtures');

Object.defineProperty(Element.prototype, 'innerText', {
  get() {
    if (
      this.textContent ===
      '<!doctype html><html lang="en"><head>    <meta charset="UTF-8">    < title>Document</title></head><body></body></html>'
    ) {
      return [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '    <meta charset="UTF-8">',
        '    < title>Document</title>',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
      ].join('\n');
    }
  },
});

describe('test turndown plugins', () => {
  it('', async () => {
    const fixtures = await fs.readdir(fixturesFolder);
    for (const fixture of fixtures) {
      const fixturesFolderPath = path.join(`${fixturesFolder}/${fixture}`);
      const file = await fs.readFile(path.join(fixturesFolderPath, 'index.html'), 'utf-8');
      const expectResult = await fs.readFile(path.join(fixturesFolderPath, 'expect'), 'utf-8');
      expect(service.turndown(file)).toEqual(expectResult);
    }
  });
});
