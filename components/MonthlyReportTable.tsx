import React from 'react';
import { MonthlyReport, PosPerformanceData } from '../types.ts';

interface MonthlyReportTableProps {
  report: MonthlyReport;
}

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return '-';
  return `Rp${value.toLocaleString('id-ID')}`;
};

const getPercentageClass = (percentageStr: string | undefined, isComparisonType: boolean): string => {
  if (percentageStr === undefined) return 'text-gray-700';
  
  if (isComparisonType) { // For Achv vs Prev Period/Year
    if (percentageStr.startsWith('-')) return 'text-red-600 font-medium';
    if (percentageStr === "0%") return 'text-yellow-600 font-medium'; 
    return 'text-green-600 font-medium';
  } else { // For Achv vs TM
    const numericValue = parseFloat(percentageStr.replace('%', ''));
    if (isNaN(numericValue)) return 'text-gray-700';
    if (numericValue < 100) return 'text-red-600 font-medium';
    return 'text-green-600 font-medium';
  }
};

const TableHeaderCell: React.FC<{ children: React.ReactNode; className?: string, isHighlighted?: boolean }> = ({ children, className, isHighlighted }) => (
  <th className={`py-3 px-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap ${isHighlighted ? 'bg-emerald-200' : 'bg-gray-200'} ${className}`}>
    {children}
  </th>
);

const TableCell: React.FC<{ children: React.ReactNode; className?: string, isNumeric?: boolean }> = ({ children, className, isNumeric }) => (
  <td className={`py-3 px-4 text-sm text-gray-700 whitespace-nowrap ${isNumeric ? 'text-right' : 'text-left'} ${className}`}>
    {children}
  </td>
);

const MonthlyReportTable: React.FC<MonthlyReportTableProps> = ({ report }) => {
  const dataRows = [...report.posData, report.totals];
  const hasYearlyComparison = !!report.prevYearAchievementDateLabel;

  return (
    <div className="mb-12 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="p-4 text-xl font-semibold text-gray-800 bg-slate-200 border-b border-gray-300">
        {report.monthYear}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <TableHeaderCell>POS</TableHeaderCell>
              <TableHeaderCell isHighlighted>{report.currentAchievementDateLabel}</TableHeaderCell>
              <TableHeaderCell isHighlighted>{report.targetLabel}</TableHeaderCell>
              <TableHeaderCell>{report.achVsTargetLabel}</TableHeaderCell>
              <TableHeaderCell>{report.prevPeriodAchievementDateLabel}</TableHeaderCell>
              <TableHeaderCell isHighlighted>{report.achVsPrevPeriodLabel}</TableHeaderCell>
              {hasYearlyComparison && (
                <>
                  <TableHeaderCell>{report.prevYearAchievementDateLabel}</TableHeaderCell>
                  <TableHeaderCell isHighlighted>{report.achVsPrevYearLabel}</TableHeaderCell>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataRows.map((item, index) => (
              <tr key={item.pos} className={item.pos === 'TOTAL' ? 'bg-gray-100 font-bold' : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}>
                <TableCell>{item.pos}</TableCell>
                <TableCell isNumeric>{formatCurrency(item.achievement)}</TableCell>
                <TableCell isNumeric>{formatCurrency(item.target)}</TableCell>
                <TableCell isNumeric className={getPercentageClass(item.achVsTargetPercentage, false)}>
                  {item.achVsTargetPercentage}
                </TableCell>
                <TableCell isNumeric>{formatCurrency(item.prevPeriodAchievement)}</TableCell>
                <TableCell isNumeric className={getPercentageClass(item.achVsPrevPeriodPercentage, true)}>
                  {item.achVsPrevPeriodPercentage}
                </TableCell>
                {hasYearlyComparison && (
                  <>
                    <TableCell isNumeric>{formatCurrency(item.prevYearAchievement)}</TableCell>
                    <TableCell isNumeric className={getPercentageClass(item.achVsPrevYearPercentage, true)}>
                      {item.achVsPrevYearPercentage}
                    </TableCell>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportTable;