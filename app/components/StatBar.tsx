import { STAT_LABELS } from "./constants";

export const StatBar = ({ name, value }: { name: string; value: number }) => {
  const pct = Math.round((value / 255) * 100);
  const color = value >= 100 ? "#66bb6a" : value >= 60 ? "#ffd600" : "#ef5350";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ width: 32, fontSize: "0.65rem", color: "#888", fontFamily: "'Space Mono', monospace", textAlign: "right" }}>
        {STAT_LABELS[name] ?? name}
      </span>
      <div style={{ flex: 1, height: 6, background: "#1e2533", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 4,
            transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </div>
      <span style={{ width: 28, fontSize: "0.68rem", color: "#aaa", fontFamily: "'Space Mono', monospace" }}>
        {value}
      </span>
    </div>
  );
};