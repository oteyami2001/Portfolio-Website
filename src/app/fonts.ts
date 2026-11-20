import localFont from "next/font/local";

export const fontSans = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

/** Condensed display face for cinematic headlines. */
export const fontDisplay = localFont({
  src: "../../node_modules/@fontsource-variable/oswald/files/oswald-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 700",
});

/** Editorial serif for quotes and narrative beats. */
export const fontSerif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const fontMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});
