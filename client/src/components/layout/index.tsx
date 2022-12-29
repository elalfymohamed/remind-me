import * as React from "react";

import type { NextPage } from "next";

import { useRouter } from "next/router";
import { Header } from "../header";

export interface Props {
  children: React.ReactNode;
}

export const Layout: NextPage<Props> = ({ children }) => {
  const { pathname } = useRouter();

  const isHome = typeof window !== undefined && !pathname.includes("/auth/");

  return (
    <>
      {isHome && <Header />}
      {children}
    </>
  );
};
