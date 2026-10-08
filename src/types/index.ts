export type UserRole = 'MAKER' | 'BUYER' | 'SUPPLIER' | 'GOVT_OFFICER';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  identifier: string; // phone or email
  businessName: string;
  location: string;
  avatar: string;
  isVerified: boolean;
  memberSince: string;
}

export type BusinessType = 'GOODS' | 'SERVICES';

export interface Entrepreneur {
  id: string;
  name: string;
  trade: string;
  category: 'Tailoring' | 'Handicrafts' | 'Food & Bakery' | 'Repair & Electronics' | 'Beauty & Care' | 'Tutoring';
  phone: string;
  email?: string;
  location: {
    area: string;
    city: string;
    lat: number;
    lng: number;
    travelRadiusKm: number;
  };
  type: BusinessType;
  machinery: string[];
  workspaceType: string;
  weeklyCapacity: number;
  unitLabel: string;
  currentBookedUnits: number;
  rating: number;
  fulfilledOrders: number;
  onTimeRate: number; // percentage
  verifiedLevel: 'Basic' | 'Equipment-Verified' | 'Master Artisan';
  certifications: string[];
  schemesQualified: string[];
  avatar: string;
  bio: string;
  sampleCatalog: CatalogItem[];
  // Profile & Operational Settings
  experienceYears?: number;
  specializations?: string[];
  workingHoursPerDay?: number;
  workingDaysPerWeek?: number;
  isVacationMode?: boolean;
  vacationReason?: string;
  bankAccountDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    upiId: string;
  };
  podTasks?: PodTask[];
}

export interface PodTask {
  id: string;
  taskTitle: string;
  assignedTo: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  unitPrice: number;
  moq: number;
  leadTimeDays: number;
  isPerishable?: boolean;
  shelfLifeHours?: number;
  description: string;
  image?: string;
  ondcSyndicated: boolean;
}

export interface RFQOrder {
  id: string;
  buyerName: string;
  buyerType: 'School' | 'Corporate' | 'NGO' | 'Event' | 'Retail';
  title: string;
  category: string;
  requiredUnits: number;
  unitLabel: string;
  unitBudget: number;
  totalBudget: number;
  deadlineDays: number;
  deliveryLocation: string;
  status: 'PENDING' | 'MATCHED' | 'ESCROW_FUNDED' | 'PRODUCTION' | 'DELIVERED';
  escrowTotal: number;
  advanceDisbursed: number; // 35%
  consortiumSplit?: ConsortiumSplitMember[];
  sampleStatus?: 'NOT_REQUESTED' | 'SAMPLE_SENT' | 'SAMPLE_APPROVED';
  csrExemptionEligible?: boolean;
  repeatOrderEligible?: boolean;
  sizeDistribution?: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
  staggeredDeliverySchedule?: {
    batchNumber: number;
    units: number;
    targetDate: string;
    isDelivered: boolean;
  }[];
}

export interface ConsortiumSplitMember {
  entrepreneurId: string;
  entrepreneurName: string;
  allocatedUnits: number;
  advanceAmount: number;
  totalPayout: number;
  equipmentMatched: string;
  status: 'INVITED' | 'CONFIRMED' | 'IN_PRODUCTION' | 'COMPLETED';
}

export interface GovernmentScheme {
  id: string;
  code: string;
  title: string;
  ministry: string;
  benefit: string;
  maxAmount: string;
  interestRate?: string;
  eligibleTrades: string[];
  minExperienceYears: number;
  requiredDocs: string[];
  applicationStatus: 'NOT_APPLIED' | 'PRE_FILLED' | 'SUBMITTED' | 'APPROVED';
}

export interface EscrowDispute {
  id: string;
  orderId: string;
  raisedBy: string;
  respondent: string;
  reason: 'DEFECTIVE_RAW_MATERIAL' | 'SPECIFICATION_MISMATCH' | 'DELAYED_INSPECTION' | 'PAYMENT_HOLD';
  description: string;
  amountInDispute: number;
  status: 'OPEN' | 'IN_REVIEW' | 'MEDIATED_RESOLVED';
  suggestedResolution?: string;
  evidenceDocsCount: number;
  createdAt: string;
}

export interface EquipmentRentalListing {
  id: string;
  ownerName: string;
  ownerId: string;
  machineTitle: string;
  hourlyRate: number;
  area: string;
  availableHours: string;
  isAvailableNow: boolean;
}
