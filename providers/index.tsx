import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: Readonly<childrenProps>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
