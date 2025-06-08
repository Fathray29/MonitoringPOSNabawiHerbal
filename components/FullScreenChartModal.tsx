
import React, { useEffect } from 'react';

interface FullScreenChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FullScreenChartModal: React.FC<FullScreenChartModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-emerald-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors"
            aria-label="Tutup Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="flex-grow p-4 md:p-6 overflow-y-auto">
          {/* ResponsiveContainer for the chart is expected to be part of the children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenChartModal;
