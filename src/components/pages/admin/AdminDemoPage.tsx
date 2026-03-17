import type { DemoCategorySlug } from "@/features/content/config";
import AdminManagedContentListPage from "./AdminManagedContentListPage";

type AdminDemoPageProps = {
  categorySlug?: DemoCategorySlug;
  description?: string;
  title?: string;
};

export default function AdminDemoPage({
  categorySlug = "all",
  description = "Create, organize, and publish demo pages for product walkthroughs.",
  title = "Demo",
}: AdminDemoPageProps) {
  return (
    /* Demo 섹션은 공통 관리 리스트 페이지를 카테고리별로 재사용한다 */
    <AdminManagedContentListPage
      categorySlug={categorySlug}
      description={description}
      section="demo"
      title={title}
    />
  );
}
