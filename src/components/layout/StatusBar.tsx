import { useShellMode } from "@/components/shell/ShellContext";

// Fake iOS status bar for the desktop mockup; on a real phone it only reserves the notch area.
export default function StatusBar({ light: _light }: { light?: boolean }) {
  const mode = useShellMode();
  if (mode === "device") {
    return <div className="shine-style-0009" />;
  }
  return (
    <div
      className="shine-style-0010"
    >
      <span className="status-bar__time">
        9:41
      </span>
      {/* Dynamic island */}
      <div
        className="shine-style-0011"
      />
      <div className="shine-style-0012 status-bar__icons">
        <div className="shine-style-0013">
          {["sm", "md", "lg", "xl"].map((size) => (
            <div key={size} className={`status-bar__signal status-bar__signal--${size}`} />
          ))}
        </div>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M1 3.5C3.3 1.3 6 0 8 0s4.7 1.3 7 3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M3 6.5C4.5 5 6.2 4.2 8 4.2s3.5.8 5 2.3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="8" cy="9.5" r="1.2" fill="currentColor" />
        </svg>
        <div className="status-bar__battery">
          <div className="status-bar__battery-level" />
        </div>
      </div>
    </div>
  );
}
