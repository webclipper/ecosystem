export default (code: string, language?: string | null) => {
  let languageString = language;
  if (typeof language !== 'string') {
    languageString = '';
  }
  if (typeof code !== 'string' || !code) {
    return '';
  }
  return `\`\`\`${languageString}\n${code}\n\`\`\`\n\n`;
};
