import plugins from '../index';
import TurndownService from 'turndown';
import fs from 'mz/fs';
import * as path from 'path';

const service = new TurndownService();
service.use(plugins);

const fixturesFolder = path.join(__dirname, './fixtures');

const whiteList: string[] = [];
const blackList: string[] = [];

describe('test turndown plugins', () => {
  it('', async () => {
    const fixtures = await fs.readdir(fixturesFolder);
    for (const fixture of fixtures) {
      if (blackList.includes(fixture)) {
        continue;
      }
      const fixturesFolderPath = path.join(`${fixturesFolder}/${fixture}`);
      const file = await fs.readFile(path.join(fixturesFolderPath, 'index.html'), 'utf-8');
      let expectResult = await fs.readFile(path.join(fixturesFolderPath, 'expect.md'), 'utf-8');
      if (whiteList.includes(fixture)) {
        fs.writeFileSync(path.join(fixturesFolderPath, 'expect.md'), service.turndown(file));
        expectResult = await fs.readFile(path.join(fixturesFolderPath, 'expect.md'), 'utf-8');
      }
      expect(service.turndown(file)).toEqual(expectResult);
    }
  });
});
