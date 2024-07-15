"use client";
import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "./index";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
