// Price Manipulation Detection Library
import type { PriceDataPoint, PriceAlert, SeasonalBaseline } from "@/types/pricing";

// Festive periods in India with date ranges
const FESTIVE_PERIODS = [
  { name: "Diwali", start: "10-15", end: "11-15", weightage: 1.5 },
  { name: "Dussehra", start: "09-20", end: "10-20", weightage: 1.3 },
  { name: "Holi", start: "02-25", end: "03-25", weightage: 1.2 },
  { name: "Eid", start: "04-01", end: "05-01", weightage: 1.2 }, // Approximate
  { name: "Christmas", start: "12-15", end: "12-31", weightage: 1.4 },
  { name: "New Year", start: "12-25", end: "01-15", weightage: 1.3 },
  { name: "Valentine's Day", start: "02-10", end: "02-18", weightage: 1.1 },
  { name: "Mother's Day", start: "05-05", end: "05-15", weightage: 1.1 },
];

export function detectFestivePeriod(date: Date): { is_festive: boolean; period?: string; weightage?: number } {
  const month = date.getMonth() + 1; // 1-based month
  const day = date.getDate();
  const monthDay = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  for (const period of FESTIVE_PERIODS) {
    if (isDateInRange(monthDay, period.start, period.end)) {
      return {
        is_festive: true,
        period: period.name,
        weightage: period.weightage
      };
    }
  }
  
  return { is_festive: false };
}

function isDateInRange(current: string, start: string, end: string): boolean {
  // Handle cross-year ranges (like New Year)
  if (start > end) {
    return current >= start || current <= end;
  }
  return current >= start && current <= end;
}

export function calculateBaselinePrice(historicalData: PriceDataPoint[]): SeasonalBaseline {
  if (historicalData.length === 0) {
    throw new Error("No historical data provided");
  }

  const normalPeriodPrices = historicalData
    .filter(point => !point.is_festive_period)
    .map(point => point.price);
    
  const festivePeriodPrices = historicalData
    .filter(point => point.is_festive_period)
    .map(point => point.price);

  const normalMin = Math.min(...normalPeriodPrices);
  const normalMax = Math.max(...normalPeriodPrices);
  const normalAvg = normalPeriodPrices.reduce((a, b) => a + b, 0) / normalPeriodPrices.length;

  let festiveMin = normalMin;
  let festiveMax = normalMax;
  let seasonalIncrease = 0;

  if (festivePeriodPrices.length > 0) {
    festiveMin = Math.min(...festivePeriodPrices);
    festiveMax = Math.max(...festivePeriodPrices);
    const festiveAvg = festivePeriodPrices.reduce((a, b) => a + b, 0) / festivePeriodPrices.length;
    seasonalIncrease = ((festiveAvg - normalAvg) / normalAvg) * 100;
  }

  return {
    product_id: historicalData[0].product_id,
    normal_price_range: { min: normalMin, max: normalMax },
    festive_baseline: { min: festiveMin, max: festiveMax },
    average_seasonal_increase: seasonalIncrease,
    last_updated: new Date().toISOString()
  };
}

