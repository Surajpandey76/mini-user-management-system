import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        background: "#fff",
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
