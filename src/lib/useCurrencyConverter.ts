import ConversionResponse from "@/interfaces/ConversionResponse.interface";

export async function fetchConversion(fromCurrency: string, amount: number) {
  const apiKey = "B1HqIhmcQHDozOHKzxBhPz9qZ0UrYfDf";
  const toCurrency = "XOF";
  const url = `https://api.currencybeacon.com/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: ConversionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
