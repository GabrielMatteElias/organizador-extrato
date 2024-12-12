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
            <Box sx={{ width: '100%', maxWidth: '120rem', margin: '0 auto', p: 2, maxHeight: '100vh' }}>
              {children}
            </Box>
          </Box>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}