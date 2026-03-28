import { TYPE_COLORS } from "./constants";

export const TypeBadge = ({ type }: { type: string }) => {
  const colors = TYPE_COLORS[type] ?? { bg: "#888", text: "#fff", glow: "none" };
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        boxShadow: colors.glow,
        display: "inline-block",
        padding: "2px 12px",
        borderRadius: "999px",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "0 4px 4px",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {type}
    </span>
  );
};