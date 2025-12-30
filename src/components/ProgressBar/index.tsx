import {
  memo,
  useState,
  MouseEvent,
  FC,
  useEffect,
  CSSProperties,
} from "react";
import { Info } from "lucide-react";
import "./style.scss";

interface ProgressBarProps {
  /**
   * progress bar için minimum değer
   * @default 0
   */
  minValue?: number;
  /**
   * progress bar için maksimum değer
   * @default 150
   */
  /**
   * Progress bar rengini ayarlamak için
   * @default "#2E1098"
   */
  fillColor?: string;
  maxValue?: number;
  label?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  minValue = 0,
  maxValue = 150,
  label = "Label",
  fillColor = "#2E1098",
}) => {
  const [value, setValue] = useState(minValue);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = (clientX: number, rect: DOMRect): number => {
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const scaledValue = (percentage / 100) * maxValue;
    return Math.max(0, Math.min(maxValue, scaledValue));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const newValue = calculateValue(e.clientX, rect);
    setValue(Number(newValue.toFixed(0)));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newValue = calculateValue(e.clientX, rect);
    setValue(Number(newValue.toFixed(0)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setValue(minValue);
  }, [minValue]);

  const progressPercentage = (value / maxValue) * 100;

  return (
    <section className="progress-bar-container">
      <div className="progress-bar-info">
        <div className="progress-bar-label">
          <span className="text">{label}</span>
          <Info width={16} height={16} color="#757575" />
        </div>
        <span className="percentage">{value}</span>
      </div>
      <div
        className="progress-bar-fill-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <span
          className="percentage"
          style={
            {
              width: `${progressPercentage}%`,
              backgroundColor: fillColor,
              "--fill-color": fillColor,
            } as CSSProperties
          }
        />
      </div>
    </section>
  );
};

export default memo(ProgressBar);
