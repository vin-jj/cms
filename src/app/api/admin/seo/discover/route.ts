import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { createSeoDefinitionTemplate, type SeoPageDefinition } from "@/features/seo/data";

async function walkPages(dir: string, routeSegments: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...(await walkPages(path.join(dir, entry.name), [...routeSegments, entry.name])));
      continue;
    }

    if (entry.name !== "page.tsx") continue;

    const cleanSegments = routeSegments.filter((segment) => !segment.startsWith("("));
    const routePath = cleanSegments.join("/");
    routes.push(routePath);
  }

  return routes;
}

export async function POST(request: Request) {
  const localeAppDir = path.join(process.cwd(), "src/app/[locale]");
  const routes = await walkPages(localeAppDir);
  const body = (await request.json().catch(() => ({}))) as {
    definitions?: SeoPageDefinition[];
  };
  const definitions = Array.isArray(body.definitions) ? body.definitions : [];

  const candidates = routes
    .map((routePath) => {
      if (!routePath) {
        return createSeoDefinitionTemplate("", "exact");
      }

      if (routePath.endsWith("[slug]")) {
        return createSeoDefinitionTemplate(routePath.replace("/[slug]", ""), "detail");
      }

      if (routePath.includes("[")) {
        return null;
      }

      return createSeoDefinitionTemplate(routePath, "exact");
    })
    .filter((item): item is NonNullable<typeof item> => !!item)
    .filter(
      (item) =>
        !definitions.some(
          (definition) =>
            definition.routePattern === item.routePattern && definition.matchMode === item.matchMode,
        ),
    );

  return NextResponse.json({ candidates });
}
