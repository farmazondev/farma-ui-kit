import { memo, FC, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./style.scss";

type Position = "center" | "right";

export type Button = {
  text: string;
  onClick: () => void;
  variant?: string;
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
   *     { text: "Cancel", onClick: () => {} },
   *     { text: "Confirm", onClick: () => {} }
   *   ];
   * }, []);
   */
  buttons?: Button[];
  /**
   * @default 500
   */
  width?: number;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  isOpen = false,
  buttons,
  onClose,
  position = "center",
  width = 500,
}) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className={`container ${position}`} style={{ width: width }}>
        <section className="header">
          <h4 className="title">{title}</h4>
          <X className="icon" onClick={onClose} />
        </section>
        <section className="content">{children}</section>
        {buttons && buttons.length > 0 && (
          <section className="footer">
            {buttons.map((item, index) => (
              <button key={index} onClick={item.onClick}>
                {item.text}
              </button>
            ))}
          </section>
        )}
      </div>
    </div>,
    document.body
  );
};

export default memo(Modal);
