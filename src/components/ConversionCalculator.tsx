import { ConvertedAmount } from "@/interfaces/ConvertedAmount.interface";
import { calculateCurrencyStatistics } from "@/lib/conversionDataUtils";
import { InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ConversionStatistics: React.FC = () => {
  const [convertedAmounts, setConvertedAmounts] = useState<ConvertedAmount[]>(
    []
  );
  const [currencyStatistics, setCurrencyStatistics] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    const storedConvertedAmountsString =
      localStorage.getItem("convertedAmounts");
    const storedConvertedAmounts = storedConvertedAmountsString
      ? JSON.parse(storedConvertedAmountsString)
      : [];
    setConvertedAmounts(storedConvertedAmounts);
  }, []);

  useEffect(() => {
    const stats = calculateCurrencyStatistics(convertedAmounts);
    setCurrencyStatistics(stats);
  }, [convertedAmounts]);

  return (
    <div className="">
      {Object.entries(currencyStatistics).map(([currency, stats]) => (
        <div key={currency}>
          <div className="flex items-center justify-between space-y-2 py-3">
            <h4 className="mr-2 text-xl mt-5 font-bold tracking-tight">
              {currency} : Vous avez converti {stats.count} montant(s) en XOF
            </h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
            {Object.entries(stats).map(([key, value]) => (
              <Card className="col-span-2" key={key}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{key} :</CardTitle>
                  <InfoIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof value === "number"
                      ? (value as number).toFixed(2) + " XOF"
                      : (value as string)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversionStatistics;
