import Sidebar from "./Sidebar";

export default function LecturesLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <section style={{ display: "flex" }}>
          <Sidebar />
          <div className="container" id="main_one">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
