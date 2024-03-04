import React from "react";
import { ConversionHistory } from "./ConversionHistory";
import GlobalStatistics from "./GlobalStatistics";
import { fetchConvertedAmounts } from "@/lib/localStorageUtils";
import { convertedAmount } from "@/interfaces/ConvertedAmount.interface";

export const History = () => {
  const [convertedAmounts, setConvertedAmounts] = React.useState<
    convertedAmount[]
  >([]);

  const fetchAmounts = React.useCallback(() => {
    fetchConvertedAmounts(setConvertedAmounts);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      fetchAmounts();
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      if (scrollPosition + windowHeight >= documentHeight / 3) {
        fetchAmounts();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchAmounts]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ConversionHistory />
        </div>
        <div className="col-span-3">
          <GlobalStatistics />
        </div>
      </div>
    </>
  );
};
