"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/constants/i18n";
import { getSeoEntriesSnapshot, getSeoPageDefinitionsSnapshot } from "@/features/seo/clientStore";
import { resolveSeoPageKey } from "@/features/seo/data";

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SeoRuntime({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    const definitions = getSeoPageDefinitionsSnapshot();
    const key = resolveSeoPageKey(pathname, definitions);
    if (!key) return;

    const entry = getSeoEntriesSnapshot().find((item) => item.key === key);
    if (!entry) return;

    document.title = entry.title[locale];
    upsertMeta("description", entry.description[locale]);
    upsertMeta("og:title", entry.ogTitle[locale], "property");
    upsertMeta("og:description", entry.ogDescription[locale], "property");
    upsertMeta("og:image", entry.ogImage, "property");
    upsertMeta("robots", `${entry.robotsIndex ? "index" : "noindex"},${entry.robotsFollow ? "follow" : "nofollow"}`);
  }, [locale, pathname]);

  return null;
}
