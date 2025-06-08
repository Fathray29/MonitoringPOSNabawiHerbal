
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { 
  getChartDataForAchievementVsTarget,
  getChartDataForPosContributionByMonth,
  getChartDataForAchVsTmByMonth,
  getMonthlyPosAchievementData,
  getAllMonthYears,
  posOrder,
  AchievementVsTargetChartPoint // Import the new interface
} from '../services/dataService.tsx';
import FullScreenChartModal from './FullScreenChartModal.tsx';

const formatCurrencyForAxis = (value: number): string => {
  if (value >= 1e9) return `Rp${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `Rp${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `Rp${(value / 1e3).toFixed(1)}K`;
  return `Rp${value.toLocaleString('id-ID')}`;
};

const formatRawCurrencyForTooltip = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return 'Rp N/A';
  return `Rp${Number(value).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const COLORS = ['#10B981', '#FFBB28', '#FF8042', '#82Ca9D', '#8884D8', '#34D399', '#A4DE6C', '#FFC658', '#D0ED57'];
const MAROON_COLOR = "#800000";

const FullscreenIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 .75-5.25-5.25" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // For BarChart (Total Achievement vs Target), payload items might not need explicit sorting
    // if Bar components are defined correctly. For other charts, sorting is useful.
    // The existing sorting logic by value (desc) is generally good.
    const sortedPayload = [...payload].sort((a, b) => {
      const valueA = typeof a.value === 'number' ? a.value : 0;
      const valueB = typeof b.value === 'number' ? b.value : 0;
      return valueB - valueA;
    });

    return (
      <div className="bg-white p-3 border border-gray-300 shadow-xl rounded-md opacity-95 z-50">
        <p className="font-semibold text-gray-800 text-sm mb-1">{label}</p>
        {sortedPayload.map((entry: any, index: number) => {
          // Special handling for Achievement bar in the dual-bar chart to show its percentage
           if (entry.name === "Total Pencapaian" && entry.payload?.AchPercentage !== undefined) {
             const achPercent = entry.payload.AchPercentage === Infinity ? 'N/A' : `${entry.payload.AchPercentage.toFixed(1)}%`;
             return (
              <p key={`item-${index}`} style={{ color: entry.fill || entry.stroke }} className="text-xs">
                {`${entry.name}: ${formatRawCurrencyForTooltip(entry.value)} (${achPercent})`}
              </p>
             );
           }
          return (
            <p key={`item-${index}`} style={{ color: entry.stroke || entry.fill }} className="text-xs">
              {`${entry.name}: ${entry.dataKey === 'Percentage' || (entry.name && entry.name.includes('%')) || (entry.payload && typeof entry.payload.Percentage !== 'undefined') 
                ? entry.value + '%' 
                : formatRawCurrencyForTooltip(entry.value)}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

// --- Custom Label Components for Achievement vs Target Bar Chart ---
const PercentageLabel: React.FC<any> = (props) => {
  const { x, y, width, value, payload } = props;
  if (value === null || value === undefined || !payload) return null;

  const percentage = payload.AchPercentage; // Assuming AchPercentage is on the payload
  let textColor = '#374151'; // default text-gray-700

  if (percentage === Infinity) {
     textColor = '#15803d'; // green-600 for N/A when target is 0 but achievement > 0
  } else if (percentage >= 100) {
    textColor = '#15803d'; // green-600
  } else {
    textColor = '#b91c1c'; // red-700
  }

  return (
    <text 
      x={x + width / 2} 
      y={y - 6} 
      fill={textColor} 
      textAnchor="middle" 
      dominantBaseline="auto" 
      fontSize="10px"
      fontWeight="bold"
    >
      {`${percentage === Infinity ? 'N/A (Target Rp0)' : percentage.toFixed(1) + '%'}`}
    </text>
  );
};

const AchievementValueLabel: React.FC<any> = (props) => {
  const { x, y, width, height, value } = props;
  if (value === null || value === undefined || height < 18) return null;

  return (
    <text 
      x={x + width / 2} 
      y={y + height / 2 + 1} // Adjusted for better centering
      fill="#FFFFFF" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      fontSize="9px"
      fontWeight="bold"
    >
      {formatCurrencyForAxis(value)}
    </text>
  );
};

const TargetValueLabel: React.FC<any> = (props) => {
  const { x, y, width, value, payload } = props;
  if (value === null || value === undefined || !payload || payload.AchPercentage >= 100 || payload.AchPercentage === Infinity) {
    return null;
  }
  // Only show if achievement is less than target (and target is not 0 causing Infinity AchPercentage)
  return (
    <text 
      x={x + width / 2} 
      y={y - 6} 
      fill="#4B5563" // text-gray-600
      textAnchor="middle" 
      dominantBaseline="auto" 
      fontSize="9px"
    >
      {formatCurrencyForAxis(value)}
    </text>
  );
};
// --- End of Custom Label Components ---


interface FullscreenChartInfo {
  title: string;
  chartElement: React.ReactNode;
}

const DashboardOverviewCharts: React.FC = () => {
  const achievementVsTargetData: AchievementVsTargetChartPoint[] = getChartDataForAchievementVsTarget();
  const monthlyPosAchievementData = getMonthlyPosAchievementData();
  
  const allMonths = getAllMonthYears();
  const [selectedAchVsTmMonth, setSelectedAchVsTmMonth] = useState<string>(allMonths.length > 0 ? allMonths[allMonths.length - 1] : '');
  const [selectedPosContributionMonth, setSelectedPosContributionMonth] = useState<string>(allMonths.length > 0 ? allMonths[allMonths.length - 1] : '');
  
  const achVsTmData = selectedAchVsTmMonth ? getChartDataForAchVsTmByMonth(selectedAchVsTmMonth) : [];
  const posContributionData = selectedPosContributionMonth ? getChartDataForPosContributionByMonth(selectedPosContributionMonth) : [];

  const orderedPosKeysWithoutTotal = posOrder.filter(p => p !== "TOTAL");

  const [fullscreenInfo, setFullscreenInfo] = useState<FullscreenChartInfo | null>(null);

  const openFullScreen = (title: string, chartElement: React.ReactNode) => {
    setFullscreenInfo({ title, chartElement });
  };

  const closeFullScreen = () => {
    setFullscreenInfo(null);
  };

  const ChartCard: React.FC<{ title: string; children: React.ReactNode; chartForModal: React.ReactNode; className?: string }> = 
    ({ title, children, chartForModal, className }) => (
    <div className={`p-6 border border-slate-300 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-emerald-800">{title}</h3>
        <button
          onClick={() => openFullScreen(title, chartForModal)}
          className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors"
          aria-label={`Fullscreen ${title}`}
        >
          <FullscreenIcon />
        </button>
      </div>
      {children}
    </div>
  );
  
  const achievementVsTargetChartElement = (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={achievementVsTargetData} 
        margin={{ top: 30, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} dy={5} fontSize="11px" />
        <YAxis 
          tickFormatter={formatCurrencyForAxis} 
          axisLine={false} 
          tickLine={false} 
          width={75} 
          dx={-5}
          fontSize="11px"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(209, 213, 219, 0.4)' }}
        />
        <Legend
          verticalAlign="top"
          align="center"
          height={36}
          wrapperStyle={{ fontSize: "12px", marginTop: "-10px" }}
          formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
        />
        <Bar
          dataKey="Total Target"
          name="Total Target"
          fill="#E5E7EB" // gray-200
          barSize={30}
          radius={[6, 6, 0, 0]}
        >
          <LabelList dataKey="Total Target" content={<TargetValueLabel />} />
        </Bar>
        <Bar
          dataKey="Total Achievement"
          name="Total Pencapaian"
          barSize={30}
          radius={[6, 6, 0, 0]}
        >
          {achievementVsTargetData.map((entry, index) => (
            <Cell 
              key={`cell-ach-${index}`} 
              fill={entry.AchPercentage === Infinity || entry.AchPercentage >= 100 ? '#48BB78' : '#F56565'} // emerald-500, red-500
            />
          ))}
          <LabelList dataKey="Total Achievement" content={<AchievementValueLabel />} />
          <LabelList dataKey="AchPercentage" content={<PercentageLabel />} /> 
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
  
  const posContributionChartForModal = (
     <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={posContributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {posContributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{fontSize: '0.8rem'}}/>
        </PieChart>
      </ResponsiveContainer>
  );
  
  const monthlyPosAchievementChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={monthlyPosAchievementData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize="11px"/>
        <YAxis tickFormatter={formatCurrencyForAxis} fontSize="11px" width={70}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        {orderedPosKeysWithoutTotal.map((posKey, index) => {
          const strokeColor = posKey === "DISTRIBUSI PUSAT" ? MAROON_COLOR : COLORS[index % COLORS.length];
          return (
            <Line 
              key={posKey} 
              type="monotone" 
              dataKey={posKey} 
              name={posKey}
              stroke={strokeColor} 
              activeDot={{ r: 6 }}
              strokeWidth={2.5}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );

  const achVsTargetPercentageChart = (
    <ResponsiveContainer width="100%" height={Math.max(300, achVsTmData.length * 35 + 60)}>
      <BarChart 
        data={achVsTmData} 
        layout="vertical"
        margin={{ top: 5, right: 40, left: 100, bottom: 5 }} 
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            type="number" 
            domain={[0, dataMax => Math.max(100, dataMax + 20)]} 
            tickFormatter={(value) => `${value}%`}
            fontSize="11px"
        />
        <YAxis 
            dataKey="name" 
            type="category" 
            width={120} 
            interval={0} 
            tick={{ fontSize: '11px' }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        <Bar dataKey="Percentage" name="Ach vs Target %">
          {achVsTmData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={ (entry as any).Percentage >= 100 ? '#22c55e' : '#ef4444'} />
          ))}
          <LabelList 
            dataKey="Percentage" 
            position="right" 
            formatter={(value: number) => `${value}%`} 
            style={{ fill: '#333', fontSize: '10px' }} 
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="my-8 p-4 sm:p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center">Dashboard Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <ChartCard title="Total Achievement vs Target" chartForModal={achievementVsTargetChartElement}>
          <ResponsiveContainer width="100%" height={300}>
            {achievementVsTargetChartElement}
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Kontribusi POS" chartForModal={posContributionChartForModal}>
           {allMonths.length > 0 && (
            <div className="mb-4 relative">
              <label htmlFor="posContributionMonthSelect" className="sr-only">Pilih Bulan:</label>
              <select
                id="posContributionMonthSelect"
                value={selectedPosContributionMonth}
                onChange={(e) => setSelectedPosContributionMonth(e.target.value)}
                className="appearance-none mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md shadow-sm"
              >
                {allMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5 text-gray-400 pointer-events-none" />
            </div>
          )}
          <ResponsiveContainer width="100%" height={300}>
             <PieChart>
              <Pie
                data={posContributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {posContributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: '0.8rem'}}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tren Pencapaian Bulanan per POS" chartForModal={monthlyPosAchievementChart} className="lg:col-span-2">
           <ResponsiveContainer width="100%" height={400}>
            {monthlyPosAchievementChart}
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Achievement vs Target % per POS" chartForModal={achVsTargetPercentageChart} className="lg:col-span-2">
          <div className="mb-4">
            {allMonths.length > 0 && (
              <div className="w-full sm:w-auto ml-auto relative">
                <label htmlFor="achVsTmMonthSelect" className="sr-only">Pilih Bulan:</label>
                <select
                  id="achVsTmMonthSelect"
                  value={selectedAchVsTmMonth}
                  onChange={(e) => setSelectedAchVsTmMonth(e.target.value)}
                  className="appearance-none mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md shadow-sm"
                >
                  {allMonths.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                 <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>
          <div style={{ height: Math.max(300, achVsTmData.length * 35 + 80) + 'px', width: '100%' }}>
            {achVsTargetPercentageChart}
          </div>
        </ChartCard>

      </div>
      {fullscreenInfo && (
        <FullScreenChartModal 
          isOpen={!!fullscreenInfo} 
          onClose={closeFullScreen} 
          title={fullscreenInfo.title}
        >
          {fullscreenInfo.chartElement}
        </FullScreenChartModal>
      )}
    </div>
  );
};

export default DashboardOverviewCharts;
