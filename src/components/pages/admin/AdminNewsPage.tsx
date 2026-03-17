import AdminManagedContentListPage from "./AdminManagedContentListPage";

export default function AdminNewsPage() {
  return (
    <AdminManagedContentListPage
      categorySlug="news"
      description="뉴스 보도자료와 외부 링크, 게시 상태를 관리합니다."
      section="news"
      title="News"
    />
  );
}
