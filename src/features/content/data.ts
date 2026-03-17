import type { Locale } from "@/constants/i18n";
import {
  demoCategoryConfigs,
  docsCategoryConfigs,
  type DemoCategorySlug,
  type DocsCategorySlug,
  type NewsCategorySlug,
} from "./config";
import { getStaticDemoEntries } from "./demoStatic";
import { getStaticDocsEntries } from "./docsStatic";
import { getStaticNewsEntries } from "./newsStatic";
import { initialUseCases } from "@/features/useCases/data";

export type ManagedContentSection = "demo" | "documentation" | "news";
export type ManagedContentStatus = "draft" | "hidden" | "published";
export type ManagedContentCategorySlug = Exclude<DemoCategorySlug | DocsCategorySlug, "all"> | NewsCategorySlug;
export type LocalizedContent = Record<Locale, string>;

export type ManagedContentEntry = {
  authorName: string;
  authorRole: string;
  bodyMarkdown: LocalizedContent;
  categorySlug: ManagedContentCategorySlug;
  dateIso: string;
  externalUrl: string;
  id: string;
  imageSrc: string;
  section: ManagedContentSection;
  status: ManagedContentStatus;
  summary: LocalizedContent;
  title: LocalizedContent;
};

export const MANAGED_CONTENT_STORAGE_KEY = "querypie-admin-managed-content";
export const MANAGED_CONTENT_STORE_EVENT = "querypie:managed-content:changed";

export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function createEmptyManagedContentDraft(
  section: ManagedContentSection,
  categorySlug: ManagedContentCategorySlug,
): ManagedContentEntry {
  return {
    authorName: "",
    authorRole: "",
    bodyMarkdown: createLocalizedContent(),
    categorySlug,
    dateIso: getTodayIsoDate(),
    externalUrl: "",
    id: "new",
    imageSrc: "",
    section,
    status: "draft",
    summary: createLocalizedContent(),
    title: createLocalizedContent(),
  };
}

export function createLocalizedContent(value = ""): LocalizedContent {
  return {
    en: value,
    ko: value,
    ja: value,
  };
}

export function getLocalizedContent(content: LocalizedContent, locale: Locale) {
  return content[locale] || content.en || content.ko || content.ja || "";
}

export function slugifyTitle(title: string) {
  const normalized = title
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || `content-${Date.now()}`;
}

export function ensureUniqueSlug(id: string, items: ManagedContentEntry[], currentId?: string) {
  const taken = new Set(items.filter((item) => item.id !== currentId).map((item) => item.id));

  if (!taken.has(id)) {
    return id;
  }

  let index = 2;
  let nextId = `${id}-${index}`;

  while (taken.has(nextId)) {
    index += 1;
    nextId = `${id}-${index}`;
  }

  return nextId;
}

export function sortManagedContents(items: ManagedContentEntry[]) {
  return [...items].sort((left, right) => right.dateIso.localeCompare(left.dateIso));
}

