"use client";

import { GlobalOutlined, CheckOutlined } from "@ant-design/icons";
import { useGetLocale, useSetLocale, useTranslate } from "@refinedev/core";
import { Button, Dropdown, MenuProps, Space } from "antd";

const languages = [
  {
    code: "ar",
    name: "العربية",
    flag: "مصر",
    dir: "rtl",
  },
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
];

export default function LanguageSelector({ className }: { className?: string }) {
  const getLocale = useGetLocale();
  const locale = getLocale();
  const changeLocale = useSetLocale();
  const t = useTranslate();

  const handleLanguageChange = (newLocale: string) => {
    changeLocale(newLocale);
  };

  const menuItems: MenuProps["items"] = languages.map((lang) => ({
    key: lang.code,
    label: (
      <Space>
        <span className="text-xl" aria-hidden="true">
          {lang.flag}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 500 }}>{lang.name}</span>
          <span
            style={{
              fontSize: "12px",
              opacity: 0.7,
              textTransform: "uppercase",
            }}
          >
            {lang.code}
          </span>
        </div>
      </Space>
    ),
    onClick: () => handleLanguageChange(lang.code),
    icon: locale === lang.code ? <CheckOutlined style={{ color: "var(--ant-primary-color)" }} /> : null,
    className: locale === lang.code ? "ant-dropdown-menu-item-selected" : "",
  }));

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
      <Button
        type="default"
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "12px",
        }}
        icon={<GlobalOutlined />}
      >
        <span style={{ textTransform: "uppercase" }}>{currentLanguage?.name}</span>
      </Button>
    </Dropdown>
  );
}
