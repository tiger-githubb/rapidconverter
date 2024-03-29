import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ConvertedData {
  date: string;
  value: number;
}
interface ConversionData {
  [currency: string]: number;
}

export function Overview(props: any) {
  const { currency } = props;
  const [conversionHistory, setConversionHistory] = useState<ConvertedData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndFormatConversionHistory(): Promise<ConvertedData[]> {
      const apiKey = "B1HqIhmcQHDozOHKzxBhPz9qZ0UrYfDf";
      const baseCurrency = currency;

      const targetCurrency = "XOF";
      const url = `https://api.currencybeacon.com/v1/timeseries?base=${baseCurrency}&start_date=2024-02-01&end_date=2024-02-29&symbol=${targetCurrency}&api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: { [date: string]: ConversionData } = await response.json();

        const formattedData: ConvertedData[] = Object.entries(data).map(
          ([date, rates]) => ({
            date,
            value: rates[targetCurrency] || 0,
          })
        );

        return formattedData;
      } catch (error) {
        console.error(
          "Error fetching and formatting conversion history:",
          error
        );
        throw error;
      }
    }

    async function loadConversionHistory() {
      try {
        const conversionHistory = await fetchAndFormatConversionHistory();
        setConversionHistory(conversionHistory.slice(2));
        setLoading(false);
      } catch (error) {
        console.error("Error loading conversion history:", error);
        setError("Failed to load conversion history");
        setLoading(false);
      }
    }

    loadConversionHistory();
  }, [currency]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const updateDateTime = () => {
    setCurrentDateTime(new Date());
  };
  setInterval(updateDateTime, 1000);

  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <CardTitle> {currency} vers XOF </CardTitle>
          <CardDescription suppressHydrationWarning>
            {" "}
            {currentDateTime.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ResponsiveContainer width="100%" height={300} className={"max-h-72"}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <LineChart data={conversionHistory}>
                <XAxis dataKey="date" />
                <YAxis
                  domain={["dataMin - 0,3", "dataMax + 0,3"]}
                  padding={{ bottom: 20, top: 20 }}
                  tickFormatter={(value) => value.toFixed(3)}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
