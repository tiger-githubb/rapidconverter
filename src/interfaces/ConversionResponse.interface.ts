export default interface ConversionResponse {
  meta?: Meta;
  response?: ConversionResponse;
  timestamp: number;
  date: Date;
  from: string;
  to: string;
  amount: number;
  value: number;
}

export interface Meta {
  code: number;
  disclaimer: string;
}
