import { notFound } from "next/navigation";
import { isLocale } from "../../../../constants/i18n";
import DocsDetailClientPage from "../../../../components/pages/docs/DocsDetailClientPage";
import type { DocsDetailPageProps } from "../../../../components/pages/docs/DocsDetailPage";
import {
  getManagedCategoryLabel,
  getLocalizedContent,
  getPublicDetailHref,
  getSeedManagedContents,
} from "@/features/content/data";

type DocsDetailRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function DocsDetailRoute({ params }: DocsDetailRouteProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();
  const currentEntry = getSeedManagedContents("documentation").find((item) => item.id === slug);

  const relatedItems = getSeedManagedContents("documentation")
    .filter((entry) => entry.id !== slug && entry.status === "published")
    .map((entry) => ({
      category: getManagedCategoryLabel("documentation", entry.categorySlug, locale),
      href: getPublicDetailHref("documentation", locale, entry.id),
      imageSrc: entry.imageSrc,
      title: getLocalizedContent(entry.title, locale),
    }));

  return (
    <DocsDetailClientPage
      fallbackProps={{
        docsHref: `/${locale}/docs`,
        slug,
        bodyMarkdown: currentEntry ? getLocalizedContent(currentEntry.bodyMarkdown, locale) : "",
        category: currentEntry
          ? getManagedCategoryLabel("documentation", currentEntry.categorySlug, locale)
          : "",
        contentListDescription: "",
        contentListItems: relatedItems,
        contentListLinks: [],
        contentListTitle: "Contents List",
        date: currentEntry?.dateIso ?? "",
        heroImageAlt: currentEntry ? getLocalizedContent(currentEntry.title, locale) : "",
        heroImageSrc: currentEntry?.imageSrc ?? "/images/content/article-01.png",
        title: currentEntry ? getLocalizedContent(currentEntry.title, locale) : "",
        writer: currentEntry
          ? currentEntry.authorRole
            ? `${currentEntry.authorName} / ${currentEntry.authorRole}`
            : currentEntry.authorName
          : "",
      } satisfies DocsDetailPageProps}
      locale={locale}
      slug={slug}
    />
  );
}
