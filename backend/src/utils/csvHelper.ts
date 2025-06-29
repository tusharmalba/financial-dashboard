import { Parser } from 'json2csv';

export const convertToCSV = (data: any[], fields: string[]): string => {
  const opts = { fields };
  const parser = new Parser(opts);
  return parser.parse(data);
};
