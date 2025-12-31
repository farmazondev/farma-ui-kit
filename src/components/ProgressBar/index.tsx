import { FC, memo, CSSProperties } from "react";
import { FillColors, FillColor } from "../../contants";
import "./style.scss";
import { hexToRgb } from "../../utils";

interface ProgressBarProps {
  /**
   * Varsayılan olarak 0 değeri alır
   * @default 0
   */
  value: number;
  /**
   * Progress bar rengini ayarlamak için
   * @default "default"
   */
  fillColor?: FillColor;
}

const ProgressBar: FC<ProgressBarProps> = ({
  value = 0,
  fillColor = "default",
}) => {
  const hexColor = FillColors[fillColor];

  return (
    <div
      className="progress-bar"
      style={{
        backgroundColor: `rgba(${hexToRgb(hexColor)}, 0.2)`,
      }}
    >
      <span
        className="progress-bar-fill"
        style={
          {
            "--target-width": `${value}%`,
            backgroundColor: hexColor,
          } as CSSProperties
        }
      />
    </div>
  );
};

export default memo(ProgressBar);
