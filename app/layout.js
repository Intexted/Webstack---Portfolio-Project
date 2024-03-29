import "./globals.css";
// import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "../lib/edgestore";
import AuthProvider from "./auth/AuthProvider";
import db from "@/utils/db";

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export const metadata = {
  title: "Webstack - Portfolio Project",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster position="top-right" />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}