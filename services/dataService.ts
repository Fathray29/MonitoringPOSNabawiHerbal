
import { MonthlyReport, PosPerformanceData } from '../types.ts';

const parseNumericValue = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const cleanedValue = String(value).replace(/Rp|\./g, '').replace(/,/g, '.');
  return parseFloat(cleanedValue) || 0;
};

export const posOrder = [ // Exporting posOrder for use in DashboardOverviewCharts
  "DISTRIBUSI PUSAT",
  "DISTRIBUSI CIRACAS",
  "MARKET PLACE",
  "LANDING PAGE",
  "TOKO CABANG",
  "TOTAL"
];

interface RawPosDataSubset {
  pos: string;
  achievement: number;
  target: number;
  achVsTargetPercentage: string;
  prevPeriodAchievement: number;
  achVsPrevPeriodPercentage: string;
}

interface RawMonthlyDataEntry { 
  monthYear: string;
  currentAchievementDateLabel: string;
  targetLabel: string;
  achVsTargetLabel: string;
  prevPeriodAchievementDateLabel: string;
  achVsPrevPeriodLabel: string;
  rawDataEntries: RawPosDataSubset[];
  rawTotals: RawPosDataSubset;
  // sideTableData is removed as it's not in the provided image
}

const rawData: RawMonthlyDataEntry[] = [
  {
    monthYear: "Januari 2025",
    currentAchievementDateLabel: "Ach 31 Jan 2025",
    targetLabel: "Target Management (TM)",
    achVsTargetLabel: "Achv Vs TM",
    prevPeriodAchievementDateLabel: "Ach 31 Des 2024",
    achVsPrevPeriodLabel: "Achv Des 2024 vs Jan 2025",
    rawDataEntries: [
      { pos: "DISTRIBUSI PUSAT", achievement: 4093284016, target: 4474822231, achVsTargetPercentage: "91%", prevPeriodAchievement: 1938928682, achVsPrevPeriodPercentage: "111%" },
      { pos: "DISTRIBUSI CIRACAS", achievement: 773087960, target: 1045335700, achVsTargetPercentage: "74%", prevPeriodAchievement: 698844100, achVsPrevPeriodPercentage: "11%" },
      { pos: "MARKET PLACE", achievement: 2245977314, target: 3069785830, achVsTargetPercentage: "73%", prevPeriodAchievement: 2223913150, achVsPrevPeriodPercentage: "1%" },
      { pos: "LANDING PAGE", achievement: 4879163850, target: 4316415913, achVsTargetPercentage: "113%", prevPeriodAchievement: 3890517608, achVsPrevPeriodPercentage: "25%" },
      { pos: "TOKO CABANG", achievement: 7559186843, target: 11716933573, achVsTargetPercentage: "65%", prevPeriodAchievement: 7270320936, achVsPrevPeriodPercentage: "4%" },
    ],
    rawTotals: { pos: "TOTAL", achievement: 19550699983, target: 24623293247, achVsTargetPercentage: "79%", prevPeriodAchievement: 16022524476, achVsPrevPeriodPercentage: "22%" }
  },
  {
    monthYear: "Februari 2025",
    currentAchievementDateLabel: "Ach 28 Feb 2025",
    targetLabel: "Target Management (TM)",
    achVsTargetLabel: "Achv Vs TM",
    prevPeriodAchievementDateLabel: "Ach 28 Jan 2025",
    achVsPrevPeriodLabel: "Achv Jan 2025 vs Feb 2025",
    rawDataEntries: [
      { pos: "DISTRIBUSI PUSAT", achievement: 3107345103, target: parseNumericValue("Rp3.864.574.011"), achVsTargetPercentage: "80%", prevPeriodAchievement: 3493411516, achVsPrevPeriodPercentage: "-11%" },
      { pos: "DISTRIBUSI CIRACAS", achievement: 587299616, target: parseNumericValue("Rp1.306.669.625"), achVsTargetPercentage: "45%", prevPeriodAchievement: 607365240, achVsPrevPeriodPercentage: "-3%" },
      { pos: "MARKET PLACE", achievement: 1987378185, target: parseNumericValue("Rp2.980.210.706"), achVsTargetPercentage: "67%", prevPeriodAchievement: 2050946540, achVsPrevPeriodPercentage: "-3%" },
      { pos: "LANDING PAGE", achievement: 4121122450, target: parseNumericValue("Rp3.638.029.829"), achVsTargetPercentage: "113%", prevPeriodAchievement: 4059643891, achVsPrevPeriodPercentage: "2%" },
      { pos: "TOKO CABANG", achievement: 7727996414, target: parseNumericValue("Rp10.508.067.913"), achVsTargetPercentage: "74%", prevPeriodAchievement: 6793179253, achVsPrevPeriodPercentage: "14%" },
    ],
    rawTotals: { pos: "TOTAL", achievement: 17531141768, target: 22297552084, achVsTargetPercentage: "79%", prevPeriodAchievement: 17004546440, achVsPrevPeriodPercentage: "3%" }
  },
  {
    monthYear: "Maret 2025",
    currentAchievementDateLabel: "Ach 31 Mar 2025",
    targetLabel: "Target",
    achVsTargetLabel: "Achv Vs TM",
    prevPeriodAchievementDateLabel: "Ach 28 Feb 2025",
    achVsPrevPeriodLabel: "Achv Feb 2025 vs Mar 2025", // Made specific
    rawDataEntries: [
      { pos: "DISTRIBUSI PUSAT", achievement: 2250284080, target: parseNumericValue("Rp5.404.951.097"), achVsTargetPercentage: "42%", prevPeriodAchievement: 3107305103, achVsPrevPeriodPercentage: "-28%" },
      { pos: "DISTRIBUSI CIRACAS", achievement: 622312148, target: parseNumericValue("Rp1.633.337.031"), achVsTargetPercentage: "38%", prevPeriodAchievement: 654381116, achVsPrevPeriodPercentage: "-5%" },
      { pos: "MARKET PLACE", achievement: 1864269997, target: parseNumericValue("Rp3.201.613.233"), achVsTargetPercentage: "58%", prevPeriodAchievement: 1987824685, achVsPrevPeriodPercentage: "-6%" },
      { pos: "LANDING PAGE", achievement: 3226727393, target: parseNumericValue("Rp3.591.123.054"), achVsTargetPercentage: "90%", prevPeriodAchievement: 4125029450, achVsPrevPeriodPercentage: "-22%" },
      { pos: "TOKO CABANG", achievement: 8000247070, target: parseNumericValue("Rp14.179.678.014"), achVsTargetPercentage: "56%", prevPeriodAchievement: 7742567314, achVsPrevPeriodPercentage: "3%" },
    ],
    rawTotals: { pos: "TOTAL", achievement: 15963840688, target: 28010702429, achVsTargetPercentage: "57%", prevPeriodAchievement: 17617107668, achVsPrevPeriodPercentage: "-9%" }
  },
  {
    monthYear: "April 2025",
    currentAchievementDateLabel: "Ach 30 April 2025", 
    targetLabel: "Target",
    achVsTargetLabel: "Achv Vs TM",
    prevPeriodAchievementDateLabel: "Ach 31 Mar 2025",
    achVsPrevPeriodLabel: "Achv Mar 2025 vs Apr 2025", 
    rawDataEntries: [
      { pos: "DISTRIBUSI PUSAT", achievement: parseNumericValue("2.758.965.035"), target: parseNumericValue("Rp3.815.418.230,00"), achVsTargetPercentage: "72%", prevPeriodAchievement: 2249984080, achVsPrevPeriodPercentage: "23%" },
      { pos: "DISTRIBUSI CIRACAS", achievement: parseNumericValue("921.037.773"), target: parseNumericValue("Rp1.331.300.000,00"), achVsTargetPercentage: "69%", prevPeriodAchievement: 589854772, achVsPrevPeriodPercentage: "56%" },
      { pos: "MARKET PLACE", achievement: parseNumericValue("1.761.045.912"), target: parseNumericValue("Rp2.667.823.422,00"), achVsTargetPercentage: "66%", prevPeriodAchievement: 1927444867, achVsPrevPeriodPercentage: "-9%" },
      { pos: "LANDING PAGE", achievement: parseNumericValue("4.709.694.500"), target: parseNumericValue("Rp2.961.109.904,00"), achVsTargetPercentage: "159%", prevPeriodAchievement: 4480190489, achVsPrevPeriodPercentage: "5%" },
      { pos: "TOKO CABANG", achievement: parseNumericValue("7.138.001.773"), target: parseNumericValue("Rp10.105.997.537,00"), achVsTargetPercentage: "71%", prevPeriodAchievement: 8012228220, achVsPrevPeriodPercentage: "-11%" },
    ],
    rawTotals: { pos: "TOTAL", achievement: parseNumericValue("17.288.744.993"), target: parseNumericValue("Rp20.881.649.093,0"), achVsTargetPercentage: "83%", prevPeriodAchievement: 17259702428, achVsPrevPeriodPercentage: "0%" }
  },
  {
    monthYear: "Mei 2025",
    currentAchievementDateLabel: "Ach 31 Mei 2025",
    targetLabel: "Target",
    achVsTargetLabel: "Achv Vs TM",
    prevPeriodAchievementDateLabel: "Ach 31 April", 
    achVsPrevPeriodLabel: "Achv April 2025 vs Mei 2025",
    rawDataEntries: [
      { pos: "DISTRIBUSI PUSAT", achievement: 2193585500, target: parseNumericValue("Rp4.042.913.810"), achVsTargetPercentage: "54%", prevPeriodAchievement: 2697855540, achVsPrevPeriodPercentage: "-19%" },
      { pos: "DISTRIBUSI CIRACAS", achievement: 801569869, target: parseNumericValue("Rp1.399.300.000"), achVsTargetPercentage: "57%", prevPeriodAchievement: 921037773, achVsPrevPeriodPercentage: "-13%" },
      { pos: "MARKET PLACE", achievement: 1760151135, target: parseNumericValue("Rp3.191.506.352"), achVsTargetPercentage: "55%", prevPeriodAchievement: 1761199912, achVsPrevPeriodPercentage: "0%" },
      { pos: "LANDING PAGE", achievement: 3679929730, target: parseNumericValue("Rp4.209.412.163"), achVsTargetPercentage: "87%", prevPeriodAchievement: 4755396500, achVsPrevPeriodPercentage: "-23%" },
      { pos: "TOKO CABANG", achievement: 7692705841, target: parseNumericValue("Rp11.621.897.168"), achVsTargetPercentage: "66%", prevPeriodAchievement: 7147390573, achVsPrevPeriodPercentage: "8%" },
    ],
    rawTotals: { pos: "TOTAL", achievement: 16127942075, target: parseNumericValue("Rp24.465.029.493"), achVsTargetPercentage: "66%", prevPeriodAchievement: 17282880298, achVsPrevPeriodPercentage: "-7%" }
  }
];

