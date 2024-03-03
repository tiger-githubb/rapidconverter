import { InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ConvertedAmount {
  id: string;
  amount: number;
  currency: string;
  result: number;
}

const ConversionStatistics: React.FC = () => {
  const [convertedAmounts, setConvertedAmounts] = useState<ConvertedAmount[]>(
    []
  );

  useEffect(() => {
    const storedConvertedAmountsString =
      localStorage.getItem("convertedAmounts");
    const storedConvertedAmounts = storedConvertedAmountsString
      ? JSON.parse(storedConvertedAmountsString)
      : [];
    setConvertedAmounts(storedConvertedAmounts);
  }, []);

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
      standardDeviation: number;
    };
  } = {};

  Object.entries(convertedAmountsByCurrency).forEach(([currency, amounts]) => {
    const count = amounts.length;
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    const average = total / count;
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    // Calcul de l'écart type
    const sumOfSquaredDifferences = amounts.reduce((sum, amount) => {
      return sum + Math.pow(amount - average, 2);
    }, 0);
    const variance = sumOfSquaredDifferences / count;
    const standardDeviation = Math.sqrt(variance);

    currencyStatistics[currency] = {
      count,
      total,
      average,
      min,
      max,
      standardDeviation,
    };
  });

  // Calcul des statistiques globales pour toutes les conversions
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

  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CHF: "CHF",
  };

  return (
    <div className="">
      {Object.entries(currencyStatistics).map(([currency, stats]) => (
        <div key={currency}>
          <div className="flex items-center justify-between space-y-2 py-3">
            <h4 className="mr-2 text-xl mt-5 font-bold tracking-tight">
              Vous avez convertis {stats.count} montant en {currency} {"("}
              {currencySymbols[currency]}
              {")"}
            </h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium"> Somme :</CardTitle>
                <InfoIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.total.toFixed(2)} {currencySymbols[currency]}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  Moyenne :
                </CardTitle>
                <InfoIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.average.toFixed(2)} {currencySymbols[currency]}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  Minimum :
                </CardTitle>
                <InfoIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.min.toFixed(2)} {currencySymbols[currency]}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  écart-type :
                </CardTitle>
                <InfoIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.standardDeviation.toFixed(2)}{" "}
                  {currencySymbols[currency]}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  Maximum :
                </CardTitle>
                <InfoIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.max.toFixed(2)} {currencySymbols[currency]}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversionStatistics;
