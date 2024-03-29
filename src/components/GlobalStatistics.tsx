import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { fetchConvertedAmounts } from "@/lib/localStorageUtils";

const GlobalStatistics: React.FC = () => {
  const [convertedAmounts, setConvertedAmounts] = useState<
    { result: number }[]
  >([]);

  useEffect(() => {
    fetchConvertedAmounts(setConvertedAmounts);
  }, []);

  const total = convertedAmounts.reduce((sum, { result }) => sum + result, 0);
  const average = total / convertedAmounts.length;

  const sumOfSquaredDifferences = convertedAmounts.reduce((sum, { result }) => {
    return sum + Math.pow(result - average, 2);
  }, 0);
  const variance = sumOfSquaredDifferences / convertedAmounts.length;
  const standardDeviation = Math.sqrt(variance);

  return (
    <Card className="h-full flex flex-col justify-center ">
      <CardHeader>
        <CardTitle>les statistiques totales des op&eacute;rations</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {" "}
                Somme totale :
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total.toFixed(2)} XOF</div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  Moyenne totale :
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {average.toFixed(2)} XOF
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {" "}
                  Écart-type total :
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {standardDeviation.toFixed(2)} XOF
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalStatistics;
