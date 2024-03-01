"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConversionResponse from "@/interfaces/ConversionResponse.interface";
import { fetchConversion } from "@/lib/useCurrencyConverter";
import {
  BadgeDollarSign,
  BadgeEuro,
  BadgeJapaneseYen,
  BadgePoundSterling,
  BadgeSwissFranc,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import { ConversionHistory } from "./ConversionHistory";
import { Overview } from "./overview";

const currencies = [
  {
    code: "USD",
    icon: <BadgeDollarSign className="mb-3 h-6 w-6" />,
    label: "USD",
  },
  { code: "EUR", icon: <BadgeEuro className="mb-3 h-6 w-6" />, label: "EUR" },
  {
    code: "JPY",
    icon: <BadgeJapaneseYen className="mb-3 h-6 w-6" />,
    label: "JPY",
  },
  {
    code: "GBP",
    icon: <BadgePoundSterling className="mb-3 h-6 w-6" />,
    label: "GBP",
  },
  {
    code: "CHF",
    icon: <BadgeSwissFranc className="mb-3 h-6 w-6" />,
    label: "CHF",
  },
];

const renderCurrencyRadio = (currency: any) => (
  <div key={currency.code}>
    <RadioGroupItem
      value={currency.code}
      id={currency.code}
      className="peer sr-only"
    />
    <Label
      htmlFor={currency.code}
      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
    >
      {currency.icon}
      {currency.label}
    </Label>
  </div>
);

export default function ConverterForm() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [conversionResult, setConversionResult] =
    useState<ConversionResponse | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const updateDateTime = () => {
    setCurrentDateTime(new Date());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const amountNum = Number(amount);
      const data = await fetchConversion(fromCurrency, amountNum);
      setConversionResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  setInterval(updateDateTime, 1000);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Convertisseur de devises</CardTitle>
              <CardDescription>
                Convertissez en XOF au taux de change réel
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <RadioGroup
                  className="grid grid-cols-5 gap-4"
                  onChange={(e) =>
                    setFromCurrency((e.target as HTMLInputElement).value)
                  }
                  required
                >
                  {currencies.map(renderCurrencyRadio)}
                </RadioGroup>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="name">Montant</Label>
                  <Input
                    id="amount"
                    placeholder="Montant"
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <Button
                  className="w-full mt-3"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Chargement..." : "Convertir"}
                </Button>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="h-full flex flex-col justify-center ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Résultat de la conversion de {amount} {fromCurrency} en XOF
              </CardTitle>
              <Banknote />
            </CardHeader>
            <CardContent>
              <h2 className=" text-6xl font-bold ">
                {conversionResult?.value.toFixed(2) || 0.0} XOF
              </h2>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 ">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle> {fromCurrency} vers XOF </CardTitle>
              <CardDescription suppressHydrationWarning>
                {" "}
                {currentDateTime.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Overview />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>

      {/* section suivante */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle> Historique de conversion </CardTitle>
              <CardDescription suppressHydrationWarning>
                {" "}
                {currentDateTime.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <ConversionHistory />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="h-full flex flex-col justify-center ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Résultat de la conversion de {amount} {fromCurrency} en XOF
              </CardTitle>
              <Banknote />
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
