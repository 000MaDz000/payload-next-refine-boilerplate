"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany, useTranslation } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export default function BlogPostList() {
  const { translate: t } = useTranslation();
  const { result, tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: { data: categories },
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: result?.data?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={t("blog-posts.fields.id")} />
        <Table.Column dataIndex="title" title={t("blog-posts.fields.title")} />
        <Table.Column
          dataIndex="content"
          title={t("blog-posts.fields.content")}
          render={(value: any) => {
            if (!value) return "-";
            return <MarkdownField value={value.slice(0, 80) + "..."} />;
          }}
        />
        <Table.Column
          dataIndex={"category"}
          title={t("blog-posts.fields.category")}
          render={(value) =>
            categoryIsLoading ? (
              <>{t("loading")}</>
            ) : (
              categories?.find((item) => item.id === value?.id)?.title
            )
          }
        />
        <Table.Column dataIndex="status" title={t("blog-posts.fields.status.title")} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={t("blog-posts.fields.createdAt")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={t("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
