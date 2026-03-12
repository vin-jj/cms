type ReviewItem = {
  body: string;
  company: string;
  imageSrc: string;
  role: string;
};

type ReviewSectionProps = {
  className?: string;
  items: ReviewItem[];
  title: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ReviewCard({ body, company, imageSrc, role }: ReviewItem) {
  return (
    <article className="flex h-[210px] min-w-0 flex-1 flex-col justify-between rounded-box bg-bg-content px-6 py-[30px]">
      <p className="m-0 font-pretendard type-body-lg text-fg">{body}</p>
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-lg">
          <img alt={company} className="block h-10 w-10 object-cover" src={imageSrc} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col font-pretendard type-body-md leading-5">
          <p className="m-0 text-fg">{company}</p>
          <p className="m-0 text-mute-fg">{role}</p>
        </div>
      </div>
    </article>
  );
}

export default function ReviewSection({
  className,
  items,
  title,
}: ReviewSectionProps) {
  return (
    <section className={cx("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-[1200px] flex-col gap-[30px]">
        <h2 className="m-0 font-pretendard type-h2 text-fg">{title}</h2>
        <div className="flex items-center gap-[30px]">
          {items.map((item, index) => (
            <ReviewCard key={`${item.company}-${item.role}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
