import {
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
  SwissFranc,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const currencies = [
  { name: "Dollar americain", icon: <DollarSign />, code: "USD", symbol: "$" },
  { name: "Euro", icon: <Euro />, code: "EUR", symbol: "€" },
  { name: "Yen", icon: <JapaneseYen />, code: "JPY", symbol: "¥" },
  { name: "Livre sterling", icon: <PoundSterling />, code: "GBP", symbol: "£" },
  { name: "Franc suisse", icon: <SwissFranc />, code: "CHF", symbol: "CHF" },
];

function CurrencyCard({
  currency,
}: {
  currency: { name: string; icon: JSX.Element; amount: string; symbol: string };
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{currency.name}</CardTitle>
        {currency.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency.amount} {currency.symbol}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ActualValues() {
  const [conversionRates, setConversionRates] = useState<
    {
      name: string;
      icon: JSX.Element;
      amount: string;
      code: string;
      symbol: string;
    }[]
  >([]);

  https: useEffect(() => {
    async function fetchConversionRates() {
      const apiKey = "B1HqIhmcQHDozOHKzxBhPz9qZ0UrYfDf";
      const baseUrl = "https://api.currencybeacon.com/v1/latest";

      try {
        const response = await fetch(
          `${baseUrl}?base=XOF&symbols=${currencies
            .map((currency) => currency.code)
            .join(",")}&api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du taux de change");
        }
        const data = await response.json();
        const conversionData = currencies.map((currency) => ({
          ...currency,
          amount: data.response.rates[currency.code].toFixed(6),
        }));

        setConversionRates(conversionData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du taux de change :",
          error
        );
        const conversionDataWithError = currencies.map((currency) => ({
          ...currency,
          amount: "Erreur",
        }));
        setConversionRates(conversionDataWithError);
      }
    }

    fetchConversionRates();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {conversionRates.map((currency, index) => (
        <CurrencyCard key={index} currency={currency} />
      ))}
    </div>
  );
}