export function detectPriceManipulation(
  currentPrice: number,
  historicalData: PriceDataPoint[],
  baseline: SeasonalBaseline
): { score: number; alerts: PriceAlert[] } {
  const alerts: PriceAlert[] = [];
  let manipulationScore = 0;

  // Sort data by date
  const sortedData = [...historicalData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Check for artificial inflation before festive periods
  const recentData = sortedData.slice(-10); // Last 10 data points
  for (let i = 1; i < recentData.length; i++) {
    const prev = recentData[i - 1];
    const curr = recentData[i];
    const increase = ((curr.price - prev.price) / prev.price) * 100;

    // Detect sudden spike > 50% before festive period
    if (increase > 50) {
      const festiveCheck = detectFestivePeriod(new Date(curr.date));
      if (festiveCheck.is_festive || isNearFestivePeriod(new Date(curr.date))) {
        alerts.push({
          id: `alert_${Date.now()}_${i}`,
          product_id: curr.product_id,
          product_name: `Product ${curr.product_id}`,
          price_change: {
            from: prev.price,
            to: curr.price,
            percentage_increase: increase
          },
          alert_type: "artificial_inflation",
          confidence_score: Math.min(95, 70 + (increase - 50) * 0.5),
          detected_at: curr.date,
          festive_period: festiveCheck.period,
          recommendation: "Investigate sudden price increase before festive discount period"
        });
        manipulationScore += 30;
      }
    }
  }

  // Check current price against baseline
  const normalRange = baseline.normal_price_range;
  if (currentPrice > normalRange.max * 1.3) {
    const increaseFromBaseline = ((currentPrice - normalRange.max) / normalRange.max) * 100;
    alerts.push({
      id: `alert_${Date.now()}_baseline`,
      product_id: baseline.product_id,
      product_name: `Product ${baseline.product_id}`,
      price_change: {
        from: normalRange.max,
        to: currentPrice,
        percentage_increase: increaseFromBaseline
      },
      alert_type: "suspicious_spike",
      confidence_score: Math.min(90, 60 + increaseFromBaseline * 0.3),
      detected_at: new Date().toISOString(),
      recommendation: "Current price significantly above historical baseline"
    });
    manipulationScore += 25;
  }

  // Check for fake discount patterns
  const potentialFakeDiscounts = detectFakeDiscounts(sortedData);
  alerts.push(...potentialFakeDiscounts);
  manipulationScore += potentialFakeDiscounts.length * 20;

  return {
    score: Math.min(100, manipulationScore),
    alerts
  };
}

function isNearFestivePeriod(date: Date, daysBefore: number = 7): boolean {
  for (let i = 0; i <= daysBefore; i++) {
    const checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + i);
    if (detectFestivePeriod(checkDate).is_festive) {
      return true;
    }
  }
  return false;
}

function detectFakeDiscounts(data: PriceDataPoint[]): PriceAlert[] {
  const alerts: PriceAlert[] = [];
  
  for (let i = 2; i < data.length; i++) {
    const before = data[i - 2];
    const spike = data[i - 1];
    const discount = data[i];

    // Pattern: Normal price -> Sudden spike -> "Discount" back to normal/higher
    if (spike.price > before.price * 1.5 && 
        discount.discount_percentage && discount.discount_percentage > 30 &&
        discount.price >= before.price * 0.95) {
      
      alerts.push({
        id: `alert_${Date.now()}_fake_${i}`,
        product_id: discount.product_id,
        product_name: `Product ${discount.product_id}`,
        price_change: {
          from: before.price,
          to: spike.price,
          percentage_increase: ((spike.price - before.price) / before.price) * 100
        },
        alert_type: "fake_discount",
        confidence_score: 85,
        detected_at: spike.date,
        recommendation: "Potential fake discount scheme detected - price artificially inflated before discount"
      });
    }
  }

  return alerts;
}

export function generatePriceReport(
  productId: string,
  currentPrice: number,
  historicalData: PriceDataPoint[]
): {
  summary: string;
  riskLevel: "low" | "medium" | "high";
  recommendations: string[];
} {
  const baseline = calculateBaselinePrice(historicalData);
  const analysis = detectPriceManipulation(currentPrice, historicalData, baseline);

  let riskLevel: "low" | "medium" | "high" = "low";
  if (analysis.score >= 70) riskLevel = "high";
  else if (analysis.score >= 40) riskLevel = "medium";

  const recommendations: string[] = [];
  
  if (analysis.alerts.length > 0) {
    recommendations.push("Monitor pricing patterns closely");
    recommendations.push("Investigate recent price changes");
  }
  
  if (riskLevel === "high") {
    recommendations.push("Consider regulatory investigation");
    recommendations.push("Alert consumers about potential manipulation");
  }

  return {
    summary: `Product ${productId} has a manipulation risk score of ${analysis.score}/100 with ${analysis.alerts.length} active alerts.`,
    riskLevel,
    recommendations
  };
}