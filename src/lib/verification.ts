// Dual-Side Verification Library
import type { 
  VerificationRequest, 
  VerificationResult, 
  ConsumerVerification, 
  SellerVerification,
  DisputeThread 
} from "@/types/verification";

export async function submitVerificationRequest(
  request: Partial<VerificationRequest>
): Promise<{ verification_id: string; status: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const verification_id = `ver_${Date.now()}`;
  
  return {
    verification_id,
    status: "pending"
  };
}

export async function getVerificationStatus(
  verification_id: string
): Promise<VerificationResult> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock verification result
  return {
    verification_id,
    overall_status: "verified",
    confidence_score: 92,
    checks_performed: {
      authenticity: { 
        passed: true, 
        details: "Product matches authentic database records" 
      },
      compliance: { 
        passed: true, 
        details: "All legal metrology requirements met" 
      },
      quality: { 
        passed: true, 
        details: "Quality standards verified through certificates" 
      }
    },
    recommendations: [
      "Product appears authentic and compliant",
      "Monitor for any post-delivery issues",
      "Report any discrepancies immediately"
    ]
  };
}

export function validateConsumerSubmission(data: Partial<ConsumerVerification>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!data.product_id) {
    errors.push("Product ID is required");
  }
  
  if (!data.verification_type) {
    errors.push("Verification type must be selected");
  }
  
  if (data.verification_type === "post_delivery" && !data.delivery_details) {
    errors.push("Delivery details are required for post-delivery verification");
  }
  
  if (data.verification_type === "pre_purchase" && !data.purchase_details?.seller_name) {
    errors.push("Seller information is required for pre-purchase verification");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateSellerSubmission(data: Partial<SellerVerification>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!data.product_id) {
    errors.push("Product ID is required");
  }
  
  if (data.verification_type === "batch" && !data.batch_details) {
    errors.push("Batch details are required for batch verification");
  }
  
  if (data.verification_type === "batch" && data.batch_details) {
    if (!data.batch_details.batch_id) {
      errors.push("Batch ID is required");
    }
    if (!data.batch_details.quantity || data.batch_details.quantity <= 0) {
      errors.push("Valid quantity is required");
    }
    if (!data.batch_details.manufacturing_date) {
      errors.push("Manufacturing date is required");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function uploadDocument(file: File, type: "certificate" | "image" | "receipt"): Promise<{
  url: string;
  filename: string;
}> {
  // Simulate file upload
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    url: `https://storage.example.com/${type}s/${Date.now()}_${file.name}`,
    filename: file.name
  };
}

export function generateVerificationReport(result: VerificationResult): {
  summary: string;
  riskLevel: "low" | "medium" | "high";
  nextActions: string[];
} {
  const { overall_status, confidence_score, checks_performed } = result;
  
  let riskLevel: "low" | "medium" | "high" = "low";
  if (overall_status === "failed") riskLevel = "high";
  else if (confidence_score < 70) riskLevel = "medium";
  
  const passedChecks = Object.values(checks_performed).filter(check => check.passed).length;
  const totalChecks = Object.keys(checks_performed).length;
  
  const summary = `Verification completed with ${confidence_score}% confidence. ${passedChecks}/${totalChecks} checks passed.`;
  
  const nextActions: string[] = [];
  if (riskLevel === "high") {
    nextActions.push("Immediate review required");
    nextActions.push("Contact seller for clarification");
    nextActions.push("Consider dispute resolution");
  } else if (riskLevel === "medium") {
    nextActions.push("Monitor product closely");
    nextActions.push("Verify additional documentation");
  } else {
    nextActions.push("Product cleared for use/sale");
    nextActions.push("Maintain documentation for records");
  }
  
  return { summary, riskLevel, nextActions };
}

export async function initiateDispute(
  verification_id: string,
  reason: string,
  evidence?: File[]
): Promise<{ dispute_id: string; thread_id: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const dispute_id = `dispute_${Date.now()}`;
  const thread_id = `thread_${Date.now()}`;
  
  return { dispute_id, thread_id };
}

export async function addDisputeMessage(
  thread_id: string,
  message: string,
  sender_type: "consumer" | "seller" | "mediator",
  attachments?: File[]
): Promise<{ message_id: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { message_id: `msg_${Date.now()}` };
}

export function calculateTrustScore(verificationHistory: VerificationResult[]): {
  score: number;
  level: "excellent" | "good" | "fair" | "poor";
  factors: { factor: string; weight: number; score: number }[];
} {
  if (verificationHistory.length === 0) {
    return { score: 50, level: "fair", factors: [] };
  }
  
  const factors = [
    {
      factor: "Verification Success Rate",
      weight: 0.4,
      score: (verificationHistory.filter(v => v.overall_status === "verified").length / verificationHistory.length) * 100
    },
    {
      factor: "Average Confidence Score",
      weight: 0.3,
      score: verificationHistory.reduce((acc, v) => acc + v.confidence_score, 0) / verificationHistory.length
    },
    {
      factor: "Dispute Resolution",
      weight: 0.2,
      score: (verificationHistory.filter(v => !v.dispute_raised).length / verificationHistory.length) * 100
    },
    {
      factor: "Documentation Quality",
      weight: 0.1,
      score: 85 // Mock score based on document completeness
    }
  ];
  
  const totalScore = factors.reduce((acc, factor) => acc + (factor.score * factor.weight), 0);
  
  let level: "excellent" | "good" | "fair" | "poor" = "poor";
  if (totalScore >= 90) level = "excellent";
  else if (totalScore >= 75) level = "good";
  else if (totalScore >= 60) level = "fair";
  
  return { score: Math.round(totalScore), level, factors };
}