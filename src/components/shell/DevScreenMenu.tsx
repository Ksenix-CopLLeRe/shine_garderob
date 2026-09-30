import { useState } from "react";
import ScreenNavigator from "@/components/shell/ScreenNavigator";

// Dev-only on a real phone: a slim tab on the right edge opens the screen list.
export default function DevScreenMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Все экраны"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 14,
          height: 56,
          background: "rgba(107,31,43,0.55)",
          border: "none",
          borderRadius: "4px 0 0 4px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 1001,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%" }}>
            <ScreenNavigator width="100%" defaultOpen maxHeight="70dvh" onPick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
