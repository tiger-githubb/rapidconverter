"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import ActualValues from "./ActualValues";
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
        </div>
      </div>
    </>
  );
}
