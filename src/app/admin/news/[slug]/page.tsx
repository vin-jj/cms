import AdminManagedContentDetailPage from "../../../../components/pages/admin/AdminManagedContentDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AdminNewsDetailRoute({ params }: Props) {
  const { slug } = await params;

  return <AdminManagedContentDetailPage categorySlug="news" itemId={slug} section="news" />;
}
