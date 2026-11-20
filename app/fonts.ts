import localFont from "next/font/local";

const inconsolata = localFont({
  src: "./fonts/Inconsolata.ttf",
  variable: "--font-inconsolata",
  display: "swap",
  weight: "200 900",
});

const shantellSans = localFont({
  src: "./fonts/ShantellSans.ttf",
  variable: "--font-shantellsans",
  display: "swap",
  weight: "200 900",
});

export { inconsolata, shantellSans };
