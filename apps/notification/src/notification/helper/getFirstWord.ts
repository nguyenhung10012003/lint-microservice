export function getFirstWords(text: string, numberOfWord: number): string {
  const words = text.split(' ');
  const firstWords = words.slice(0, numberOfWord).join(' ');
  return firstWords;
}

export function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}
