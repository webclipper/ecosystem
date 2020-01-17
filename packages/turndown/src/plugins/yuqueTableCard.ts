import TurndownService from 'turndown';
import notEmptyIndex from '../utils/notEmptyIndex';

interface TableNode {
  colSpan: number;
  rowSpan: number;
  content: string;
}

export default function(turndownService: TurndownService) {
  turndownService.addRule('yuqueTableCard', {
    filter: node => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }
      if (node.tagName !== 'DIV') {
        return false;
      }
      if (node.getAttribute('data-lake-card') !== 'table') {
        return false;
      }
      return true;
    },
    replacement: function(content: string, node: Node) {
      if (!(node instanceof HTMLElement)) {
        return content;
      }
      const lines = node.querySelectorAll('tr');
      const jsonNodes: TableNode[][] = [];
      for (const line of Array.from(lines)) {
        const nodes = line.querySelectorAll('td');
        const nodesValue = Array.from(nodes).map(node => ({
          colSpan: Number(node.getAttribute('colspan')) || 1,
          rowSpan: Number(node.getAttribute('rowspan')) || 1,
          content: Array.from(node.querySelectorAll('p'))
            .map(o => o.textContent)
            .join('<br />'),
        }));
        jsonNodes.push(nodesValue);
      }
      const temp = jsonNodes.map(jsonNode => {
        const foo: Omit<TableNode, 'colSpan'>[] = [];
        jsonNode.forEach(o => {
          let flag = true;
          for (let i = 0; i < o.colSpan; i++) {
            if (flag) {
              foo.push({
                rowSpan: o.rowSpan,
                content: o.content,
              });
            } else {
              foo.push({
                rowSpan: o.rowSpan,
                content: '',
              });
            }
            flag = false;
          }
        });
        return foo;
      });
      const result: string[][] = [];
      const rowNumber = temp.length;
      for (let i = 0; i < rowNumber; i++) {
        const currentRow = temp[i];
        currentRow.forEach(colNode => {
          let flag = true;
          let tempRow = i;
          if (!result[tempRow]) {
            result[tempRow] = [];
          }
          const expectIndex = notEmptyIndex(result[tempRow], 0);
          for (let j = 0; j < colNode.rowSpan; j++) {
            if (!result[tempRow]) {
              result[tempRow] = [];
            }
            result[tempRow][expectIndex] = flag ? colNode.content : '';
            tempRow++;
            flag = false;
          }
        });
      }
      const divider = result[0].map(() => '-');
      result.splice(1, 0, divider);
      return `${result.map(row => `|${row.join('|')}|`).join('\n')}\n\n`;
    },
  });
}
