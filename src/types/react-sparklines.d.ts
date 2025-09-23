declare module "react-sparklines" {
  import * as React from "react";

  export interface SparklinesProps {
    data: number[];
    limit?: number;
    width?: number;
    height?: number;
    margin?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode; 
  }

  export const Sparklines: React.FC<SparklinesProps>;

  export interface SparklinesLineProps {
    color?: string;
    style?: React.CSSProperties;
  }

  export const SparklinesLine: React.FC<SparklinesLineProps>;
}
