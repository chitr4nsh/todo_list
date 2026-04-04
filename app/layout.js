
// import "./globals.css";

// export const metadata = {
//   title: "TODO App",
//   description: "TODO Auth App",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-100">{children}</body>
//     </html>
//   );
// }


//"use client";
// ---------------------------
// import "./globals.css";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "@/app/context/AuthContext";
// import { Toaster } from "react-hot-toast";

// const queryClient = new QueryClient();

// export const metadata = {
//   title: "TODO App",
//   description: "TODO Auth App",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-100">
//         <QueryClientProvider client={queryClient}>
//           <AuthProvider>
//             <Toaster position="top-right" />
//             {children}
//           </AuthProvider> 
//         </QueryClientProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "TODO App",
  description: "TODO Auth App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}