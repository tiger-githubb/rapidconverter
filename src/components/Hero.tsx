import { TypewriterEffect } from "./ui/typewriter-effect";

export default function Hero() {
  return (
    <>
      <div className="h-lvh items-center flex flex-col justify-center">
        <h1 className="mb-4">Bienvenue sur Rapid Converter</h1>
        <TypewriterEffect
          words={[
            {
              text: "Convertisseur",
            },
            {
              text: " de",
            },
            {
              text: "devises",
            },
            {
              text: "Rapid",
              className: "text-blue-500 dark:text-blue-500",
            },
            {
              text: "Converter",
              className: "text-blue-500 dark:text-blue-500",
            },
          ]}
        />

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Convertir
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            En savoir Plus
          </button>
        </div>
      </div>
    </>
  );
}
