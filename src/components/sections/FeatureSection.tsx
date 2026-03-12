type FeatureItem = {
  body: string[];
  imageAlt: string;
  imageSrc: string;
  reverse?: boolean;
  title: string[];
};

type FeatureSectionProps = {
  className?: string;
  items?: FeatureItem[];
};

const defaultItems: FeatureItem[] = [
  {
    body: [
      "Turn conversations and customer feedback",
      "into actionable issues that are routed,",
      "labeled, and prioritized for the right team.",
    ],
    imageAlt: "AIP workspace preview",
    imageSrc: "/images/home/features/feature-panel-a.png",
    title: ["Make product", "operations self-driving"],
  },
  {
    body: [
      "Turn conversations and customer feedback",
      "into actionable issues that are routed,",
      "labeled, and prioritized for the right team.",
    ],
    imageAlt: "Model selector preview",
    imageSrc: "/images/home/features/feature-panel-b.png",
    reverse: true,
    title: ["Make product", "operations self-driving"],
  },
  {
    body: [
      "Turn conversations and customer feedback",
      "into actionable issues that are routed,",
      "labeled, and prioritized for the right team.",
    ],
    imageAlt: "AIP workspace preview",
    imageSrc: "/images/home/features/feature-panel-a.png",
    title: ["Make product", "operations self-driving"],
  },
  {
    body: [
      "Turn conversations and customer feedback",
      "into actionable issues that are routed,",
      "labeled, and prioritized for the right team.",
    ],
    imageAlt: "Model selector preview",
    imageSrc: "/images/home/features/feature-panel-b.png",
    reverse: true,
    title: ["Make product", "operations self-driving"],
  },
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function FeatureCopy({ body, title }: Pick<FeatureItem, "body" | "title">) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5 not-italic">
      <div className="w-full font-pretendard type-h2 leading-7 tracking-[-0.3px] text-fg">
        {title.map((line) => (
          <p key={line} className="m-0">
            {line}
          </p>
        ))}
      </div>
      <div className="w-full font-pretendard type-body-lg leading-6 text-mute-fg">
        {body.map((line) => (
          <p key={line} className="m-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function FeatureImage({ imageAlt, imageSrc }: Pick<FeatureItem, "imageAlt" | "imageSrc">) {
  return (
    <div className="h-[400px] w-[790px] shrink-0 overflow-hidden rounded-box bg-[linear-gradient(116.854deg,#303131_0%,#232323_100%)]">
      <img alt={imageAlt} className="block h-full w-full object-cover" src={imageSrc} />
    </div>
  );
}

export default function FeatureSection({
  className,
  items = defaultItems,
}: FeatureSectionProps) {
  return (
    <section className={cx("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-[1200px] flex-col gap-[100px]">
        {items.map((item, index) => (
          <div key={`${item.imageSrc}-${index}`} className="flex items-start gap-[60px]">
            {item.reverse ? (
              <>
                <FeatureImage imageAlt={item.imageAlt} imageSrc={item.imageSrc} />
                <FeatureCopy body={item.body} title={item.title} />
              </>
            ) : (
              <>
                <FeatureCopy body={item.body} title={item.title} />
                <FeatureImage imageAlt={item.imageAlt} imageSrc={item.imageSrc} />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
