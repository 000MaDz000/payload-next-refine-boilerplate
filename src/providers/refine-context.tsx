"use client";

import React from "react";
import { Refine } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/data-provider";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { i18nProvider } from "@providers/i18n-provider";
import { AppIcon } from "@components/app-icon";

export const RefineContext = ({ children }: React.PropsWithChildren) => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProviderClient}
      i18nProvider={i18nProvider}
      resources={[
        {
          name: "blog-posts",
          list: "/blog-posts",
          create: "/blog-posts/create",
          edit: "/blog-posts/edit/:id",
          show: "/blog-posts/show/:id",
          meta: {
            canDelete: true,
          },
        },
        {
          name: "categories",
          list: "/categories",
          create: "/categories/create",
          edit: "/categories/edit/:id",
          show: "/categories/show/:id",
          meta: {
            canDelete: true,
          },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        projectId: "EbqyHo-AwpRcN-KWs2OF",
        title: { text: "Refine Project", icon: <AppIcon /> },
      }}
    >
      {children}
      <RefineKbar />
    </Refine>
  );
};
