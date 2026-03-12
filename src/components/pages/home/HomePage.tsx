import Footer from "../../layout/Footer";
import Gnb from "../../layout/Gnb";
import Cta from "../../sections/Cta";
import ClientSection from "../../sections/ClientSection";
import ContentListSection from "../../sections/ContentListSection";
import FeatureSection from "../../sections/FeatureSection";
import Hero from "../../sections/Hero";
import McpSection from "../../sections/McpSection";
import NewsListSection from "../../sections/NewsListSection";
import ReviewSection from "../../sections/ReviewSection";

type FooterSection = {
  items: string[];
  title: string;
};

type FeatureItem = {
  body: string[];
  imageAlt: string;
  imageSrc: string;
  reverse?: boolean;
  title: string[];
};

type McpItem = {
  icon: React.ReactNode;
  label: string;
};

type ReviewItem = {
  body: string;
  company: string;
  imageSrc: string;
  role: string;
};

type NewsItem = {
  imageSrc: string;
  title: string;
};

type ContentListItem = {
  category: string;
  imageSrc: string;
  title: string;
};

export type HomePageProps = {
  clientCaption: string;
  contentListDescription: string;
  contentListItems: ContentListItem[];
  contentListLinks: string[];
  contentListTitle: string;
  ctaActionLabel: string;
  ctaDescription: string;
  ctaEyebrow: string;
  ctaTitle: string;
  footerLegalLinks: string[];
  footerSections: FooterSection[];
  featureItems: FeatureItem[];
  heroHeadingMuted: string;
  heroHeadingPrimary: string;
  heroPromptRotatingTexts: string[];
  mcpDescription: string[];
  mcpItems: McpItem[];
  mcpTitle: string;
  navItems: string[];
  newsItems: NewsItem[];
  newsTitle: string;
  reviewItems: ReviewItem[];
  reviewTitle: string;
};

export default function HomePage({
  clientCaption,
  contentListDescription,
  contentListItems,
  contentListLinks,
  contentListTitle,
  ctaActionLabel,
  ctaDescription,
  ctaEyebrow,
  ctaTitle,
  footerLegalLinks,
  footerSections,
  featureItems,
  heroHeadingMuted,
  heroHeadingPrimary,
  heroPromptRotatingTexts,
  mcpDescription,
  mcpItems,
  mcpTitle,
  navItems,
  newsItems,
  newsTitle,
  reviewItems,
  reviewTitle,
}: HomePageProps) {
  return (
    <main className="flex min-h-screen flex-col gap-[120px] bg-bg pt-[120px] text-fg">
      <Gnb actionLabel={ctaActionLabel} items={navItems} />
      <Hero
        headingMuted={heroHeadingMuted}
        headingPrimary={heroHeadingPrimary}
        promptRotatingTexts={heroPromptRotatingTexts}
      />
      <ClientSection caption={clientCaption} />
      <FeatureSection items={featureItems} />
      <McpSection
        description={mcpDescription}
        items={mcpItems}
        title={mcpTitle}
      />
      <ReviewSection items={reviewItems} title={reviewTitle} />
      <ContentListSection
        description={contentListDescription}
        items={contentListItems}
        links={contentListLinks}
        title={contentListTitle}
      />
      <NewsListSection items={newsItems} title={newsTitle} />
      <Cta
        actionLabel={ctaActionLabel}
        description={ctaDescription}
        eyebrow={ctaEyebrow}
        title={ctaTitle}
      />
      <Footer legalLinks={footerLegalLinks} sections={footerSections} />
    </main>
  );
}
