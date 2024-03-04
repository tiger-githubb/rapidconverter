"use client";
import ActualValues from "./ActualValues";
import ConversionStatistics from "./ConversionCalculator";
import { History } from "./History";
import ConverterForm from "./converter-form";

export default function Converter() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Convertion</h2>
          </div>
          <ActualValues />
          <ConverterForm />
          <History />
          <ConversionStatistics />
        </div>
      </div>
    </>
  );
}
