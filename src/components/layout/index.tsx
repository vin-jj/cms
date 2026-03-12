import Footer from "./Footer";
import Gnb from "./Gnb";

export default function LayoutComponentsGuide() {
  return (
    <section className="space-y-6">
      <h2>Layout Components</h2>
      <p>
        Place shared structural components here, such as headers, footers, and navigation.
      </p>
      <div className="overflow-hidden rounded-box border border-border bg-bg">
        <Gnb />
      </div>
      <div className="overflow-hidden rounded-box border border-border bg-bg">
        <Footer />
      </div>
    </section>
  );
}
