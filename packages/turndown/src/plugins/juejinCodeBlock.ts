import TurndownService from 'turndown';

export default function (turndownService: TurndownService) {
  turndownService.addRule('juejinCodeBlock', {
    filter: (node) => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }
      if (node.tagName !== 'PRE') {
        return false;
      }
      // TODO fixme
      // 先临时忽略 csdn
      if (node.className === 'prettyprint') {
        return false;
      }
      const child = node.firstChild as HTMLElement;
      if (!child) {
        return false;
      }
      if (child.tagName !== 'CODE') {
        return false;
      }
      if (!child.className.includes('hljs')) {
        return false;
      }
      return true;
    },
    replacement: function (content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      node.querySelector('.copy-code-btn')?.remove();
      return `\`\`\`${(node.firstChild as HTMLElement)?.getAttribute('lang')}\n${node.firstChild?.textContent}\n\`\`\`\n\n`;
    },
  });
}
