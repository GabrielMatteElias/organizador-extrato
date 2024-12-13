import { Box } from "@mui/material";
import { MenuLateral } from "./components/menuLateral";
import "./globals.css";
import ThemeProviderWrapper from "./themeProvider";

export const metadata = {
  title: "SmartPlan",
  description: "Controle seus gastos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <Box sx={{ display: 'flex' }}>
            <MenuLateral />
            <Box sx={{ width: '100%', maxWidth: '120rem', margin: '0 auto', padding: '2.4rem 2.4rem 2.4rem 8.4rem' }}>
              {children}
            </Box>
          </Box>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}