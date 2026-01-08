"use client";

import { Suspense } from "react";

import { NavigateToResource } from "@refinedev/nextjs-router";
import { Authenticated } from "@refinedev/core";
// import { Typography } from "antd";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <NavigateToResource />
      </Authenticated>
      {/* hello world */}
      {/* <Typography title="the title" >hi guys</Typography> */}
      {/* <Typography title="the title" >hi guys</Typography> */}
      {/* <Typography title="the title" >hi guys</Typography> */}
      {/* <Typography title="the title" >hi guys</Typography> */}
    </Suspense>
  );
}
