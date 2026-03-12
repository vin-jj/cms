type ClientSectionProps = {
  caption?: string;
  className?: string;
};

const clientLogos = [
  { alt: "Client logo 01", className: "h-10", src: "/images/home/clients/01.svg" },
  { alt: "Client logo 02", className: "h-10", src: "/images/home/clients/02.svg" },
  { alt: "Client logo 03", className: "h-10", src: "/images/home/clients/03.svg" },
  { alt: "Client logo 04", className: "h-10", src: "/images/home/clients/04.svg" },
  { alt: "Client logo 05", className: "h-10", src: "/images/home/clients/05.svg" },
  { alt: "Client logo 06", className: "h-10", src: "/images/home/clients/06.svg" },
  { alt: "Client logo 07", className: "h-10", src: "/images/home/clients/07.svg" },
  { alt: "Client logo 08", className: "h-10", src: "/images/home/clients/08.svg" },
] as const;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function ClientSection({
  caption = "Trusted every day by teams that build world-class software",
  className,
}: ClientSectionProps) {
  return (
    <section className={cx("flex w-full flex-col items-center", className)}>
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-5">
        <p className="m-0 w-full text-center font-pretendard type-body-lg text-mute-fg">
          {caption}
        </p>
        <div className="relative h-10 w-full overflow-hidden">
          <div className="flex w-max items-center" style={{ animation: "marquee 20s linear infinite" }}>
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <img
                key={`${logo.alt}-${index}`}
                alt={logo.alt}
                className={`${logo.className} mr-[60px]`}
                src={logo.src}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-gradient-to-r from-[rgba(8,9,10,0)] to-bg" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-bg to-[rgba(8,9,10,0)]" />
        </div>
      </div>
    </section>
  );
}
