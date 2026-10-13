import type { ReactNode } from "react";

// Muted centered message for empty / error states inside a screen.
export default function Notice({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        lineHeight: 1.6,
        color: "#8A8680",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      {children}
    </div>
  );
}
