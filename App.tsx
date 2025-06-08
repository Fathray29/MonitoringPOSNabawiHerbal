import React, { useState } from 'react';
import { reportData, getAllMonthYears } from './services/dataService.tsx';
import MonthlyReportTable from './components/MonthlyReportTable.tsx';
import DashboardOverviewCharts from './components/DashboardOverviewCharts.tsx';
import OverallStats from './components/OverallStats.tsx';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const App: React.FC = () => {
  const allMonths = getAllMonthYears();
  const [selectedReportMonth, setSelectedReportMonth] = useState<string>(allMonths.length > 0 ? allMonths[allMonths.length - 1] : '');
  const [isReportVisible, setIsReportVisible] = useState<boolean>(true);

  const currentReport = reportData.find(r => r.monthYear === selectedReportMonth);

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800 p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800">NABAWI HERBAL INDONESIA</h1>
        <p className="text-xl text-emerald-500 mt-2">Daily Monitoring per POS Jan - Mei 2025</p>
      </header>

      <main>
        <OverallStats />
        <DashboardOverviewCharts />
        
        <div className="mt-16 p-4 sm:p-6 bg-white shadow-xl rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-emerald-700">
              Detail Laporan Penjualan
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {allMonths.length > 0 && (
                 <div className="relative w-full sm:w-auto">
                  <label htmlFor="reportMonthSelect" className="sr-only">Pilih Bulan Laporan:</label>
                  <select
                    id="reportMonthSelect"
                    value={selectedReportMonth}
                    onChange={(e) => setSelectedReportMonth(e.target.value)}
                    className="appearance-none block w-full pl-3 pr-10 py-2.5 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md shadow-sm"
                    aria-label="Pilih Bulan untuk Detail Laporan"
                  >
                    {allMonths.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              )}
              <button
                onClick={() => setIsReportVisible(!isReportVisible)}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition duration-150 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                aria-pressed={isReportVisible}
              >
                {isReportVisible ? 'Sembunyikan' : 'Tampilkan'} Detail
              </button>
            </div>
          </div>

          {isReportVisible && currentReport && (
            <div className="mt-4">
              <MonthlyReportTable key={currentReport.monthYear} report={currentReport} />
            </div>
          )}
          {!isReportVisible && (
            <div className="text-center py-8">
              <button
                onClick={() => setIsReportVisible(true)}
                className="px-5 py-2.5 bg-emerald-100 text-emerald-700 font-semibold text-sm rounded-md hover:bg-emerald-200 border border-emerald-300 transition duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                aria-label={`Tampilkan detail laporan untuk ${selectedReportMonth}`}
              >
                Lihat Detail Laporan untuk {selectedReportMonth}
              </button>
            </div>
          )}
           {isReportVisible && !currentReport && (
            <p className="text-center text-gray-500 py-4">Tidak ada data laporan untuk ditampilkan pada bulan {selectedReportMonth}.</p>
          )}
        </div>
      </main>

      <footer className="mt-16 mb-8 pt-8 border-t border-emerald-200 text-center text-sm text-emerald-600">
        <p>&copy; {new Date().getFullYear()} Nabawi Herbal Indonesia. All data is illustrative.</p>
      </footer>
    </div>
  );
};

export default App;