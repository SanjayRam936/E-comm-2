import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Search, Calendar, Filter } from "lucide-react";
import type { PriceAlert, PriceAnalysisResult, PriceDataPoint } from "@/types/pricing";

// Mock data for demonstration
const mockPriceData: PriceDataPoint[] = [
  { date: "2024-01-01", price: 800, source: "retailer_a", product_id: "prod_123", is_festive_period: false },
  { date: "2024-01-15", price: 820, source: "retailer_b", product_id: "prod_123", is_festive_period: false },
  { date: "2024-02-01", price: 850, source: "retailer_a", product_id: "prod_123", is_festive_period: false },
  { date: "2024-02-10", price: 1900, source: "retailer_a", product_id: "prod_123", is_festive_period: false },
  { date: "2024-02-14", price: 950, source: "retailer_a", product_id: "prod_123", is_festive_period: true, discount_percentage: 50 },
  { date: "2024-02-15", price: 860, source: "retailer_a", product_id: "prod_123", is_festive_period: false },
];

const mockAlerts: PriceAlert[] = [
  {
    id: "alert_1",
    product_id: "prod_123",
    product_name: "Samsung Galaxy Smartphone",
    price_change: { from: 850, to: 1900, percentage_increase: 123.5 },
    alert_type: "artificial_inflation",
    confidence_score: 92,
    detected_at: "2024-02-10T10:30:00Z",
    festive_period: "Valentine's Day",
    recommendation: "Investigate sudden price increase before festive discount period"
  },
  {
    id: "alert_2", 
    product_id: "prod_456",
    product_name: "Apple iPhone 15",
    price_change: { from: 75000, to: 95000, percentage_increase: 26.7 },
    alert_type: "suspicious_spike",
    confidence_score: 85,
    detected_at: "2024-02-08T14:20:00Z",
    recommendation: "Monitor for fake discount schemes during upcoming sales"
  }
];

export default function PriceManipulation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("prod_123");
  const [priceAnalysis, setPriceAnalysis] = useState<PriceAnalysisResult | null>(null);
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts);

  useEffect(() => {
    // Simulate API call to fetch price analysis
    const mockAnalysis: PriceAnalysisResult = {
      product_id: selectedProduct,
      current_price: 860,
      baseline_price: 825,
      price_manipulation_score: 78,
      alerts: alerts.filter(a => a.product_id === selectedProduct),
      historical_data: mockPriceData,
      seasonal_analysis: {
        is_festive_period: false,
        expected_price_range: { min: 800, max: 900 },
        anomaly_detected: true
      }
    };
    setPriceAnalysis(mockAnalysis);
  }, [selectedProduct, alerts]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case "artificial_inflation": return "destructive";
      case "suspicious_spike": return "secondary";
      case "fake_discount": return "outline";
      default: return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Price Manipulation Detection</h1>
            <p className="text-muted-foreground">
              Monitor and detect artificial price inflation and fake discount schemes
            </p>
          </div>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Search and Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search products, GTINs, or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Products Monitored</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Price Analysis</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Baselines</TabsTrigger>
          <TabsTrigger value="history">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Price Manipulation Alerts</CardTitle>
              <CardDescription>
                Real-time alerts for suspicious pricing patterns and artificial inflation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className="border-l-4 border-l-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{alert.product_name}</h4>
                            <Badge variant={getAlertColor(alert.alert_type) as any}>
                              {alert.alert_type.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {alert.confidence_score}% confidence
                            </Badge>
                          </div>
                          <div className="text-sm">
                            <p>
                              Price increased from ₹{alert.price_change.from} to ₹{alert.price_change.to} 
                              ({alert.price_change.percentage_increase.toFixed(1)}% increase)
                            </p>
                            {alert.festive_period && (
                              <p className="text-muted-foreground">
                                Detected before {alert.festive_period} sales period
                              </p>
                            )}
                            <p className="mt-1 text-blue-600">{alert.recommendation}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {new Date(alert.detected_at).toLocaleString()}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {priceAnalysis && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Manipulation Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <span className={`text-3xl font-bold ${getScoreColor(priceAnalysis.price_manipulation_score)}`}>
                        {priceAnalysis.price_manipulation_score}
                      </span>
                      <span className="text-muted-foreground">/100</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {priceAnalysis.price_manipulation_score >= 80 ? "High Risk" : 
                       priceAnalysis.price_manipulation_score >= 60 ? "Medium Risk" : "Low Risk"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Current vs Baseline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Price:</span>
                        <span className="font-semibold">₹{priceAnalysis.current_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Baseline Price:</span>
                        <span className="font-semibold">₹{priceAnalysis.baseline_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difference:</span>
                        <span className={`font-semibold ${priceAnalysis.current_price > priceAnalysis.baseline_price ? 'text-red-600' : 'text-green-600'}`}>
                          {priceAnalysis.current_price > priceAnalysis.baseline_price ? '+' : ''}
                          ₹{priceAnalysis.current_price - priceAnalysis.baseline_price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Seasonal Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {priceAnalysis.seasonal_analysis.is_festive_period ? "Festive Period" : "Normal Period"}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p>Expected Range:</p>
                        <p className="font-semibold">
                          ₹{priceAnalysis.seasonal_analysis.expected_price_range.min} - 
                          ₹{priceAnalysis.seasonal_analysis.expected_price_range.max}
                        </p>
                      </div>
                      {priceAnalysis.seasonal_analysis.anomaly_detected && (
                        <Badge variant="destructive" className="text-xs">
                          Anomaly Detected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Price History Chart</CardTitle>
                  <CardDescription>
                    Historical price data with baseline and alert markers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceAnalysis.historical_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <ReferenceLine y={priceAnalysis.baseline_price} stroke="blue" strokeDasharray="5 5" label="Baseline" />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={(props) => {
                            const data = priceAnalysis.historical_data[props.payload?.index];
                            return data?.is_festive_period ? 
                              <circle cx={props.cx} cy={props.cy} r={6} fill="red" stroke="red" strokeWidth={2} /> :
                              <circle cx={props.cx} cy={props.cy} r={3} fill="#8884d8" />;
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Baseline Models</CardTitle>
              <CardDescription>
                Festive period calibration and baseline price modeling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p>Seasonal baseline models will be displayed here</p>
                <p className="text-sm">Feature coming soon with machine learning integration</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historical Trends Analysis</CardTitle>
              <CardDescription>
                Long-term price manipulation patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Historical trend analysis will be displayed here</p>
                <p className="text-sm">Advanced analytics and pattern recognition</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}