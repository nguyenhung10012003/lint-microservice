import { SortOrder } from '../types/query';
type OutputObject = { [key: string]: 'asc' | 'desc' };

export function convertOrderByObject(input: any): OutputObject {
  const output: OutputObject = {};

  for (const key in input) {
    if (input[key] === SortOrder.ASC) {
      output[key] = 'asc';
    } else {
      output[key] = 'desc';
    }
  }

  return output;
}
