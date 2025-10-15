import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  ScanLine,
  FileText,
  BarChart3,
  Settings,
  ShieldAlert,
  TrendingUp,
  ShieldCheck,
  Bot,
  MessageSquare,
  Camera,
  Search,
  AlertTriangle,
  CheckCircle,
  Users,
  Globe,
  Zap,
  Brain,
  Eye,
  Package,
  ArrowRight,
  Star,
  Clock,
  Target
} from "lucide-react";

export default function Features() {
  const coreFeatures = [
    {
      id: "scanner",
      title: "QR/Barcode Scanner",
      description: "Instantly scan products using camera or upload images for OCR text extraction and compliance validation.",
      icon: ScanLine,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      path: "/scanner",
      status: "active",
      capabilities: ["Image OCR", "Barcode lookup", "CV similarity", "Real-time validation"],
      stats: "12,435+ scans completed"
    },
    {
      id: "anomaly",
      title: "Anomaly Detection",
      description: "AI-powered system to identify unusual product patterns and ensure data quality based on Legal Metrology Act.",
      icon: ShieldAlert,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      path: "/anomaly",
      status: "active",
      capabilities: ["Risk scoring", "Pattern analysis", "Fraud detection", "Automated alerts"],
      stats: "156 anomalies detected"
    },
    {
      id: "price-manipulation",
      title: "Price Analysis",
      description: "Monitor and detect artificial price inflation, fake discount schemes, and seasonal pricing anomalies.",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      path: "/price-manipulation",
      status: "active",
      capabilities: ["Price tracking", "Inflation detection", "Seasonal analysis", "Alert system"],
      stats: "89% accuracy rate"
    },
    {
      id: "verification",
      title: "Dual Verification",
      description: "Two-way verification system for both consumers and sellers with built-in dispute resolution.",
      icon: ShieldCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      path: "/dual-verification",
      status: "active",
      capabilities: ["Consumer checks", "Seller validation", "Dispute resolution", "Batch processing"],
      stats: "94% resolution rate"
    },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      description: "Multi-language AI chatbot providing contextual help for compliance questions and product guidance.",
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      path: "/multilang-chat",
      status: "active",
      capabilities: ["10+ languages", "Context-aware", "Real-time help", "Smart suggestions"],
      stats: "Available 24/7"
    },
    {
      id: "complaints",
      title: "Complaint Management",
      description: "Streamlined system for filing, tracking, and resolving product compliance complaints with automated workflows.",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      path: "/complaints",
      status: "active",
      capabilities: ["Issue tracking", "Auto-assignment", "Status monitoring", "Response tracking"],
      stats: "47 active complaints"
    }
  ];

  const additionalFeatures = [
    {
      title: "Compliance Monitoring",
      description: "Real-time tracking of product compliance across different categories with detailed analytics.",
      icon: Shield,
      path: "/compliance",
      stats: "92% overall compliance rate"
    },
    {
      title: "Reports & Analytics",
      description: "Comprehensive reporting system with customizable dashboards and export capabilities.",
      icon: BarChart3,
      path: "/reports",
      stats: "245 reports generated"
    },
    {
      title: "Settings & Configuration",
      description: "Extensive customization options for user preferences, security, and system configuration.",
      icon: Settings,
      path: "/settings",
      stats: "Multi-user support"
    },
    {
      title: "Real-time Chat",
      description: "Direct communication channel for users to discuss compliance issues and get support.",
      icon: MessageSquare,
      path: "/chat",
      stats: "Instant messaging"
    }
  ];

  const keyMetrics = [
    { label: "Products Monitored", value: "12,435", icon: Package, color: "text-blue-600" },
    { label: "Compliance Rate", value: "92.4%", icon: CheckCircle, color: "text-green-600" },
    { label: "Active Users", value: "1,234", icon: Users, color: "text-purple-600" },
    { label: "Issues Resolved", value: "156", icon: Target, color: "text-orange-600" }
  ];

  const technicalHighlights = [
    {
      title: "Advanced OCR",
      description: "Industry-leading text extraction from product images",
      icon: Eye,
      color: "text-cyan-600"
    },
    {
      title: "AI/ML Integration",
      description: "Machine learning algorithms for pattern recognition",
      icon: Brain,
      color: "text-pink-600"
    },
    {
      title: "Real-time Processing",
      description: "Instant analysis and feedback for immediate action",
      icon: Zap,
      color: "text-yellow-600"
    },
    {
      title: "Multi-language Support",
      description: "Support for 10+ Indian languages with native scripts",
      icon: Globe,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm sm:text-base">
            ✨ Complete E-commerce Compliance Solution
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Features at a Glance
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the comprehensive suite of AI-powered tools designed to ensure e-commerce compliance, protect consumers, and streamline business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-8">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
            <Link to="/scanner">
              <Button size="lg" variant="outline" className="h-12 px-8">
                <ScanLine className="h-5 w-5 mr-2" />
                Try Scanner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to handle every aspect of e-commerce compliance monitoring and management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreFeatures.map((feature) => (
              <Card key={feature.id} className={`group hover:shadow-xl transition-all duration-300 ${feature.borderColor} border-2`}>
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    {feature.status === "active" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Live
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {feature.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{feature.stats}</span>
                      <Link to={feature.path}>
                        <Button size="sm" className="group-hover:translate-x-1 transition-transform">
                          Try Now <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-xl text-muted-foreground">
              Built with cutting-edge technology for maximum performance and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalHighlights.map((highlight, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted group-hover:scale-110 transition-transform mb-4">
                    <highlight.icon className={`h-8 w-8 ${highlight.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Additional Tools</h2>
            <p className="text-xl text-muted-foreground">
              Supporting features that complete your compliance management workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                      <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{feature.stats}</span>
                        <Link to={feature.path}>
                          <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                            Explore <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Ensure Full Compliance?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start using our comprehensive compliance suite today and protect your business with AI-powered monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg">
                <Star className="h-5 w-5 mr-2" />
                Get Started Now
              </Button>
            </Link>
            <Link to="/scanner">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Clock className="h-5 w-5 mr-2" />
                Try Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}