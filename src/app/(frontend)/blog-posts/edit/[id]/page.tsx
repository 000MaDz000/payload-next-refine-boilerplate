"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export default function BlogPostEdit() {
  const t = useTranslate();
  const { formProps, saveButtonProps, query } = useForm({});

  const blogPostsData = query?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("blog-posts.fields.title")}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("blog-posts.fields.content")}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={t("blog-posts.fields.category")}
          name={["category", "id"]}
          initialValue={formProps?.initialValues?.category?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={t("blog-posts.fields.status.title")}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: t("blog-posts.fields.status.draft") },
              { value: "published", label: t("blog-posts.fields.status.published") },
              { value: "rejected", label: t("blog-posts.fields.status.rejected") },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}