export const reportData: MonthlyReport[] = rawData.map((month: RawMonthlyDataEntry) => {
  const processedPosData: PosPerformanceData[] = month.rawDataEntries.map((entry) => {
    const dataItem: PosPerformanceData = {
      pos: entry.pos,
      achievement: entry.achievement,
      target: entry.target,
      achVsTargetPercentage: entry.achVsTargetPercentage,
      prevPeriodAchievement: entry.prevPeriodAchievement,
      achVsPrevPeriodPercentage: entry.achVsPrevPeriodPercentage,
      prevYearAchievement: undefined, 
      achVsPrevYearPercentage: undefined,
    };
    return dataItem;
  });

  const baseTotals = month.rawTotals;
  const processedTotals: PosPerformanceData = {
    pos: baseTotals.pos,
    achievement: baseTotals.achievement,
    target: baseTotals.target,
    achVsTargetPercentage: baseTotals.achVsTargetPercentage,
    prevPeriodAchievement: baseTotals.prevPeriodAchievement,
    achVsPrevPeriodPercentage: baseTotals.achVsPrevPeriodPercentage,
    prevYearAchievement: undefined,
    achVsPrevYearPercentage: undefined,
  };
  
  return {
    monthYear: month.monthYear,
    currentAchievementDateLabel: month.currentAchievementDateLabel,
    targetLabel: month.targetLabel,
    achVsTargetLabel: month.achVsTargetLabel,
    prevPeriodAchievementDateLabel: month.prevPeriodAchievementDateLabel,
    achVsPrevPeriodLabel: month.achVsPrevPeriodLabel,
    prevYearAchievementDateLabel: undefined, 
    achVsPrevYearLabel: undefined, 
    posData: processedPosData,
    totals: processedTotals,
  };
});

