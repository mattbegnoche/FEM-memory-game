import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// Not a variable font, so the weights the design uses must be listed explicitly.
const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson-hyperlegible",
});

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Front-end Mentor Memory Game",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={atkinsonHyperlegible.variable}>
      <body>{children}</body>
    </html>
  );
}
