export const FillColors = {
  default: "#2E1098",
  purple: "#2E1098",
  orange: "#FFA900",
  red: "#EA6A6A",
  "light-purple": "#8B7DD8",
} as const;

export type FillColor = keyof typeof FillColors;
