type McpSectionProps = {
  className?: string;
  description: string[];
  items: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
  title: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function McpSection({
  className,
  description,
  items,
  title,
}: McpSectionProps) {
  return (
    <section className={cx("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-[1200px] flex-col gap-8">
        <div className="flex items-start justify-between gap-10">
          <h2 className="m-0 font-pretendard type-h2 leading-7 tracking-[-0.3px] text-fg">
            {title}
          </h2>
          <div className="w-[360px] font-pretendard type-body-lg leading-6 text-mute-fg">
            {description.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-[10px]">
          {items.map((item) => (
            <div key={item.label} className="flex items-center rounded-box bg-bg-content p-[30px]">
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
