type FooterSection = {
  items: string[];
  title: string;
};

type FooterProps = {
  addressLines?: string[];
  className?: string;
  legalLinks?: string[];
  sections?: FooterSection[];
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const socialLinks = [
  {
    className: "h-6 w-6",
    href: "/",
    label: "LinkedIn",
    src: "/icons/linkedin.svg",
  },
  {
    className: "h-6 w-6",
    href: "/",
    label: "YouTube",
    src: "/icons/youtube.svg",
  },
  {
    className: "h-6 w-6",
    href: "/",
    label: "X",
    src: "/icons/x.svg",
  },
] as const;

export default function Footer({
  addressLines = [
    "© 2017-2024 QueryPie, Inc. All rights reserved.",
    "Headquarter : 3003 North 1st Street, Suite 221, San Jose, CA 95134",
    "Seoul Magok Office : 7F, 26, Magokjungang 1-ro, Gangseo-gu, Seoul, Republic of Korea",
    "Seoul Gangnam Office : 3F, 464, Gangnam-daero, Gangnam-gu, Seoul, Republic of Korea",
    "Japan Office : 15F, 1 Chome-17-1 Toranomon, Minato City, Tokyo 105-6490",
  ],
  className,
  legalLinks = ["Cookie Preference", "Terms of Use", "Privacy Policy", "EULA"],
  sections = [
    { title: "Solutions", items: ["AI Platform (AIP)", "Access Control Platform (ACP)"] },
    { title: "Features", items: ["Demo", "Documentation"] },
    { title: "Company", items: ["About Us", "Certifications", "News", "Contact Us"] },
  ],
}: FooterProps) {
  const [copyright, ...officeLines] = addressLines;

  return (
    <footer className={cx("relative flex w-full justify-center overflow-hidden bg-bg pt-10", className)}>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[800px] w-full opacity-50">
        <div className="h-full w-full bg-[radial-gradient(120%_80%_at_50%_100%,#FF7759_0%,rgba(255,119,89,0.60)_30%,rgba(255,119,89,0.00)_60%)]" />
      </div>

      <div className="relative flex w-full max-w-[1200px] flex-col gap-[60px] border-t border-border py-[60px]">
        <div className="flex items-start justify-between gap-8">
          <a aria-label="QueryPie AI" className="inline-flex h-5 w-[116px] shrink-0 items-center" href="/">
            <img
              alt="QueryPie AI"
              className="block h-5 w-[116px]"
              src="/icons/querypie-ai-logo.svg"
            />
          </a>

          <div className="flex items-start gap-[60px] px-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className={cx(
                  "flex flex-col gap-5 font-pretendard type-body-md leading-5",
                  section.title === "Solutions" && "w-[191px]",
                  section.title === "Features" && "w-[96px]",
                  section.title === "Company" && "w-[84px]",
                )}
              >
                <p className="m-0 text-mute-fg">{section.title}</p>
                <div className="flex flex-col gap-2 text-fg">
                  {section.items.map((item) => (
                    <a key={item} className="transition-colors hover:text-mute-fg" href="/">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-[14px]">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    aria-label={link.label}
                    className="inline-flex h-6 w-6 items-center justify-center opacity-100 transition-opacity hover:opacity-50"
                    href={link.href}
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className={link.className}
                      src={link.src}
                    />
                  </a>
                ))}
              </div>

            <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-[10px] whitespace-nowrap font-pretendard type-body-md leading-5 text-fg">
              {legalLinks.map((item) => (
                <a key={item} className="transition-colors hover:text-mute-fg" href="/">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px] leading-5">
            <p className="m-0 font-pretendard type-body-md text-fg">{copyright}</p>
            <div className="font-pretendard type-body-sm text-fg">
              {officeLines.map((line) => (
                <p key={line} className="m-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
