import { Poppins } from "next/font/google"; // Replace Inter with Poppins
import "./globals.css";
import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/Providers";

// Initialize the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Enlighten",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} relative`} // Added 'relative' for positioning
        // style={{
        //   backgroundImage: `url('/bannerbg.png')`,
        // }}
      >
        <Providers>
          <Navbar />
          <div className="min-h-screen mx-auto">{children}</div>
          <Footer />
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
