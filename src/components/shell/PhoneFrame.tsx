import type { ReactNode } from "react";

// Desktop-only iPhone mockup around the app.
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="shine-style-0017"
    >
      {/* Side buttons */}
      <div className="phone-frame__side-button phone-frame__side-button--right" />
      <div className="phone-frame__side-button phone-frame__side-button--left-top" />
      <div className="phone-frame__side-button phone-frame__side-button--left-middle" />
      <div className="phone-frame__side-button phone-frame__side-button--left-bottom" />

      {/* Screen clipping */}
      <div
        className="shine-style-0018"
      >
        {children}
      </div>
    </div>
  );
}
