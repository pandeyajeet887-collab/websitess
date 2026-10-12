import React, { useState } from 'react';
import { ExportInvoice, CostSheetItem, ExchangeRates } from '../../types';
import { RICE_PRODUCTS } from '../../data/riceData';
import { Logo } from '../Logo';
import { 
  Calculator, 
  Printer, 
  Eye, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Ship,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';

interface InvoiceEngineProps {
  exchangeRates: ExchangeRates;
  onRefreshRates: () => void;
  savedInvoices: ExportInvoice[];
  onSaveInvoice: (inv: ExportInvoice) => void;
}

export const InvoiceEngine: React.FC<InvoiceEngineProps> = ({
  exchangeRates,
  onRefreshRates,
  savedInvoices,
  onSaveInvoice
}) => {
  // Current Mode: 'cost_calculator' (Internal INR + 10% Profit) OR 'client_invoice' (Pure USD Client Document)
  const [activeTab, setActiveTab] = useState<'calculator' | 'preview'>('calculator');
  const [invoiceType, setInvoiceType] = useState<'PI' | 'CI'>('PI');

  // Form State for Consignee & Shipping
  const [consignee, setConsignee] = useState({
    companyName: 'Al-Mansoor Foodstuffs Trading LLC',
    buyerName: 'Mr. Tariq Al-Hashimi',
    address: 'Warehouse #14, Al Quoz Industrial Area 3, P.O. Box 4892',
    country: 'United Arab Emirates (UAE)',
    taxIdOrVat: 'TRN 100293847500003',
    email: 'import@almansoorfoods.ae',
    phone: '+971 4 338 9922'
  });

  const [shipping, setShipping] = useState({
    portOfLoading: 'Mundra Port (INMUN1), Gujarat, India',
    portOfDischarge: 'Jebel Ali Port (AEJEA), Dubai, UAE',
    finalDestination: 'Dubai, UAE',
    incoterm: 'FOB' as 'FOB' | 'CIF' | 'CFR',
    vesselName: 'MSC BARI / V.2408W',
    containerSize: '20ft FCL' as '20ft FCL' | '40ft FCL',
    packagingType: '25 Kg Non-Woven BOPP Bags with master palletizing',
    paymentTerms: '30% Advance T/T, 70% against Scanned Bill of Lading (B/L)',
    blNumber: 'MSCUIN9082341',
    currency: 'USD' as 'USD' | 'EUR'
  });

  // Internal Cost Sheet State in Indian Rupees (INR)
  const [costSheet, setCostSheet] = useState<CostSheetItem>({
    id: 'CS-01',
    riceVariety: '1121 Basmati Rice (Steam AGL 8.35mm)',
    quantityMT: 26, // 1 Standard 20ft container = 26 Metric Tons
    millExWorksRatePerMT: 92000, // ₹92,000 / MT (approx ₹92/kg mill price)
    internalFreightPerMT: 3200, // Inland trucking from Karnal/Taraori mill to Mundra Port
    mandiTaxesPerMT: 1800, // Market committee cess & loading
    baggingPackingPerMT: 2500, // 25kg BOPP high quality export bags
    // Flat / Pro-rated port charges per container
    chaClearanceCharges: 8500, // Custom House Agent documentation & EDI filing
    cfsHandlingCharges: 14500, // Container Freight Station stuffing & carting
    fumigationCharges: 4500, // Aluminum Phosphide gas fumigation certificate
    phytosanitaryCharges: 3500, // Plant Quarantine Phytosanitary certification
    sgsInspectionCharges: 9000, // Pre-shipment independent inspection
    portLoadingCharges: 7500, // Port terminal handling charges (THC)
    profitMarginPercent: 10.0 // Mandatory 10% Profit Margin Layer
  });

  // Derived Calculations
  const quantity = costSheet.quantityMT > 0 ? costSheet.quantityMT : 1;

  // 1. Variable per-MT costs (in INR)
  const procurementPerMT_INR = 
    costSheet.millExWorksRatePerMT + 
    costSheet.internalFreightPerMT + 
    costSheet.mandiTaxesPerMT + 
    costSheet.baggingPackingPerMT;

  const totalProcurement_INR = procurementPerMT_INR * quantity;

  // 2. Fixed Port & Regulatory charges (in INR)
  const totalPortCharges_INR = 
    costSheet.chaClearanceCharges + 
    costSheet.cfsHandlingCharges + 
    costSheet.fumigationCharges + 
    costSheet.phytosanitaryCharges + 
    costSheet.sgsInspectionCharges + 
    costSheet.portLoadingCharges;

  // 3. Subtotal Base Cost in INR
  const totalBaseCost_INR = totalProcurement_INR + totalPortCharges_INR;

  // 4. Mandatory +10% Profit Margin layer in INR
  const profitMarginAmount_INR = totalBaseCost_INR * (costSheet.profitMarginPercent / 100);

  // 5. Total Exporter Cost with 10% Profit (in INR)
  const totalWithProfit_INR = totalBaseCost_INR + profitMarginAmount_INR;

  // 6. Currency Exchange Rate applied
  const currentFxRate = shipping.currency === 'USD' ? exchangeRates.usdInr : exchangeRates.eurInr;

  // 7. Total in Foreign Currency (USD / EUR)
  const totalForeignAmount = totalWithProfit_INR / currentFxRate;
  const unitRateForeignPerMT = totalForeignAmount / quantity;

  // Bags calculation
  const totalBags = Math.round((quantity * 1000) / 25); // For 25kg bags

  const handlePrint = () => {
    window.print();
  };

  const handleSaveInvoice = () => {
    const invNumber = `${invoiceType}-SAG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newInvoice: ExportInvoice = {
      id: `INV-${Date.now()}`,
      type: invoiceType,
      invoiceNumber: invNumber,
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      blNumber: invoiceType === 'CI' ? shipping.blNumber : undefined,
      iecCode: '0514089921',
      apedaRcmc: 'RCMC/DEL/2026/0942',
      exporter: {
        name: 'S&A Global Agro Exporter',
        address: 'Export Trade Tower, Barakhamba Road, Connaught Place, New Delhi 110001, India',
        country: 'India',
        pan: 'AAACS8920D',
        gstin: '07AAACS8920D1Z4',
        email: 'export@saglobalagro.com',
        phone: '+91 98765 43210',
        adCode: '03400281928'
      },
      consignee: {
        ...consignee
      },
      portOfLoading: shipping.portOfLoading,
      portOfDischarge: shipping.portOfDischarge,
      finalDestination: shipping.finalDestination,
      incoterm: shipping.incoterm,
      vesselName: shipping.vesselName,
      containerSize: shipping.containerSize,
      totalContainers: 1,
      packagingType: shipping.packagingType,
      totalBags: totalBags,
      paymentTerms: shipping.paymentTerms,
      currency: shipping.currency,
      exchangeRateApplied: currentFxRate,
      costSheet: { ...costSheet },
      unitPriceForeign: Number(unitRateForeignPerMT.toFixed(2)),
      totalAmountForeign: Number(totalForeignAmount.toFixed(2)),
      totalAmountInWords: `${Math.round(totalForeignAmount).toLocaleString()} ${shipping.currency} ONLY`,
      bankDetails: {
        bankName: 'State Bank of India (Commercial Overseas Branch)',
        branch: 'Parliament Street, New Delhi',
        accountNo: '394850291048',
        swiftCode: 'SBININBB008',
        ibanOrRouting: 'IN88SBIN0000847291',
        adCode: '03400281928'
      },
      status: 'Draft'
    };

    onSaveInvoice(newInvoice);
    setActiveTab('preview');
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0B1B3D] text-amber-300 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-editorial text-stone-900">
              Export Invoice &amp; Cost Sheet Engine
            </h2>
            <p className="text-xs text-stone-500">
              Mill-to-Port INR cost aggregation + 10% Profit Margin &rarr; Strict USD/EUR Foreign Trade Generation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Document Type Switch */}
          <div className="flex rounded-lg bg-stone-100 p-1 border border-stone-200 text-xs">
            <button
              onClick={() => setInvoiceType('PI')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-all ${
                invoiceType === 'PI'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Proforma Invoice (PI)
            </button>
            <button
              onClick={() => setInvoiceType('CI')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-all ${
                invoiceType === 'CI'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Commercial Invoice (CI)
            </button>
          </div>

          {/* View Tab Switch */}
          <div className="flex rounded-lg bg-stone-100 p-1 border border-stone-200 text-xs">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>1. Internal Cost &amp; Profit (INR)</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'preview'
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>2. Clean Export {invoiceType} (USD Only)</span>
            </button>
          </div>

          {activeTab === 'preview' && (
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold bg-stone-900 hover:bg-black text-white rounded-md flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Forex Live Bar */}
      <div className="bg-gradient-to-r from-[#0B1B3D] via-[#102a5c] to-[#0B1B3D] p-3.5 rounded-lg text-white text-xs flex flex-wrap items-center justify-between gap-3 border border-amber-500/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-300 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Live RBI Reference Forex:
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded font-mono font-bold text-stone-100">
            1 USD = ₹{exchangeRates.usdInr.toFixed(2)}
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded font-mono font-bold text-stone-100">
            1 EUR = ₹{exchangeRates.eurInr.toFixed(2)}
          </span>
          <span className="text-stone-400 text-[11px] hidden md:inline">
            Source: {exchangeRates.source}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshRates}
            className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Sync Live Forex</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERNAL COST SHEET & PROFIT ENGINE (RUPEE BREAKDOWN) */}
      {activeTab === 'calculator' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Exclusion Principle Notice */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">
                EXCLUSION PRINCIPLE IN EFFECT:
              </span>
              <p>
                All local procurement, inland transportation, port handling, and the 10% profit margin are calculated in <strong>Indian Rupees (INR)</strong> on this internal control screen. When generating and issuing the final client-facing <strong>{invoiceType}</strong>, all Rupee notations and internal cost breakdowns are <strong>strictly masked and excluded</strong>, presenting only the clean foreign currency rate (USD/EUR) to the international buyer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Cost Sheet Input Fields */}
            <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
              {/* Product & Quantity Row */}
              <div className="border-b border-stone-200 pb-5">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">1</span>
                  Cargo &amp; Consignment Volume
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Rice Variety For Export
                    </label>
                    <select
                      value={costSheet.riceVariety}
                      onChange={e => setCostSheet({ ...costSheet, riceVariety: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500 bg-stone-50 font-medium"
                    >
                      {RICE_PRODUCTS.map(p => (
                        <option key={p.id} value={`${p.name} (${p.agl})`}>
                          {p.name} - AGL {p.agl} (HS {p.hsCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Quantity (Metric Tons)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={costSheet.quantityMT}
                      onChange={e => setCostSheet({ ...costSheet, quantityMT: Number(e.target.value) })}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500 bg-stone-50 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Mill & Inland Procurement (INR / MT) */}
              <div className="border-b border-stone-200 pb-5">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">2</span>
                  Mill Ex-Works &amp; Domestic Transport Costs (₹ / MT)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mill Ex-Works Purchase Rate (₹ / MT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-stone-400 font-mono text-xs">₹</span>
                      <input
                        type="number"
                        value={costSheet.millExWorksRatePerMT}
                        onChange={e => setCostSheet({ ...costSheet, millExWorksRatePerMT: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm pl-7 pr-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500">Ex-mill gate purchase at Taraori/Karnal</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Inland Trucking to Port (₹ / MT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-stone-400 font-mono text-xs">₹</span>
                      <input
                        type="number"
                        value={costSheet.internalFreightPerMT}
                        onChange={e => setCostSheet({ ...costSheet, internalFreightPerMT: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm pl-7 pr-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500">Dedicated express trailer to Mundra Port</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mandi Cess &amp; Local Fees (₹ / MT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-stone-400 font-mono text-xs">₹</span>
                      <input
                        type="number"
                        value={costSheet.mandiTaxesPerMT}
                        onChange={e => setCostSheet({ ...costSheet, mandiTaxesPerMT: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm pl-7 pr-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Bagging &amp; Packaging Cost (₹ / MT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-stone-400 font-mono text-xs">₹</span>
                      <input
                        type="number"
                        value={costSheet.baggingPackingPerMT}
                        onChange={e => setCostSheet({ ...costSheet, baggingPackingPerMT: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm pl-7 pr-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Port & Regulatory Documentation Charges (₹ Flat) */}
              <div className="border-b border-stone-200 pb-5">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">3</span>
                  Maritime Port &amp; Clearance Charges (₹ Total per Lot)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      CHA Customs Clearance (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.chaClearanceCharges}
                      onChange={e => setCostSheet({ ...costSheet, chaClearanceCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      CFS Terminal Handling (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.cfsHandlingCharges}
                      onChange={e => setCostSheet({ ...costSheet, cfsHandlingCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Fumigation Certificate (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.fumigationCharges}
                      onChange={e => setCostSheet({ ...costSheet, fumigationCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phytosanitary Cert (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.phytosanitaryCharges}
                      onChange={e => setCostSheet({ ...costSheet, phytosanitaryCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      SGS Quality Inspection (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.sgsInspectionCharges}
                      onChange={e => setCostSheet({ ...costSheet, sgsInspectionCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Port Terminal Dues (₹)
                    </label>
                    <input
                      type="number"
                      value={costSheet.portLoadingCharges}
                      onChange={e => setCostSheet({ ...costSheet, portLoadingCharges: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Profit Margin Layer */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
                  Mandatory Profit Margin Layer
                </h3>

                <div className="flex items-center gap-4 bg-emerald-50/70 p-4 rounded-lg border border-emerald-200">
                  <div className="w-1/3">
                    <label className="block text-xs font-bold text-emerald-900 mb-1">
                      Profit Percentage (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={costSheet.profitMarginPercent}
                        onChange={e => setCostSheet({ ...costSheet, profitMarginPercent: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-emerald-300 rounded-md font-mono font-bold bg-white text-emerald-900"
                      />
                    </div>
                  </div>

                  <div className="w-2/3 text-xs text-emerald-800">
                    <div className="font-semibold">Cumulative Net Profit in INR:</div>
                    <div className="text-base font-bold font-mono text-emerald-950 mt-0.5">
                      + ₹{Math.round(profitMarginAmount_INR).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-emerald-700">Calculated on all procurement, freight, and port handling.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Calculation Summary Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0B1B3D] text-white p-6 rounded-xl border border-amber-500/30 shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                  <span className="font-bold font-cinzel text-amber-300 text-sm tracking-wide">
                    COST AGGREGATION &amp; FOREX
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    INTERNAL
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>Quantity:</span>
                    <span className="font-mono text-stone-100 font-bold">{quantity} MT (1 x 20ft FCL)</span>
                  </div>
                  <div className="flex justify-between text-stone-300">
                    <span>Base Mill &amp; Freight:</span>
                    <span className="font-mono">₹{Math.round(totalProcurement_INR).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-300">
                    <span>Port &amp; Certifications:</span>
                    <span className="font-mono">₹{Math.round(totalPortCharges_INR).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-amber-300 pt-2 border-t border-stone-700 font-semibold">
                    <span>10% Exporter Profit:</span>
                    <span className="font-mono">+ ₹{Math.round(profitMarginAmount_INR).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-white text-sm font-bold pt-2 border-t border-stone-700">
                    <span>Total Exporter INR:</span>
                    <span className="font-mono text-amber-400">
                      ₹{Math.round(totalWithProfit_INR).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* International Conversion Card */}
                <div className="bg-white/10 p-4 rounded-lg border border-amber-400/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">Export Currency Target:</span>
                    <select
                      value={shipping.currency}
                      onChange={e => setShipping({ ...shipping, currency: e.target.value as 'USD' | 'EUR' })}
                      className="bg-stone-900 text-amber-300 text-xs px-2.5 py-1 rounded border border-amber-400 font-bold"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>

                  <div className="text-[11px] text-stone-300">
                    Conversion Rate: 1 {shipping.currency} = ₹{currentFxRate.toFixed(2)}
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="text-xs text-stone-300">Derived FOB Rate Per MT:</div>
                    <div className="text-2xl font-bold font-mono text-amber-400">
                      {shipping.currency === 'USD' ? '$' : '€'} {unitRateForeignPerMT.toFixed(2)} / MT
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-300">Total Consignment Value:</div>
                    <div className="text-lg font-bold font-mono text-white">
                      {shipping.currency === 'USD' ? '$' : '€'} {totalForeignAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveInvoice}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs rounded-md shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Generate Clean Export {invoiceType}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Consignee Quick Edit */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 text-xs space-y-3">
                <div className="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center justify-between">
                  <span>Buyer / Consignee Details</span>
                  <span className="text-[11px] text-amber-700 font-normal">Included in PI/CI</span>
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block">Buyer Firm Name</label>
                  <input
                    type="text"
                    value={consignee.companyName}
                    onChange={e => setConsignee({ ...consignee, companyName: e.target.value })}
                    className="w-full px-2 py-1.5 border border-stone-300 rounded text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block">Destination Port</label>
                  <input
                    type="text"
                    value={shipping.portOfDischarge}
                    onChange={e => setShipping({ ...shipping, portOfDischarge: e.target.value })}
                    className="w-full px-2 py-1.5 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLEAN EXPORT PROFORMA INVOICE / COMMERCIAL INVOICE (STRICT USD, RUPEES COMPLETELY EXCLUDED) */}
      {activeTab === 'preview' && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-md max-w-4xl mx-auto printable-document">
          {/* Header of Printable Export Document */}
          <div className="border-b-2 border-stone-900 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <Logo variant="light" showSubtitle={true} />
                <div className="text-xs text-stone-600 mt-3 leading-relaxed">
                  <div className="font-bold text-stone-900 text-sm">S&amp;A GLOBAL AGRO EXPORTER</div>
                  <div>Export Trade Tower, Barakhamba Road, Connaught Place</div>
                  <div>New Delhi - 110001, India | Phone: +91 98765 43210</div>
                  <div>Email: export@saglobalagro.com | Web: www.saglobalagro.com</div>
                </div>
              </div>

              <div className="text-right sm:self-start">
                <div className="inline-block bg-[#0B1B3D] text-amber-300 px-4 py-1.5 rounded text-sm font-bold tracking-widest font-cinzel">
                  {invoiceType === 'PI' ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE'}
                </div>
                <div className="text-xs text-stone-700 mt-2 space-y-0.5 font-mono">
                  <div><strong>Doc No:</strong> {invoiceType}-SAG-2026-084</div>
                  <div><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</div>
                  {invoiceType === 'PI' ? (
                    <div><strong>Validity:</strong> 15 Days From Issue</div>
                  ) : (
                    <div><strong>B/L No:</strong> {shipping.blNumber}</div>
                  )}
                  <div><strong>IEC Code:</strong> 0514089921</div>
                  <div><strong>APEDA RCMC:</strong> RCMC/DEL/2026/0942</div>
                </div>
              </div>
            </div>
          </div>

          {/* Consignee & Shipping Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-stone-300 rounded-lg p-4 mb-6 text-xs">
            {/* Buyer Details */}
            <div className="space-y-1">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1 mb-1.5">
                CONSIGNEE / BUYER:
              </div>
              <div className="font-bold text-stone-900 text-sm">{consignee.companyName}</div>
              <div className="text-stone-700">{consignee.address}</div>
              <div className="text-stone-700 font-semibold">{consignee.country}</div>
              <div className="text-stone-600">Tax / VAT ID: {consignee.taxIdOrVat}</div>
              <div className="text-stone-600">Attn: {consignee.buyerName} ({consignee.phone})</div>
            </div>

            {/* Maritime Specs */}
            <div className="space-y-1">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1 mb-1.5">
                PORT &amp; MARITIME LOGISTICS:
              </div>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-stone-500">Port of Loading:</span>
                <span className="font-semibold text-stone-900">{shipping.portOfLoading}</span>
                
                <span className="text-stone-500">Port of Discharge:</span>
                <span className="font-semibold text-stone-900">{shipping.portOfDischarge}</span>

                <span className="text-stone-500">Incoterm:</span>
                <span className="font-bold text-amber-800">{shipping.incoterm} (Incoterms 2020)</span>

                <span className="text-stone-500">Container Size:</span>
                <span className="text-stone-900">1 x {shipping.containerSize} (FCL)</span>

                <span className="text-stone-500">Vessel / Flight No:</span>
                <span className="text-stone-900 font-mono">{shipping.vesselName}</span>

                <span className="text-stone-500">Payment Terms:</span>
                <span className="text-stone-900 font-medium">{shipping.paymentTerms}</span>
              </div>
            </div>
          </div>

          {/* ITEM ROW TABLE (PURE USD/EUR VALUES, ZERO RUPEE MENTIONS) */}
          <div className="border border-stone-300 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0B1B3D] text-amber-300 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Sr.</th>
                  <th className="py-2.5 px-3">Description of Goods</th>
                  <th className="py-2.5 px-3">HS Code</th>
                  <th className="py-2.5 px-3 text-right">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate ({shipping.currency}/MT)</th>
                  <th className="py-2.5 px-3 text-right">Total Amount ({shipping.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr>
                  <td className="py-3 px-3 font-mono">01</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-900">{costSheet.riceVariety}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Packaging: {shipping.packagingType} ({totalBags.toLocaleString()} Bags)
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Standard Quality: Crop Year 2025-26, 100% Sortexed, Fumigated, SGS Inspected.
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-600">
                    {costSheet.riceVariety.toLowerCase().includes('basmati') ? '10063020' : '10063090'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    {quantity.toFixed(2)} MT
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">
                    {shipping.currency === 'USD' ? '$' : '€'} {unitRateForeignPerMT.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-stone-950">
                    {shipping.currency === 'USD' ? '$' : '€'} {totalForeignAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-stone-100 font-bold border-t-2 border-stone-300">
                <tr>
                  <td colSpan={4} className="py-3 px-3 text-stone-900">
                    TOTAL FOB NET VALUE ({shipping.currency}):
                  </td>
                  <td colSpan={2} className="py-3 px-3 text-right font-mono text-base text-[#0B1B3D]">
                    {shipping.currency === 'USD' ? '$' : '€'} {totalForeignAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount in Words */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs mb-6">
            <span className="font-semibold text-stone-600">AMOUNT CHARGEABLE (IN WORDS): </span>
            <span className="font-bold font-mono text-stone-900 uppercase">
              US DOLLARS {Math.round(totalForeignAmount).toLocaleString()} ONLY
            </span>
          </div>

          {/* Banking Wire Details & Signature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-300 text-xs">
            {/* Bank Wire Details */}
            <div className="space-y-1 bg-stone-50 p-3.5 rounded border border-stone-200">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                BANK WIRE REMITTANCE DETAILS:
              </div>
              <div><strong>Beneficiary:</strong> S&amp;A GLOBAL AGRO EXPORTER</div>
              <div><strong>Bank:</strong> State Bank of India (Overseas Branch)</div>
              <div><strong>Account No:</strong> 394850291048</div>
              <div><strong>SWIFT / BIC Code:</strong> SBININBB008</div>
              <div><strong>AD Code:</strong> 03400281928</div>
              <div><strong>Branch:</strong> Parliament Street, New Delhi - 110001</div>
            </div>

            {/* Signature & Seal */}
            <div className="flex flex-col justify-between items-end text-right">
              <div className="text-stone-700">
                For <strong>S&amp;A GLOBAL AGRO EXPORTER</strong>
              </div>

              <div className="pt-10 text-center">
                <div className="w-40 border-b border-stone-400 mb-1"></div>
                <div className="font-bold text-stone-900">Authorized Signatory</div>
                <div className="text-[10px] text-stone-500">Directorate of International Trade</div>
              </div>
            </div>
          </div>

          {/* Bottom Clean Print Note */}
          <div className="mt-8 pt-4 border-t border-stone-200 text-[10px] text-stone-400 text-center">
            This is a computer generated official export transaction document conforming to UN Layout Key &amp; INCOTERMS 2020.
          </div>
        </div>
      )}
    </div>
  );
};
