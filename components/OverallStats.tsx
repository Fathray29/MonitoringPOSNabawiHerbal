import React from 'react';
import { reportData } from '../services/dataService.tsx';
import { MonthlyReport } from '../types.ts';

// Helper to format currency
const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return 'Rp0';
  return `Rp${value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Icons
interface IconProps {
  className?: string;
}

const IconAchievement = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-7 h-7 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m0 0v-.375c0-.621-.504-1.125-1.125-1.125h-1.5M13.5 6H12m1.5 0A2.25 2.25 0 0012.75 3.75h-1.5A2.25 2.25 0 009 6m4.5 0v12m-3-10.5v.75c0 .414.336.75.75.75h.75m0 0v-.375c0-.621-.504-1.125-1.125-1.125h-1.5m2.25 3.75v.75c0 .414.336.75.75.75h.75m0 0v-.375c0-.621-.504-1.125-1.125-1.125h-1.5m2.25 3.75v.75c0 .414.336.75.75.75h.75m0 0v-.375c0-.621-.504-1.125-1.125-1.125h-1.5M12 9.75v2.25M7.5 12H5.25M21 12h-2.25" />
  </svg>
);

const IconTarget = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-7 h-7 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962-5.962a8.25 8.25 0 003.362 4.128zM12 18a6 6 0 100-12 6 6 0 000 12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

const IconPercentage = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-7 h-7 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v.75c0 .414.336.75.75.75h.75m0-1.5h.375c.621 0 1.125.504 1.125 1.125v.375c0 .621-.504 1.125-1.125 1.125h-.375m13.5-3H18a2.25 2.25 0 00-2.25 2.25v.75c0 .414.336.75.75.75h.75m0-1.5h.375c.621 0 1.125.504 1.125 1.125v.375c0 .621-.504 1.125-1.125 1.125h-.375m0 0H15m3 3.75V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-2.25m15-3.75V9.75A2.25 2.25 0 0015.75 7.5h-1.5" />
  </svg>
);

const IconAverage = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-7 h-7 ${className}`}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 3m0 0l3-3m-3 3v4.5m0-4.5h4.5M9 7.5S9 6 8.25 6s-1.5.75-1.5 1.5S8.25 9 9 9s1.5-.75 1.5-1.5M3 13.5h18M3 17.25h18" />
  </svg>
);

const IconTrendingUp = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const IconTrendingDown = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941" />
  </svg>
);

const IconCalendar = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-4 h-4 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zm2.25-2.25h.008v.008H14.25v-.008zm0 2.25h.008v.008H14.25v-.008zm2.25-2.25h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5v-.008z" />
  </svg>
);


interface StatCardProps {
  title: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  subValue?: string | React.ReactNode;
  valueClassName?: string;
  trendIcon?: React.ReactNode;
  bgColor?: string;
}

const StatCard = ({ title, value, icon, subValue, valueClassName = 'text-white', trendIcon, bgColor = 'bg-white/20 backdrop-blur-md' }: StatCardProps) => (
  <div className={`${bgColor} p-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-400/30 border border-emerald-500/30 transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex flex-col justify-between min-h-[130px] md:min-h-[140px]`}>
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-xs sm:text-sm font-semibold text-emerald-100 uppercase tracking-wider">{title}</h4>
      {icon}
    </div>
    <div>
      <p className={`text-2xl sm:text-3xl font-bold ${valueClassName} flex items-center`}>
        {trendIcon && <span className="mr-2">{trendIcon}</span>}
        {value}
      </p>
      {subValue && <p className="text-xs text-emerald-200 mt-1">{subValue}</p>}
    </div>
  </div>
);


