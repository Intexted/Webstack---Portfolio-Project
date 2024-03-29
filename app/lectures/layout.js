import Logout from "@/components/Logout";
import { cookies } from "next/headers";

export default function LecturesLayout({ children }) {
  const isDark = cookies()?.has("dark-mode");

  return (
    <html lang="en">
      <body className={`${isDark ? "dark-mode" : ""}`}>
        <section style={{ display: "flex" }}>
          <nav className="sidebar">
            <div className="sidebar-main"></div>
          </nav>
          <div className="container" id="main_one">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
