// Price Manipulation Detection Types
export interface PriceDataPoint {
  date: string;
  price: number;
  source: string;
  product_id: string;
  is_festive_period?: boolean;
  discount_percentage?: number;
}

export interface SeasonalBaseline {
  product_id: string;
  normal_price_range: { min: number; max: number };
  festive_baseline: { min: number; max: number };
  average_seasonal_increase: number;
  last_updated: string;
}

export interface PriceAlert {
  id: string;
  product_id: string;
  product_name: string;
  price_change: {
    from: number;
    to: number;
    percentage_increase: number;
  };
  alert_type: 'artificial_inflation' | 'suspicious_spike' | 'fake_discount';
  confidence_score: number;
  detected_at: string;
  festive_period?: string;
  recommendation: string;
}

export interface PriceAnalysisResult {
  product_id: string;
  current_price: number;
  baseline_price: number;
  price_manipulation_score: number; // 0-100
  alerts: PriceAlert[];
  historical_data: PriceDataPoint[];
  seasonal_analysis: {
    is_festive_period: boolean;
    expected_price_range: { min: number; max: number };
    anomaly_detected: boolean;
  };
}