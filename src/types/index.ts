export interface RiceProduct {
  id: string;
  name: string;
  category: 'basmati' | 'non-basmati';
  subVariants: string[]; // e.g. Steam, Sella / Parboiled, Golden Sella, Raw
  agl: string; // Average Grain Length e.g. "8.35 mm - 8.40 mm"
  elongation: string; // e.g. "Up to 2.5x on cooking"
  moisture: string; // e.g. "Max 12.5%"
  broken: string; // e.g. "Max 1.0%"
  purity: string; // e.g. "95% Min"
  hsCode: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface ExchangeRates {
  usdInr: number;
  eurInr: number;
  usdEur: number;
  lastUpdated: string;
  source: string;
}

export interface CostSheetItem {
  id: string;
  riceVariety: string;
  quantityMT: number;
  // Mill & Internal procurement in INR
  millExWorksRatePerMT: number; // INR per MT
  internalFreightPerMT: number; // Inland trucking to port (Mundra / Nhava Sheva)
  mandiTaxesPerMT: number; // Mandi cess & market fees
  baggingPackingPerMT: number; // PP, Jute, BOPP packaging cost
  // Port & Maritime charges in INR
  chaClearanceCharges: number; // Custom House Agent flat / prorated
  cfsHandlingCharges: number; // Container Freight Station
  fumigationCharges: number; // Aluminum Phosphide / Methyl Bromide
  phytosanitaryCharges: number; // Plant Quarantine & Phytosanitary certificate
  sgsInspectionCharges: number; // Pre-shipment quality inspection
  portLoadingCharges: number; // Terminal handling & port dues
  // Financial & Profit
  profitMarginPercent: number; // Default 10%
}

export interface ExportInvoice {
  id: string;
  type: 'PI' | 'CI'; // Proforma Invoice or Commercial Invoice
  invoiceNumber: string;
  date: string;
  validUntil?: string; // For PI
  blNumber?: string; // For CI
  blDate?: string;
  iecCode: string;
  apedaRcmc: string;
  // Parties
  exporter: {
    name: string;
    address: string;
    country: string;
    pan: string;
    gstin: string;
    email: string;
    phone: string;
    adCode: string;
  };
  consignee: {
    companyName: string;
    buyerName: string;
    address: string;
    country: string;
    taxIdOrVat: string;
    email: string;
    phone: string;
  };
  // Maritime & Logistics
  portOfLoading: string; // e.g. "Mundra Port, Gujarat, India"
  portOfDischarge: string; // e.g. "Jebel Ali, Dubai, UAE"
  finalDestination: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'CIP';
  vesselName: string;
  containerSize: '20ft FCL' | '40ft FCL';
  totalContainers: number;
  packagingType: string; // e.g. "25 Kg Non-Woven BOPP Bags with master sling"
  totalBags: number;
  paymentTerms: string; // e.g. "30% Advance T/T, 70% against BL copy" or "100% Confirmed Irrevocable L/C at Sight"
  // Currency & conversion
  currency: 'USD' | 'EUR';
  exchangeRateApplied: number; // INR to USD/EUR applied rate
  // Items
  costSheet: CostSheetItem;
  // Derived Export Values in Foreign Currency (USD / EUR)
  unitPriceForeign: number; // USD/MT or EUR/MT
  totalFreightForeign?: number; // If CIF
  totalInsuranceForeign?: number; // If CIF
  totalAmountForeign: number;
  totalAmountInWords: string;
  bankDetails: {
    bankName: string;
    branch: string;
    accountNo: string;
    swiftCode: string;
    ibanOrRouting: string;
    adCode: string;
  };
  status: 'Draft' | 'Sent' | 'Approved' | 'Executed';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  riceVariety: string;
  quantityMT: number;
  destinationPort: string;
  packagingPreference: string;
  message: string;
  createdAt: string;
  autoReplySent: boolean;
}

export type SupportedLanguage = 'en' | 'ar' | 'es' | 'fr';
