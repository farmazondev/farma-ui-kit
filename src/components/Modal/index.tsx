import {
  memo,
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import "./style.scss";
import Button from "../Button";

type Position = "center" | "right";
type Variant = "default" | "purple" | "orange" | "red" | "light-purple";
type ModalType = "success" | "warning" | "error" | "info";

export type Button = {
  text: string;
  onClick: () => void;
  variant?: Variant;
};

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  /**
   * @default "center"
   */
  position?: Position;
  /**
   * @example
   * const buttons = useMemo(() => {
   *   return [
   *     { text: "Cancel", onClick: () => {}, variant: "light-purple" },
   *     { text: "Confirm", onClick: () => {}, variant: "orange" }
   *   ];
   * }, []);
   */
  buttons?: Button[];
  /**
   * @default 410
   */
  width?: number;
  /**
   * @default null
   * @example
   * type="info" | type="success"
   */
  type?: ModalType;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  isOpen = false,
  buttons,
  onClose,
  position = "center",
  width = 410,
  type = null,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: Event) => {
    const target = e.target as Node;
    if (modalRef.current && !modalRef.current.contains(target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div
        className={`container ${position} ${type ? "type" : ""}`}
        style={{ width: width }}
        ref={modalRef}
      >
        <section className="header">
          {type && getModalTypeIcon(type)}
          <h4 className="title">{title}</h4>
          {!type && <X className="icon" onClick={onClose} />}
        </section>
        <section className="content">{children}</section>
        {buttons && buttons.length > 0 && (
          <section className="footer">
            {buttons.map((item, index) => (
              <Button
                key={index}
                title={item.text}
                variant={item.variant}
                onClick={item.onClick}
              />
            ))}
          </section>
        )}
      </div>
    </div>,
    document.body
  );
};

function getModalTypeIcon(type: ModalType) {
  switch (type) {
    case "success":
      return <CircleCheck width={22} height={22} color="#159F52" />;
    case "warning":
      return <CircleAlert width={22} height={22} color="#FFA900" />;
    case "error":
      return <CircleAlert width={22} height={22} color="#EA6A6A" />;
    case "info":
      return <Info width={22} height={22} color="#0065FF" />;
    default:
      return null;
  }
}

export default memo(Modal);
