export const TYPE_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  fire:     { bg: "#ff6b35", text: "#fff",    glow: "0 0 12px #ff6b3599" },
  water:    { bg: "#4fc3f7", text: "#0a1628", glow: "0 0 12px #4fc3f799" },
  grass:    { bg: "#66bb6a", text: "#0a1a0a", glow: "0 0 12px #66bb6a99" },
  electric: { bg: "#ffd600", text: "#1a1400", glow: "0 0 12px #ffd60099" },
  psychic:  { bg: "#ec407a", text: "#fff",    glow: "0 0 12px #ec407a99" },
  ice:      { bg: "#80deea", text: "#0a1a1a", glow: "0 0 12px #80deea99" },
  dragon:   { bg: "#7e57c2", text: "#fff",    glow: "0 0 12px #7e57c299" },
  dark:     { bg: "#546e7a", text: "#fff",    glow: "0 0 12px #546e7a99" },
  fairy:    { bg: "#f48fb1", text: "#2a0a14", glow: "0 0 12px #f48fb199" },
  fighting: { bg: "#ef5350", text: "#fff",    glow: "0 0 12px #ef535099" },
  poison:   { bg: "#ab47bc", text: "#fff",    glow: "0 0 12px #ab47bc99" },
  ground:   { bg: "#d4a05a", text: "#1a0f00", glow: "0 0 12px #d4a05a99" },
  rock:     { bg: "#a1887f", text: "#fff",    glow: "0 0 12px #a1887f99" },
  bug:      { bg: "#9ccc65", text: "#0a1400", glow: "0 0 12px #9ccc6599" },
  ghost:    { bg: "#5c6bc0", text: "#fff",    glow: "0 0 12px #5c6bc099" },
  steel:    { bg: "#90a4ae", text: "#0a0f14", glow: "0 0 12px #90a4ae99" },
  flying:   { bg: "#7986cb", text: "#fff",    glow: "0 0 12px #7986cb99" },
  normal:   { bg: "#bdbdbd", text: "#1a1a1a", glow: "0 0 12px #bdbdbd99" },
};

export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

export const GENERATIONS = [
  "Gen I", "Gen II", "Gen III", "Gen IV", "Gen V",
  "Gen VI", "Gen VII", "Gen VIII", "Gen IX",
];