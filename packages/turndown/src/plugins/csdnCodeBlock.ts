import TurndownService from 'turndown';

export default function (turndownService: TurndownService) {
  turndownService.addRule('csdnCodeBlock', {
    filter: (node) => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }
      if (node.tagName !== 'PRE') {
        return false;
      }
      if (node.className !== 'prettyprint') {
        return false;
      }
      const codeLine = node.querySelectorAll('code');
      if (!codeLine) {
        return false;
      }

      return true;
    },
    replacement: function (content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      node.querySelector('.pre-numbering')?.remove();
      const codeBlock = node.querySelector('code')!;
      const code = codeBlock.textContent;
      let language: string = '';
      let languageMatchResult = codeBlock.className.match(/language-(.*) /);
      if (languageMatchResult) {
        language = languageMatchResult[1];
      }
      language = language.split(' ')[0];
      return `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    },
  });
}
