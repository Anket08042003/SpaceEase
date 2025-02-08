"use client"
import { Inter } from "next/font/google";
import "./globals.css";
// import { useRouter } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ['latin'] });

const MENUITEMS = [
  { label: 'Register', href: '/register', style: 'button-register' },
  { label: 'Log in', href: '/login', style: 'button-login' },
];

const onClick=()=>{
  console.log("working")
}

export default function RootLayout({ children }) {
  // const router = useRouter();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-white`}>
        {/* Navigation/Header */}
        <header className="flex justify-between items-center p-4 border-b bg-white">
          <div className="flex items-center">
            {/* Logo */}
            <div className="text-black font-semibold text-2xl">
              SpaceEase
            </div>
            <div className="text-gray-400 text-sm ml-2">
              User
            </div>
          </div>
          {/* Menu Items */}
          <nav className="flex items-center gap-4">
              <button
                onClick={()=>onClick}
                className="px-4 py-2 font-semibold rounded 
                  bg-white border-4 border-yellow-300 text-black">
                SignIn
              </button>
         
          </nav>
        </header>

        {/* Main Content */}
        <main><ClerkProvider>{children}</ClerkProvider></main>
      </body>
    </html>
  );
}
