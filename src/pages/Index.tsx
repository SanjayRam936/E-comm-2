

import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  ScanLine,
  Play,
  BarChart,
  CheckCircle,
  Users,
  AlertTriangle,
} from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ComplianceCheck</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/dashboard">
                <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </button>
              </Link>

              <Link to="/scanner">
                <button className="bg-primary hover:bg-primary/90 text-white h-10 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors">
                  <ScanLine className="h-4 w-4 mr-2" />
                  Start Scanning
                </button>
              </Link>

              <Link to="/login">
                <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-primary/20 mb-6">
            AI-Powered Compliance Solution
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Automated Compliance & Complaint Checker
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Protect consumers and ensure e-commerce compliance with our AI-powered
            system that verifies product declarations, handles complaints, and
            provides real-time alerts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-md text-lg font-medium inline-flex items-center justify-center transition-colors">
                <Play className="h-5 w-5 mr-2" />
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { icon: BarChart, value: "12,435", label: "Products Monitored" },
            { icon: CheckCircle, value: "92.4%", label: "Compliance Rate" },
            { icon: Users, value: "1,234", label: "Active Users" },
            { icon: AlertTriangle, value: "156", label: "Issues Resolved" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-2">{value}</div>
              <div className="text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 text-center">
        <div className="max-w-3xl mx-auto">
          <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-warning mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Protect Your Customers Today
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Join thousands of e-commerce platforms using our compliance system to
            ensure safety and build consumer trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-md text-lg font-medium">
                Access Dashboard
              </button>
            </Link>
            <Link to="/complaints">
              <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 rounded-md text-lg font-medium">
                View Complaints
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold">ComplianceCheck</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ComplianceCheck. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