export function formatPublicDate(locale: Locale, dateIso: string) {
  if (!dateIso) {
    return "";
  }

  const date = new Date(`${dateIso}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getWriterLabel(item: Pick<ManagedContentEntry, "authorName" | "authorRole">) {
  return item.authorRole.trim()
    ? `${item.authorName.trim()} / ${item.authorRole.trim()}`
    : item.authorName.trim();
}

export function getManagedCategoryLabel(
  section: ManagedContentSection,
  categorySlug: ManagedContentCategorySlug,
  locale: Locale,
) {
  if (section === "news") {
    return locale === "ko" ? "뉴스" : "News";
  }

  const configs = section === "demo" ? demoCategoryConfigs : docsCategoryConfigs;
  return configs.find((config) => config.slug === categorySlug)?.label[locale] ?? "";
}

export function getAdminCategoryHref(
  section: ManagedContentSection,
  categorySlug: ManagedContentCategorySlug,
) {
  if (section === "news") {
    return "/admin/news";
  }
  return `/admin/${section}/${categorySlug}`;
}

export function getAdminDetailHref(
  section: ManagedContentSection,
  categorySlug: ManagedContentCategorySlug,
  slug: string,
) {
  if (section === "news") {
    return `/admin/news/${slug}`;
  }
  return `/admin/${section}/${categorySlug}/${slug}`;
}

export function getPublicListHref(section: ManagedContentSection, locale: Locale) {
  if (section === "demo") return `/${locale}/demo`;
  if (section === "documentation") return `/${locale}/docs`;
  return `/${locale}/news`;
}

export function getPublicDetailHref(
  section: ManagedContentSection,
  locale: Locale,
  slug: string,
) {
  return section === "demo" ? `/${locale}/demo/${slug}` : `/${locale}/docs/${slug}`;
}

export const initialManagedContents: ManagedContentEntry[] = sortManagedContents([
  ...initialUseCases.map((item) => ({
    authorName: item.authorName,
    authorRole: item.authorRole,
    bodyMarkdown: createLocalizedContent(item.bodyMarkdown),
    categorySlug: item.categorySlug,
    dateIso: item.dateIso,
    externalUrl: "",
    id: item.id,
    imageSrc: item.imageSrc,
    section: "demo" as const,
    status: item.status,
    summary: createLocalizedContent(),
    title: createLocalizedContent(item.title),
  })),
  ...buildLocalizedDemoSeedEntries(),
  ...buildLocalizedDocsSeedEntries(),
  ...buildLocalizedNewsSeedEntries(),
]);

export function getSeedManagedContents(section?: ManagedContentSection) {
  return section
    ? initialManagedContents.filter((item) => item.section === section)
    : initialManagedContents;
}

function buildLocalizedDemoSeedEntries(): ManagedContentEntry[] {
  const enItems = getStaticDemoEntries("en");
  const koItems = getStaticDemoEntries("ko");
  const jaItems = getStaticDemoEntries("ja");

  return enItems.map((item, index) => ({
    authorName: item.writer,
    authorRole: "",
    bodyMarkdown: {
      en: item.bodyMarkdown,
      ko: koItems[index]?.bodyMarkdown ?? item.bodyMarkdown,
      ja: jaItems[index]?.bodyMarkdown ?? item.bodyMarkdown,
    },
    categorySlug: item.categorySlug,
    dateIso: item.date,
    externalUrl: "",
    id: item.slug,
    imageSrc: item.imageSrc,
    section: "demo" as const,
    status: "published" as const,
    summary: createLocalizedContent(),
    title: {
      en: item.title,
      ko: koItems[index]?.title ?? item.title,
      ja: jaItems[index]?.title ?? item.title,
    },
  }));
}

function buildLocalizedDocsSeedEntries(): ManagedContentEntry[] {
  const enItems = getStaticDocsEntries("en");
  const koItems = getStaticDocsEntries("ko");
  const jaItems = getStaticDocsEntries("ja");

  return enItems.map((item, index) => ({
    authorName: item.writer,
    authorRole: "",
    bodyMarkdown: {
      en: item.bodyMarkdown,
      ko: koItems[index]?.bodyMarkdown ?? item.bodyMarkdown,
      ja: jaItems[index]?.bodyMarkdown ?? item.bodyMarkdown,
    },
    categorySlug: item.categorySlug,
    dateIso: item.date,
    externalUrl: "",
    id: item.slug,
    imageSrc: item.imageSrc,
    section: "documentation" as const,
    status: "published" as const,
    summary: createLocalizedContent(),
    title: {
      en: item.title,
      ko: koItems[index]?.title ?? item.title,
      ja: jaItems[index]?.title ?? item.title,
    },
  }));
}

function buildLocalizedNewsSeedEntries(): ManagedContentEntry[] {
  const enItems = getStaticNewsEntries("en");
  const koItems = getStaticNewsEntries("ko");
  const jaItems = getStaticNewsEntries("ja");

  return enItems.map((item, index) => ({
    authorName: "QueryPie Team",
    authorRole: "PR",
    bodyMarkdown: createLocalizedContent(),
    categorySlug: "news" as const,
    dateIso: item.dateIso,
    externalUrl: item.externalUrl,
    id: item.slug,
    imageSrc: item.imageSrc,
    section: "news" as const,
    status: "published" as const,
    summary: {
      en: item.summary,
      ko: koItems[index]?.summary ?? item.summary,
      ja: jaItems[index]?.summary ?? item.summary,
    },
    title: {
      en: item.title,
      ko: koItems[index]?.title ?? item.title,
      ja: jaItems[index]?.title ?? item.title,
    },
  }));
}
