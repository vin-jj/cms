import Button from "../common/Button";

type ContentListItem = {
  category: string;
  imageSrc: string;
  title: string;
};

type ContentListSectionProps = {
  className?: string;
  description: string;
  items: ContentListItem[];
  links: string[];
  title: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ContentListCard({ category, imageSrc, title }: ContentListItem) {
  return (
    <article className="group flex w-full cursor-pointer items-start gap-5">
      <div className="h-[120px] w-[213px] shrink-0 overflow-hidden rounded-box bg-bg-content">
        <img alt={title} className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src={imageSrc} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[10px] font-pretendard">
        <p className="m-0 type-body-md text-mute-fg">{category}</p>
        <p className="m-0 type-body-lg leading-6 text-fg transition-colors group-hover:text-mute-fg">{title}</p>
      </div>
    </article>
  );
}

export default function ContentListSection({
  className,
  description,
  items,
  links,
  title,
}: ContentListSectionProps) {
  return (
    <section className={cx("flex w-full justify-center bg-bg-deep py-[100px]", className)}>
      <div className="flex w-full max-w-[1200px] items-start gap-[60px]">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <h2 className="m-0 font-pretendard type-h2 text-fg">{title}</h2>
          <p className="m-0 font-pretendard type-body-lg text-mute-fg">{description}</p>
          <div className="flex flex-col items-start gap-3">
            {links.map((link) => (
              <Button key={link} variant="text">
                {link}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex w-[790px] shrink-0 flex-col justify-center gap-[30px]">
          {items.map((item) => (
            <ContentListCard key={`${item.category}-${item.title}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
