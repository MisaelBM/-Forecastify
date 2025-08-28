"use client"

import { Suspense, lazy } from "react";
import Loading from "@/components/loading";

const Content = lazy(() => import("./content").then(module => ({ default: module.Content })));

export default function Weather({ data }) {

  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}