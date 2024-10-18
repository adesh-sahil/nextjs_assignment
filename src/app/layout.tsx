import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/storeProvider";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "NextJS BoilerPlate",
  description: "Plutus NextJS BoilerPlate for new NextJS projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={``}>
          <div className="flex min-h-screen p-8 rounded-lg">
            <Sidebar /> 
            <main className="ml-[20%] px-8 w-full flex justify-center items-center">
              <div className="max-w-6xl w-full">{children}</div>
            </main>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
