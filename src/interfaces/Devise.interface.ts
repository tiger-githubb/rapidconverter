export interface The0 {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: DecimalMark;
  thousands_separator: DecimalMark;
}

export enum DecimalMark {
  DecimalMark = ",",
  Empty = ".",
  Purple = " ",
}

export interface Meta {
  code: number;
  disclaimer: string;
}
