"use client";

import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow, useTranslate } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export default function CategoryShow() {
  const t = useTranslate();
  const { result: record, query } = useShow({});
  const { isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{t("categories.fields.id")}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{t("categories.fields.title")}</Title>
      <TextField value={record?.title} />
    </Show>
  );
}
