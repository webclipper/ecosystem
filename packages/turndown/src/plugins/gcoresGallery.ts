import TurndownService from 'turndown';

export default function(turndownService: TurndownService) {
  turndownService.addRule('gcoresGallery', {
    filter: node => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }
      if (node.tagName !== 'FIGURE') {
        return false;
      }
      const { className } = node;
      if (typeof className !== 'string' || !className.includes('story_block-atomic-gallery')) {
        return false;
      }
      return true;
    },
    replacement: function(content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      let textContent = '';
      const galleryIndex = node.querySelector('.gallery_indexOf')!.querySelectorAll('span');
      const title = node.querySelector('.story_caption');
      if (title) {
        textContent = title.textContent || '';
      }
      const galleryItem = node.querySelectorAll('.gallery_item')!;
      const code = Array.from(galleryItem)
        .slice(0, parseInt(galleryIndex[1].textContent!, 10))
        .map(o => {
          let title = textContent;
          const href = o.getAttribute('href');
          if (o.querySelector('.gallery_imageCaption')) {
            title = o.querySelector('.gallery_imageCaption')!.textContent!;
          }
          return `![${title}](${href})`;
        })
        .join('\n');
      return code;
    },
  });
}
