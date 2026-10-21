"use client";

import { Toaster } from "react-hot-toast";

export default function Providers() {
return (
<Toaster
position="top-center"
toastOptions={{
duration: 3000,
style: {
borderRadius: "12px",
background: "#166534",
color: "#ffffff",
padding: "14px 18px",
},
success: {
iconTheme: {
primary: "#ffffff",
secondary: "#166534",
},
},
}}
/>
);
}
