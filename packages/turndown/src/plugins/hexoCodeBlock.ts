import TurndownService from 'turndown';

export default function(turndownService: TurndownService) {
  turndownService.addRule('hexoCodeBlock', {
    filter: ['figure'],
    replacement: function(content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      const className = node.getAttribute('class');
      if (!className) {
        return content;
      }
      const match = className.match(/highlight (.*)/);
      const code = node.querySelector('td.code');
      const gutter = node.querySelector('.gutter');
      if (!match || !code || !gutter) {
        return content;
      }
      const language = match[1];
      return `\`\`\`${language}\n${(code as HTMLTableCellElement).innerText}\n\`\`\``;
    },
  });
}
