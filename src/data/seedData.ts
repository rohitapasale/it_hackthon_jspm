import { Entrepreneur, GovernmentScheme, RFQOrder } from '@/types';

export const SEED_ENTREPRENEURS: Entrepreneur[] = [
  {
    id: 'ent-sunita',
    name: 'Sunita Devi',
    trade: 'Master Tailor & Uniform Maker',
    category: 'Tailoring',
    phone: '+91 98765 43210',
    location: {
      area: 'Rohini Sector 7',
      city: 'Delhi',
      lat: 28.7041,
      lng: 77.1025,
      travelRadiusKm: 8,
    },
    type: 'GOODS',
    machinery: [
      'Industrial Lockstitch Sewing Machine (Juki DDL-8700)',
      '4-Thread Overlock Interlock Machine',
      'Electric Steam Press Iron'
    ],
    workspaceType: 'Dedicated Home Workshop (150 sq.ft)',
    weeklyCapacity: 40,
    unitLabel: 'Uniforms / Garments',
    currentBookedUnits: 10,
    rating: 4.9,
    fulfilledOrders: 142,
    onTimeRate: 98,
    verifiedLevel: 'Equipment-Verified',
    certifications: ['Govt Skill India NSDC Tailoring L4', 'Udyam Registered'],
    schemesQualified: ['PM-VISHWAKARMA', 'MUDRA-SHISHU', 'UDYAM-ASSIST'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    bio: 'Specialist in custom school uniforms, sports kits, and ladies ethnic wear. Equipped with high-speed commercial machines for precision stitch finish.',
    sampleCatalog: [
      {
        id: 'cat-u1',
        title: 'Custom School Uniform Set (Shirt + Trousers/Skirt)',
        category: 'Tailoring',
        unitPrice: 500,
        moq: 5,
        leadTimeDays: 3,
        description: 'Durable poly-cotton blend, reinforced twin stitching, anti-crease fabric.',
        ondcSyndicated: true,
      },
      {
        id: 'cat-u2',
        title: 'Handcrafted Festive Kurti with Zari Piping',
        category: 'Tailoring',
        unitPrice: 750,
        moq: 2,
        leadTimeDays: 4,
        description: 'Pure cotton fabric with hand-embroidered border detailing.',
        ondcSyndicated: true,
      }
    ]
  },
  {
    id: 'ent-priya',
    name: 'Priya Sharma',
    trade: 'Apparel Fabricator & Finisher',
    category: 'Tailoring',
    phone: '+91 98111 22334',
    location: {
      area: 'Pitampura',
      city: 'Delhi',
      lat: 28.6989,
      lng: 77.1384,
      travelRadiusKm: 6,
    },
    type: 'GOODS',
    machinery: [
      'Heavy-duty Zigzag Stitch Machine (Singer 4423)',
      'Fabric Rotary Cutter & Mat',
      'Buttonhole Attachment'
    ],
    workspaceType: 'Home Studio (120 sq.ft)',
    weeklyCapacity: 35,
    unitLabel: 'Uniforms / Garments',
    currentBookedUnits: 5,
    rating: 4.8,
    fulfilledOrders: 98,
    onTimeRate: 96,
    verifiedLevel: 'Equipment-Verified',
    certifications: ['NSDC Apparel Stitcher'],
    schemesQualified: ['PM-VISHWAKARMA', 'MUDRA-SHISHU'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    bio: 'Precision fabric cutting and bulk apparel assembly with rapid turnaround times.',
    sampleCatalog: [
      {
        id: 'cat-p1',
        title: 'Institutional Uniform Blazers & Vests',
        category: 'Tailoring',
        unitPrice: 850,
        moq: 10,
        leadTimeDays: 5,
        description: 'Structured canvas lining with institutional gold/silver buttons.',
        ondcSyndicated: true,
      }
    ]
  },
  {
    id: 'ent-meena',
    name: 'Meena Kumari',
    trade: 'Artisanal Tailor & Embroidery Craftsman',
    category: 'Tailoring',
    phone: '+91 98222 33445',
    location: {
      area: 'Shalimar Bagh',
      city: 'Delhi',
      lat: 28.7180,
      lng: 77.1630,
      travelRadiusKm: 10,
    },
    type: 'GOODS',
    machinery: [
      'Industrial Lockstitch Machine (Jack F4)',
      'Embroidery Frame Setup',
      'Steam Iron'
    ],
    workspaceType: 'Ground Floor Studio (180 sq.ft)',
    weeklyCapacity: 45,
    unitLabel: 'Uniforms / Garments',
    currentBookedUnits: 15,
    rating: 4.95,
    fulfilledOrders: 210,
    onTimeRate: 99,
    verifiedLevel: 'Master Artisan',
    certifications: ['Master Craftsperson Ministry of Textiles', 'Zari & Chikankari Verified'],
    schemesQualified: ['PM-VISHWAKARMA', 'MUDRA-SHISHU', 'UDYAM-ASSIST'],
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80',
    bio: '20+ years of institutional stitching, school badge embroideries, and consortium production leader.',
    sampleCatalog: [
      {
        id: 'cat-m1',
        title: 'Embroidered School Uniform Ties & Monograms',
        category: 'Tailoring',
        unitPrice: 150,
        moq: 50,
        leadTimeDays: 4,
        description: 'Computerized and hand-finished institutional crests.',
        ondcSyndicated: true,
      }
    ]
  },
  {
    id: 'ent-ananya',
    name: 'Ananya Guha',
    trade: 'Artisanal Home Baker & Confectioner',
    category: 'Food & Bakery',
    phone: '+91 98450 11223',
    location: {
      area: 'Dwarka Sector 12',
      city: 'Delhi',
      lat: 28.5921,
      lng: 77.0460,
      travelRadiusKm: 7,
    },
    type: 'GOODS',
    machinery: [
      '60L Commercial Convection Oven',
      'Stand Mixer (KitchenAid 6.9L)',
      'Temperature Controlled Food Storage'
    ],
    workspaceType: 'FSSAI Certified Home Kitchen',
    weeklyCapacity: 200,
    unitLabel: 'Boxes / Hampers',
    currentBookedUnits: 40,
    rating: 4.9,
    fulfilledOrders: 320,
    onTimeRate: 100,
    verifiedLevel: 'Equipment-Verified',
    certifications: ['FSSAI Reg: 23324001928312', 'Food Hygiene Grade A'],
    schemesQualified: ['MUDRA-SHISHU', 'PM-SVANIDHI'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    bio: 'Small-batch artisan cookies, millet crackers, and corporate event gifting. Perishable items delivered fresh within 3 hours.',
    sampleCatalog: [
      {
        id: 'cat-b1',
        title: 'Gourmet Roasted Almond Millet Cookies (Pack of 12)',
        category: 'Food & Bakery',
        unitPrice: 280,
        moq: 10,
        leadTimeDays: 1,
        isPerishable: true,
        shelfLifeHours: 720,
        description: 'Gluten-free, jaggery sweetened, vacuum-sealed biodegradable packaging.',
        ondcSyndicated: true,
      }
    ]
  },
  {
    id: 'ent-rajesh',
    name: 'Rajesh Verma',
    trade: 'Home Appliance & Inverter Technician',
    category: 'Repair & Electronics',
    phone: '+91 98990 77889',
    location: {
      area: 'Janakpuri',
      city: 'Delhi',
      lat: 28.6219,
      lng: 77.0878,
      travelRadiusKm: 5,
    },
    type: 'SERVICES',
    machinery: [
      'Digital Oscilloscope & Multimeter Kit',
      'Micro-Soldering SMD Station',
      'Portable Diagnostic Battery Load Tester'
    ],
    workspaceType: 'Mobile Repair Rig + Basement Bench',
    weeklyCapacity: 25,
    unitLabel: 'Service Slots',
    currentBookedUnits: 8,
    rating: 4.85,
    fulfilledOrders: 430,
    onTimeRate: 97,
    verifiedLevel: 'Equipment-Verified',
    certifications: ['ITI Electronic Mechanic Certified'],
    schemesQualified: ['PM-VISHWAKARMA', 'PM-SVANIDHI'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'On-site doorstep diagnostic and board-level repairs for inverters, microwave ovens, and washing machines within 2 hours.',
    sampleCatalog: [
      {
        id: 'cat-r1',
        title: 'Doorstep Inverter & Battery Health Overhaul',
        category: 'Repair & Electronics',
        unitPrice: 450,
        moq: 1,
        leadTimeDays: 0,
        description: 'Electrolyte gravity check, terminal desulfation, PCB component audit.',
        ondcSyndicated: true,
      }
    ]
  }
];

export const SEED_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-vishwakarma',
    code: 'PM-VISHWAKARMA',
    title: 'PM Vishwakarma Kaushal Samman Yojana',
    ministry: 'Ministry of Micro, Small & Medium Enterprises (MSME)',
    benefit: '₹15,000 Modern Toolkit Incentive + Collateral-Free Credit up to ₹3,00,000 @ 5% Subsidized Interest',
    maxAmount: '₹3,00,000 Loan + ₹15,000 Grant',
    interestRate: '5% p.a.',
    eligibleTrades: ['Tailors (Darzi)', 'Potters (Kumhaar)', 'Cobblers (Charmakar)', 'Carpenters (Suthar)', 'Blacksmiths', 'Doll & Toy Makers'],
    minExperienceYears: 1,
    requiredDocs: ['Aadhaar Card', 'Bank Account Passbook', 'Active Mobile Number', 'Declaration of Traditional Craft'],
    applicationStatus: 'PRE_FILLED'
  },
  {
    id: 'scheme-mudra',
    code: 'MUDRA-SHISHU',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu Category)',
    ministry: 'Department of Financial Services, Ministry of Finance',
    benefit: 'Immediate Working Capital & Machinery Purchase Loans with Zero Collateral & Nil Processing Fee',
    maxAmount: '₹50,000',
    interestRate: '8.4% - 10% p.a.',
    eligibleTrades: ['Home Bakers', 'Tailoring Units', 'Food Vendors', 'Handicraft Artisans', 'Small Repair Shops'],
    minExperienceYears: 0,
    requiredDocs: ['Aadhaar Card', 'Proof of Business Address', 'Verified Platform Order History'],
    applicationStatus: 'PRE_FILLED'
  },
  {
    id: 'scheme-svanidhi',
    code: 'PM-SVANIDHI',
    title: 'PM Street Vendor & Micro-Service AtmaNirbhar Nidhi',
    ministry: 'Ministry of Housing and Urban Affairs',
    benefit: 'Special Micro-Credit Facility with 7% Interest Subsidy on Timely Digital Repayments',
    maxAmount: '₹10,000 - ₹50,000',
    interestRate: '7% Subsidized',
    eligibleTrades: ['Home-based Street Services', 'Repair Mechanics', 'Food & Snack Prep', 'Local Artisans'],
    minExperienceYears: 0,
    requiredDocs: ['Aadhaar Card', 'Vending Certificate or Platform Verification'],
    applicationStatus: 'NOT_APPLIED'
  },
  {
    id: 'scheme-udyam',
    code: 'UDYAM-ASSIST',
    title: 'Udyam Assist Platform (Formalization Certificate)',
    ministry: 'Ministry of MSME',
    benefit: 'Formal Priority Sector Lending (PSL) Status for Informal Micro-Enterprises without GST requirement',
    maxAmount: 'Free Digital Certification',
    eligibleTrades: ['All Home-Based Goods & Service Providers'],
    minExperienceYears: 0,
    requiredDocs: ['Aadhaar linked Mobile'],
    applicationStatus: 'APPROVED'
  }
];

export const INITIAL_B2B_ORDERS: RFQOrder[] = [
  {
    id: 'rfq-greenwood-300',
    buyerName: 'Greenwood International School',
    buyerType: 'School',
    title: 'Annual Student Uniform Procurement (Grade 1 to 5)',
    category: 'Tailoring',
    requiredUnits: 300,
    unitLabel: 'Uniform Sets',
    unitBudget: 500,
    totalBudget: 150000,
    deadlineDays: 14,
    deliveryLocation: 'Rohini Sector 9, Delhi',
    status: 'MATCHED',
    escrowTotal: 150000,
    advanceDisbursed: 52500, // 35%
    consortiumSplit: [
      {
        entrepreneurId: 'ent-sunita',
        entrepreneurName: 'Sunita Devi',
        allocatedUnits: 100,
        advanceAmount: 17500,
        totalPayout: 50000,
        equipmentMatched: 'Juki DDL-8700 Industrial Lockstitch',
        status: 'CONFIRMED'
      },
      {
        entrepreneurId: 'ent-priya',
        entrepreneurName: 'Priya Sharma',
        allocatedUnits: 100,
        advanceAmount: 17500,
        totalPayout: 50000,
        equipmentMatched: 'Singer 4423 Heavy Duty + Rotary Cutter',
        status: 'CONFIRMED'
      },
      {
        entrepreneurId: 'ent-meena',
        entrepreneurName: 'Meena Kumari',
        allocatedUnits: 100,
        advanceAmount: 17500,
        totalPayout: 50000,
        equipmentMatched: 'Jack F4 Lockstitch + Crest Embroidery Frame',
        status: 'CONFIRMED'
      }
    ]
  }
];
