import { convertedAmount } from "@/interfaces/ConvertedAmount.interface";

export const fetchConvertedAmounts = async (setConvertedAmounts: any) => {
  const storedConvertedAmountsString = localStorage.getItem("convertedAmounts");
  const storedConvertedAmounts: convertedAmount[] = storedConvertedAmountsString
    ? JSON.parse(storedConvertedAmountsString)
    : [];
  setConvertedAmounts(storedConvertedAmounts);
};
