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

export default function ConverterForm() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [conversionResult, setConversionResult] =
    useState<ConversionResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const amountNum = Number(amount);
      const data = await fetchConversion(fromCurrency, amountNum);
      setConversionResult(data);
      const updatedData = {
        fromCurrency: fromCurrency,
        amount: amount,
        conversionResult: conversionResult?.value,
      };
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                className="grid grid-cols-3 gap-4"
                onChange={(e) =>
                  setFromCurrency((e.target as HTMLInputElement).value)
                }
                required
              >
                <div>
                  <RadioGroupItem
                    value="USD"
                    id="USD"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="USD"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <BadgeDollarSign className="mb-3 h-6 w-6" />
                    USD
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="EUR"
                    id="EUR"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="EUR"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <BadgeEuro className="mb-3 h-6 w-6" />
                    EUR
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="JPY"
                    id="JPY"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="JPY"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <BadgeJapaneseYen className="mb-3 h-6 w-6" />
                    JPY
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="GBP"
                    id="GBP"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="GBP"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <BadgePoundSterling className="mb-3 h-6 w-6" />
                    GBP
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="CHF"
                    id="CHF"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="CHF"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <BadgeSwissFranc className="mb-3 h-6 w-6" />
                    CHF
                  </Label>
                </div>
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
              {conversionResult?.value.toFixed(2)} XOF
            </h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
