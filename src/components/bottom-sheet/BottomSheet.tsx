import React, { PropsWithChildren } from 'react';

interface BottomSheetProps {
  title?: string;
  open: boolean;
  onClose?: () => void;
}

const BottomSheet = ({ title, open, onClose, children }: PropsWithChildren<BottomSheetProps>) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-6xl min-h-30 bg-white rounded-t-2xl shadow-lg animate-slideUp z-10"
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex px-4 py-3 items-center border-b border-gray-200 relative`}>
          <div className="min-h-6">
            {title && <span className='font-semibold'>{title}</span>}
          </div>
          <button
            className="text-2xl focus:outline-none absolute top-2 right-4 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
