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
import { FillColors, FillColor } from "../../contants";

interface RangeProps {
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
   * @default "default"
   */
  fillColor?: FillColor;
  maxValue?: number;
  label?: string;
  onChange?: (value: number) => void;
}

const Range: FC<RangeProps> = ({
  minValue = 0,
  maxValue = 150,
  label = "Label",
  fillColor = "default",
  onChange,
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
    if (isDragging) {
      setIsDragging(false);
      onChange?.(value);
    }
  };

  useEffect(() => {
    setValue(minValue);
  }, [minValue]);

  const rangePercentage = (value / maxValue) * 100;

  return (
    <section className="range-container">
      <div className="range-info">
        <div className="range-label">
          <span className="text">{label}</span>
          <Info width={16} height={16} color="#757575" />
        </div>
        <span className="percentage">{value}</span>
      </div>
      <div
        className="range-fill-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <span
          className="percentage"
          style={
            {
              width: `${rangePercentage}%`,
              backgroundColor: FillColors[fillColor],
              "--fill-color": FillColors[fillColor],
            } as CSSProperties
          }
        />
      </div>
    </section>
  );
};

export default memo(Range);
