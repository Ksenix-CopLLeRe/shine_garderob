import type { ReactNode } from "react";

// Muted centered message for empty / error states inside a screen.
export default function Notice({ children }: { children: ReactNode }) {
  return (
    <div
      className="shine-style-0028"
    >
      {children}
    </div>
  );
}
