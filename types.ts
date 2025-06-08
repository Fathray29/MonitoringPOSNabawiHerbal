
export interface PosPerformanceData {
  pos: string;
  achievement: number;
  target: number;
  achVsTargetPercentage: string; // e.g., "91%"
  prevPeriodAchievement: number;
  achVsPrevPeriodPercentage: string; // e.g., "111%"
  // Optional: Data from the side/yearly comparison table
  prevYearAchievement?: number;
  achVsPrevYearPercentage?: string;
}

export interface MonthlyReport {
  monthYear: string; // e.g., "Januari 2025"
  // Labels for main columns
  currentAchievementDateLabel: string; // e.g., "Ach 31 Jan 2025"
  targetLabel: string; // e.g., "Target Management (TM)"
  achVsTargetLabel: string; // "Achv Vs TM"
  prevPeriodAchievementDateLabel: string; // e.g., "Ach 31 Des 2024"
  achVsPrevPeriodLabel: string; // e.g., "Achv Des 2024 vs Jan 2025"
  // Optional: Labels for side/yearly comparison columns
  prevYearAchievementDateLabel?: string; // e.g., "Ach 31 Jan 2024" (for April/Mei)
  achVsPrevYearLabel?: string; // e.g., "Achv Jan 2024" (for April/Mei)
  
  posData: PosPerformanceData[];
  totals: PosPerformanceData;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}
