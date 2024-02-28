import {
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
  SwissFranc,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function ActualValues() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Dollar américain
          </CardTitle>
          <DollarSign className="mb-3 h-6 w-6" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$ 0</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Euro</CardTitle>
          <Euro />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0 e</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Yen</CardTitle>
          <JapaneseYen />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0 Y</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Livre sterling</CardTitle>
          <PoundSterling />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> 0 L</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Franc suisse</CardTitle>
          <SwissFranc />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0 F</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Franc CFA</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0 XOF</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActualValues;