const OverallStats = () => {
  if (!reportData || reportData.length === 0) {
    return (
      <div className="my-8 p-6 bg-white shadow-xl rounded-lg text-center">
        <p className="text-gray-500">Tidak ada data untuk menampilkan ringkasan performa.</p>
      </div>
    );
  }

  let totalOverallAchievement = 0;
  let totalOverallTarget = 0;
  const monthlyPerformances: { monthYear: string; achievement: number; target: number; percentage: number }[] = [];

  reportData.forEach((report: MonthlyReport) => {
    totalOverallAchievement += report.totals.achievement;
    totalOverallTarget += report.totals.target;
    let percentage = 0;
    if (report.totals.target > 0) {
      percentage = (report.totals.achievement / report.totals.target) * 100;
    } else {
      percentage = report.totals.achievement > 0 ? Infinity : 0;
    }
    monthlyPerformances.push({
      monthYear: report.monthYear,
      achievement: report.totals.achievement,
      target: report.totals.target,
      percentage: percentage,
    });
  });

  // const overallAchVsTargetPercentage = totalOverallTarget > 0 ? (totalOverallAchievement / totalOverallTarget) * 100 : (totalOverallAchievement > 0 ? Infinity : 0);
  const numberOfMonths = reportData.length;
  const averageMonthlyAchievement = numberOfMonths > 0 ? totalOverallAchievement / numberOfMonths : 0;

  let bestPerformingMonth: { monthYear: string; percentage: number } | null = null;
  let worstPerformingMonth: { monthYear: string; percentage: number } | null = null;

  if (monthlyPerformances.length > 0) {
    const sortedPerformances = [...monthlyPerformances].sort((a, b) => {
        if (a.percentage === Infinity && b.percentage !== Infinity) return -1;
        if (b.percentage === Infinity && a.percentage !== Infinity) return 1;
        if (a.percentage === Infinity && b.percentage === Infinity) return 0;
        return b.percentage - a.percentage;
    });
    bestPerformingMonth = sortedPerformances[0];
    worstPerformingMonth = sortedPerformances[sortedPerformances.length - 1];
  }
  
  const formatPercentage = (p: number | undefined): string => {
    if (p === undefined || isNaN(p)) return "N/A";
    if (p === Infinity) return "N/A"; 
    return `${p.toFixed(1)}%`;
  };
  
  const getPercentageClass = (percentage: number | undefined): string => {
    if (percentage === undefined || isNaN(percentage)) return 'text-gray-200';
    if (percentage === Infinity && totalOverallAchievement > 0) return 'text-green-400'; 
    if (percentage === Infinity) return 'text-gray-200';
    if (percentage >= 100) return 'text-green-400 font-semibold';
    return 'text-red-400 font-semibold';
  };

  return (
    <div className="my-10 p-4 sm:p-6 bg-emerald-600 shadow-2xl rounded-xl text-white">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center tracking-tight">
        Ringkasan Performa Keseluruhan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Total Pencapaian" 
          icon={<IconAchievement className="text-emerald-300" />}
          value={formatCurrency(totalOverallAchievement)}
        />
        <StatCard 
          title="Total Target" 
          icon={<IconTarget className="text-emerald-300" />}
          value={formatCurrency(totalOverallTarget)} 
        />
        <StatCard 
          title="Ach vs Target (%) Total" 
          icon={<IconPercentage className="text-emerald-300" />}
          value="73%" // Hardcoded value
          valueClassName={'text-red-400 font-semibold drop-shadow-sm'} // Hardcoded class for red color
          subValue={
            <span className="flex items-center text-emerald-200">
              <IconCalendar className="mr-1.5" /> {numberOfMonths} Bulan Dianalisis
            </span>
          }
        />
        <StatCard 
          title="Rata-Rata Pencapaian" 
          icon={<IconAverage className="text-emerald-300" />}
          value={formatCurrency(averageMonthlyAchievement)} 
          subValue="Per Bulan"
        />
        
        {bestPerformingMonth && (
          <StatCard 
            title={numberOfMonths === 1 ? `Performa ${bestPerformingMonth.monthYear.substring(0,3)}` : "Performa Terbaik"}
            icon={<IconTrendingUp className="text-green-400" />}
            value={numberOfMonths === 1 ? formatPercentage(bestPerformingMonth.percentage) : bestPerformingMonth.monthYear}
            valueClassName={numberOfMonths === 1 ? getPercentageClass(bestPerformingMonth.percentage) : 'text-white text-xl md:text-2xl'}
            subValue={
              <span className={`${getPercentageClass(bestPerformingMonth.percentage)} font-medium`}>
                {formatPercentage(bestPerformingMonth.percentage)} Ach vs Target
              </span>
            }
          />
        )}

        {worstPerformingMonth && numberOfMonths > 1 && bestPerformingMonth && worstPerformingMonth.monthYear !== bestPerformingMonth.monthYear && (
          <StatCard 
            title="Performa Terendah" 
            icon={<IconTrendingDown className="text-red-400" />}
            value={worstPerformingMonth.monthYear}
            valueClassName="text-white text-xl md:text-2xl"
            subValue={
              <span className={`${getPercentageClass(worstPerformingMonth.percentage)} font-medium`}>
                 {formatPercentage(worstPerformingMonth.percentage)} Ach vs Target
              </span>
            }
          />
        )}
      </div>
    </div>
  );
};

export default OverallStats;