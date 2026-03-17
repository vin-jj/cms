import { notFound } from "next/navigation";
import NewsListClientPage from "../../../components/pages/news/NewsListClientPage";
import { isLocale } from "../../../constants/i18n";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const copy = {
    en: { title: "News" },
    ko: { title: "뉴스" },
    ja: { title: "News" },
  }[locale];

  return <NewsListClientPage locale={locale} title={copy.title} />;
}
