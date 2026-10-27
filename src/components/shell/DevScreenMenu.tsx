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
        className="shine-style-0014"
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="shine-style-0015"
        >
          <div onClick={(e) => e.stopPropagation()} className="shine-style-0016">
            <ScreenNavigator width="100%" defaultOpen maxHeight="70dvh" onPick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
