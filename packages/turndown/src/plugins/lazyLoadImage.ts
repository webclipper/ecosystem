import TurndownService from 'turndown';

export default function(turndownService: TurndownService) {
  turndownService.addRule('lazyLoadImage', {
    filter: ['img'],
    replacement: function(_: any, node: any) {
      const attributes = ['data-src', 'data-original-src'];
      for (const attribute of attributes) {
        let dataSrc: string = node.getAttribute(attribute);
        if (dataSrc) {
          if (dataSrc.startsWith('//')) {
            dataSrc = `${window.location.protocol}${dataSrc}`;
          }
          return `![](${dataSrc})`;
        }
      }
      return `![](${node.getAttribute('src')})`;
    },
  });
}
