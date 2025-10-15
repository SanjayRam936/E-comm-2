// Dual-Side Verification Types
export interface VerificationRequest {
  id: string;
  product_id: string;
  requester_type: 'consumer' | 'seller';
  verification_type: 'pre_purchase' | 'post_delivery' | 'authenticity' | 'batch';
  status: 'pending' | 'in_progress' | 'completed' | 'disputed';
  created_at: string;
  updated_at: string;
}

export interface ConsumerVerification extends VerificationRequest {
  requester_type: 'consumer';
  product_images?: File[];
  purchase_details?: {
    seller_name: string;
    purchase_date: string;
    receipt_image?: File;
    price_paid: number;
  };
  delivery_details?: {
    delivery_date: string;
    condition_on_delivery: string;
    packaging_images?: File[];
  };
}

export interface SellerVerification extends VerificationRequest {
  requester_type: 'seller';
  batch_details?: {
    batch_id: string;
    quantity: number;
    manufacturing_date: string;
    expiry_date: string;
  };
  certificates?: {
    type: string;
    file: File;
    issued_by: string;
    valid_until: string;
  }[];
  compliance_documents?: File[];
}

export interface VerificationResult {
  verification_id: string;
  overall_status: 'verified' | 'failed' | 'partial';
  confidence_score: number;
  checks_performed: {
    authenticity: { passed: boolean; details: string };
    compliance: { passed: boolean; details: string };
    quality: { passed: boolean; details: string };
  };
  recommendations: string[];
  dispute_raised?: boolean;
}

export interface DisputeThread {
  id: string;
  verification_id: string;
  participants: {
    consumer_id?: string;
    seller_id?: string;
    mediator_id?: string;
  };
  messages: {
    id: string;
    sender_type: 'consumer' | 'seller' | 'mediator' | 'system';
    content: string;
    timestamp: string;
    attachments?: File[];
  }[];
  status: 'open' | 'resolved' | 'escalated';
  resolution?: {
    outcome: string;
    resolved_by: string;
    resolved_at: string;
  };
}