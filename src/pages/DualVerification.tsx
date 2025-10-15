import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Shield, 
  ShoppingCart, 
  Store, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Camera,
  Users,
  AlertTriangle
} from "lucide-react";
import type { 
  ConsumerVerification, 
  SellerVerification, 
  VerificationResult, 
  DisputeThread 
} from "@/types/verification";

// Mock data
const mockVerifications: (ConsumerVerification | SellerVerification)[] = [
  {
    id: "ver_001",
    product_id: "prod_123",
    requester_type: "consumer",
    verification_type: "post_delivery",
    status: "completed",
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-02-11T15:30:00Z",
    purchase_details: {
      seller_name: "Electronics Store",
      purchase_date: "2024-02-08",
      price_paid: 15999
    }
  },
  {
    id: "ver_002", 
    product_id: "prod_456",
    requester_type: "seller",
    verification_type: "batch",
    status: "in_progress",
    created_at: "2024-02-12T09:00:00Z",
    updated_at: "2024-02-12T14:20:00Z",
    batch_details: {
      batch_id: "BATCH_2024_001",
      quantity: 500,
      manufacturing_date: "2024-01-15",
      expiry_date: "2026-01-15"
    }
  }
];

const mockDisputes: DisputeThread[] = [
  {
    id: "dispute_001",
    verification_id: "ver_001",
    participants: {
      consumer_id: "consumer_123",
      seller_id: "seller_456",
      mediator_id: "mediator_789"
    },
    messages: [
      {
        id: "msg_001",
        sender_type: "consumer",
        content: "The product I received doesn't match the description. The packaging is different and quality seems poor.",
        timestamp: "2024-02-11T16:00:00Z"
      },
      {
        id: "msg_002",
        sender_type: "seller",
        content: "We apologize for the inconvenience. Can you please share photos of the product and packaging?",
        timestamp: "2024-02-11T16:30:00Z"
      }
    ],
    status: "open"
  }
];

export default function DualVerification() {
  const [activeTab, setActiveTab] = useState("consumer");
  const [verifications, setVerifications] = useState(mockVerifications);
  const [disputes, setDisputes] = useState(mockDisputes);
  const [newVerification, setNewVerification] = useState({
    product_id: "",
    verification_type: "pre_purchase",
    requester_type: "consumer" as "consumer" | "seller"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in_progress": return "secondary";
      case "pending": return "outline";
      case "disputed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      case "disputed": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dual-Side Verification</h1>
          <p className="text-muted-foreground">
            Consumer and seller verification tools with dispute resolution
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Start Verification
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">124</p>
                <p className="text-sm text-muted-foreground">Consumer Verifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Store className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Seller Verifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Disputes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consumer">Consumer Portal</TabsTrigger>
          <TabsTrigger value="seller">Seller Portal</TabsTrigger>
          <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
          <TabsTrigger value="batch">Batch Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="consumer" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Verification Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>New Consumer Verification</span>
                </CardTitle>
                <CardDescription>
                  Verify products before purchase or after delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-id">Product ID / Barcode</Label>
                  <Input
                    id="product-id"
                    placeholder="Enter product ID or scan barcode"
                    value={newVerification.product_id}
                    onChange={(e) => setNewVerification(prev => ({ ...prev, product_id: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Verification Type</Label>
                  <Select 
                    value={newVerification.verification_type} 
                    onValueChange={(value) => setNewVerification(prev => ({ ...prev, verification_type: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre_purchase">Pre-Purchase Check</SelectItem>
                      <SelectItem value="post_delivery">Post-Delivery Verification</SelectItem>
                      <SelectItem value="authenticity">Authenticity Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Upload Product Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop product images
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                </div>

                <Button className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>
              </CardContent>
            </Card>

            {/* Recent Verifications */}
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Verifications</CardTitle>
                <CardDescription>
                  Track the status of your verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {verifications
                      .filter(v => v.requester_type === "consumer")
                      .map((verification) => (
                        <div key={verification.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant={getStatusColor(verification.status) as any}>
                                {getStatusIcon(verification.status)}
                                <span className="ml-1">{verification.status.replace('_', ' ')}</span>
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {verification.product_id}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(verification.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">
                            {verification.verification_type.replace('_', ' ')} verification
                          </p>
                          {verification.requester_type === "consumer" && verification.purchase_details && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Purchased from {verification.purchase_details.seller_name} - ₹{verification.purchase_details.price_paid}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seller" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seller Verification Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="h-5 w-5" />
                  <span>Seller Verification Tools</span>
                </CardTitle>
                <CardDescription>
                  Upload certificates and validate product authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Batch ID</Label>
                  <Input placeholder="Enter batch identifier" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Manufacturing Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Compliance Certificates</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload BIS, FSSAI, or other certificates
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Certificates
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="Number of products in batch" />
                </div>

                <Button className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Submit for Verification
                </Button>
              </CardContent>
            </Card>

            {/* Seller Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Dashboard</CardTitle>
                <CardDescription>
                  Manage your product verifications and certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">156</p>
                      <p className="text-sm text-green-700">Verified Products</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">23</p>
                      <p className="text-sm text-blue-700">Pending Reviews</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Recent Batch Verifications</h4>
                    {verifications
                      .filter(v => v.requester_type === "seller")
                      .map((verification) => (
                        <div key={verification.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">
                              {verification.requester_type === "seller" && verification.batch_details?.batch_id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {verification.requester_type === "seller" && verification.batch_details?.quantity} products
                            </p>
                          </div>
                          <Badge variant={getStatusColor(verification.status) as any}>
                            {verification.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Dispute Resolution Center</span>
              </CardTitle>
              <CardDescription>
                Mediated communication threads for verification disputes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <Card key={dispute.id} className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Dispute #{dispute.id.slice(-3)}
                        </CardTitle>
                        <Badge variant={dispute.status === "open" ? "destructive" : "default"}>
                          {dispute.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Verification: {dispute.verification_id} • 
                        {dispute.messages.length} messages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-48 mb-4">
                        <div className="space-y-3">
                          {dispute.messages.map((message) => (
                            <div key={message.id} className="border rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline">
                                  {message.sender_type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="flex space-x-2">
                        <Input placeholder="Type your response..." className="flex-1" />
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Batch Verification</span>
              </CardTitle>
              <CardDescription>
                High-volume verification capabilities for sellers and distributors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <p>Batch verification tools coming soon</p>
                <p className="text-sm">Upload CSV files for bulk product verification</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}