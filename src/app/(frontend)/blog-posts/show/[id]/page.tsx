"use client";

import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { useOne, useShow, useTranslate } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export default function BlogPostShow() {
  const t = useTranslate();
  const { result: record, query } = useShow({});
  const { isLoading } = query;

  const {
    result: category,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{t("blog-posts.fields.id")}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{t("blog-posts.fields.title")}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{t("blog-posts.fields.content")}</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>{t("blog-posts.fields.category")}</Title>
      <TextField
        value={categoryIsLoading ? <>{t("loading")}</> : <>{category?.title}</>}
      />
      <Title level={5}>{t("blog-posts.fields.status.title")}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{t("blog-posts.fields.createdAt")}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
}
