import TurndownService from 'turndown';

export default function (turndownService: TurndownService) {
  turndownService.addRule('gcoresGallery', {
    filter: (node) => {
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
    replacement: function (content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      const galleryIndex = node.querySelector('.gallery_indexOf')!.querySelectorAll('span');
      const title = node.querySelector('.story_caption')?.textContent;
      const galleryItem = node.querySelectorAll('.gallery_item')!;
      const code = Array.from(galleryItem)
        .slice(0, parseInt(galleryIndex[1].textContent!, 10))
        .map((o) => {
          const href = o.getAttribute('href');
          return `![${o.querySelector('.gallery_imageCaption')?.textContent ?? title}](${href})`;
        })
        .join('\n');
      return code;
    },
  });
}
