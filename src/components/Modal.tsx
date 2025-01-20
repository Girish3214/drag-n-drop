import ReactDom from "react-dom";
import { ModalProps } from "../types";

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {/* Modal overlay */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-40 transition-all ease-in-out"
        onClick={() => {
          console.log("clicked");
          onClose(false);
        }}
      />

      {/* Centered modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          {/* Close button */}
          <div
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-black cursor-pointer"
            onClick={() => onClose(false)}
          >
            x
          </div>
          {children}
        </div>
      </div>
    </>,
    document?.getElementById("dialog") as HTMLElement
  );
};

export { Modal };
