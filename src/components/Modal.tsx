import ReactDom from "react-dom";
import { ModalProps } from "../types";

const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {/* Modal overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={() => onClose(false)}
      />

      {/* Centered modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-2xl p-6 bg-gray-900  rounded-xl shadow-2xl transform transition-transform duration-300 ease-in-out scale-100">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 border-b border-neutral-500 pb-2">
            <h6 className="text-lg font-semibold text-white-800">{title}</h6>
            {/* Close button */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={() => onClose(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    </>,
    document?.getElementById("dialog") as HTMLElement
  );
};

export { Modal };
