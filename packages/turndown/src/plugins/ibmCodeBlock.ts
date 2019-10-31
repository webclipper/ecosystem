import TurndownService from 'turndown';

export default function(turndownService: TurndownService) {
  turndownService.addRule('wechatCodeBlock', {
    filter: node => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }
      if (node.tagName !== 'DIV') {
        return false;
      }
      if (!node.className || !node.className.includes('code-syntaxhighlighter  htmlscript')) {
        return false;
      }
      const code = node.querySelector('div.code');
      if (!code) {
        return false;
      }
      return true;
    },
    replacement: function(content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      const codeNode = node.querySelector('div.code');
      const finalCode = Array.from(codeNode!.querySelectorAll('line'))
        .map(o => o.textContent)
        .join('\n');
      return `\`\`\`\n${finalCode}\n\`\`\`\n\n`;
    },
  });
}
