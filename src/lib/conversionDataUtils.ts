import { ConvertedAmount } from "@/interfaces/ConvertedAmount.interface";

export const calculateCurrencyStatistics = (
  convertedAmounts: ConvertedAmount[]
) => {
  const convertedAmountsByCurrency: { [key: string]: number[] } =
    convertedAmounts.reduce((acc, amount) => {
      if (!acc[amount.currency]) {
        acc[amount.currency] = [];
      }
      (acc[amount.currency] as number[]).push(amount.result);
      return acc;
    }, {} as { [key: string]: number[] });

  const currencyStatistics: {
    [key: string]: {
      count: number;
      total: number;
      average: number;
      min: number;
      max: number;
    };
  } = {};

  Object.entries(convertedAmountsByCurrency).forEach(([currency, amounts]) => {
    const count = amounts.length;
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    const average = total / count;
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    const sumOfSquaredDifferences = amounts.reduce((sum, amount) => {
      return sum + Math.pow(amount - average, 2);
    }, 0);
    const variance = sumOfSquaredDifferences / count;

    currencyStatistics[currency] = {
      count,
      total,
      average,
      min,
      max,
    };
  });

  return currencyStatistics;
};

export const calculateGlobalStatistics = (
  convertedAmounts: ConvertedAmount[]
) => {
  const allConvertedAmounts = convertedAmounts.map((amount) => amount.result);
  const totalAll = allConvertedAmounts.reduce((sum, amount) => sum + amount, 0);
  const averageAll = totalAll / allConvertedAmounts.length;

  const sumOfSquaredDifferencesAll = allConvertedAmounts.reduce(
    (sum, amount) => {
      return sum + Math.pow(amount - averageAll, 2);
    },
    0
  );
  const varianceAll = sumOfSquaredDifferencesAll / allConvertedAmounts.length;
  const standardDeviationAll = Math.sqrt(varianceAll);

  return {
    totalAll,
    averageAll,
    standardDeviationAll,
  };
};

export const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
};
