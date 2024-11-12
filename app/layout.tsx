import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
