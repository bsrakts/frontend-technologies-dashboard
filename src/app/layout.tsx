import "../app/globals.css";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { Providers } from "../store/providers";
import Box from "@mui/material/Box";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Navbar />
          <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
