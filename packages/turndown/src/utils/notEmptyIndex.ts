export default function findNotEmpty(data: any[], index: number) {
  let expect = index;
  let start = 0;
  while (expect >= 0) {
    if (typeof data[start] === 'undefined') {
      expect--;
      if (expect < 0) {
        return start;
      }
    }
    start++;
  }
  return start;
}
