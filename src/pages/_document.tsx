import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Make documents the straight forward way"
      />
      <title>Quartz</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