export const getAllMonthYears = (): string[] => {
  return reportData.map(report => report.monthYear);
};

export const getChartDataForPosContributionByMonth = (monthYear: string): { name: string; value: number; }[] => {
  const selectedReport = reportData.find(report => report.monthYear === monthYear);
  if (!selectedReport) return [];

  return selectedReport.posData
    .filter(p => p.pos !== "TOTAL") 
    .map(pos => ({
      name: pos.pos,
      value: pos.achievement,
    }));
};

export const getChartDataForAchVsTmByMonth = (monthYear: string): {name: string; Percentage: number}[] => {
  const selectedMonthReport = reportData.find(report => report.monthYear === monthYear);
  if (!selectedMonthReport) return [];

  return selectedMonthReport.posData
    .filter(p => p.pos !== "TOTAL")
    .map(pos => ({
      name: pos.pos,
      Percentage: parseFloat(pos.achVsTargetPercentage.replace('%', '')),
    }));
};

export const getMonthlyPosAchievementData = (): ({ month: string; [key: string]: string | number; })[] => {
  const posNames = posOrder.filter(p => p !== "TOTAL"); 
  
  const chartData = reportData.map(monthlyReport => {
    const monthEntry: { month: string; [key: string]: string | number; } = {
      month: monthlyReport.monthYear.substring(0, 3) 
    };
    
    posNames.forEach(posName => {
      const posEntry = monthlyReport.posData.find(p => p.pos === posName);
      monthEntry[posName] = posEntry ? posEntry.achievement : 0; 
    });
    
    return monthEntry;
  });
  
  return chartData;
};

export interface AchievementVsTargetChartPoint {
  month: string;
  "Total Achievement": number;
  "Total Target": number;
  AchPercentage: number;
}

export const getChartDataForAchievementVsTarget = (): AchievementVsTargetChartPoint[] => {
  return reportData.map(monthlyReport => {
    const achievement = monthlyReport.totals.achievement;
    const target = monthlyReport.totals.target;
    let percentage: number;
    if (target > 0) {
      percentage = (achievement / target) * 100;
    } else {
      percentage = achievement > 0 ? Infinity : 0; 
    }
    return {
      month: monthlyReport.monthYear.substring(0, 3), // e.g., "Jan"
      "Total Achievement": achievement,
      "Total Target": target,
      AchPercentage: percentage,
    };
  });
};
