import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Rocket Tales",
  description: "Rocket Tales webpage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div suppressHydrationWarning>
          <Providers>
            <header>
              <Navbar />
            </header>
            <main className="p-4">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
