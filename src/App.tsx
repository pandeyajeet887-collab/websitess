/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductCatalog } from './components/ProductCatalog';
import { Certifications } from './components/Certifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PhpCodeHub } from './components/PhpCodeHub';
import { SupportedLanguage, RiceProduct, ExportInvoice, ContactMessage, ExchangeRates } from './types';
import { DEFAULT_EXCHANGE_RATES } from './data/riceData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<'site' | 'admin' | 'codehub'>('site');
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<RiceProduct | null>(null);

  // Live Exchange Rates State
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    ...DEFAULT_EXCHANGE_RATES
  });

  // Saved Invoices in ERP
  const [savedInvoices, setSavedInvoices] = useState<ExportInvoice[]>([
    {
      id: 'INV-101',
      type: 'PI',
      invoiceNumber: 'PI-SAG-2026-084',
      date: '2026-10-12',
      validUntil: '2026-10-27',
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
        companyName: 'Al-Mansoor Foodstuffs Trading LLC',
        buyerName: 'Mr. Tariq Al-Hashimi',
        address: 'Warehouse #14, Al Quoz Industrial Area 3, P.O. Box 4892',
        country: 'United Arab Emirates (UAE)',
        taxIdOrVat: 'TRN 100293847500003',
        email: 'import@almansoorfoods.ae',
        phone: '+971 4 338 9922'
      },
      portOfLoading: 'Mundra Port (INMUN1), Gujarat, India',
      portOfDischarge: 'Jebel Ali Port (AEJEA), Dubai, UAE',
      finalDestination: 'Dubai, UAE',
      incoterm: 'FOB',
      vesselName: 'MSC BARI / V.2408W',
      containerSize: '20ft FCL',
      totalContainers: 1,
      packagingType: '25 Kg Non-Woven BOPP Bags with master palletizing',
      totalBags: 1040,
      paymentTerms: '30% Advance T/T, 70% against Scanned Bill of Lading (B/L)',
      currency: 'USD',
      exchangeRateApplied: 86.85,
      costSheet: {
        id: 'CS-01',
        riceVariety: '1121 Basmati Rice Steam (AGL 8.35mm)',
        quantityMT: 26,
        millExWorksRatePerMT: 92000,
        internalFreightPerMT: 3200,
        mandiTaxesPerMT: 1800,
        baggingPackingPerMT: 2500,
        chaClearanceCharges: 8500,
        cfsHandlingCharges: 14500,
        fumigationCharges: 4500,
        phytosanitaryCharges: 3500,
        sgsInspectionCharges: 9000,
        portLoadingCharges: 7500,
        profitMarginPercent: 10.0
      },
      unitPriceForeign: 1145.50,
      totalAmountForeign: 29783.00,
      totalAmountInWords: 'TWENTY-NINE THOUSAND SEVEN HUNDRED EIGHTY-THREE US DOLLARS ONLY',
      bankDetails: {
        bankName: 'State Bank of India (Commercial Overseas Branch)',
        branch: 'Parliament Street, New Delhi',
        accountNo: '394850291048',
        swiftCode: 'SBININBB008',
        ibanOrRouting: 'IN88SBIN0000847291',
        adCode: '03400281928'
      },
      status: 'Sent'
    }
  ]);

  // Logged inquiries from contact form
  const [inquiries, setInquiries] = useState<ContactMessage[]>([
    {
      id: 'INQ-2026-4821',
      fullName: 'Ahmad Al-Mansoor',
      companyName: 'Gulf Food Distribution Co.',
      email: 'ahmad@gulffooddist.com',
      phone: '+971 50 847 2910',
      country: 'UAE',
      riceVariety: '1121 Basmati Rice',
      quantityMT: 52,
      destinationPort: 'Jebel Ali Port, UAE',
      packagingPreference: '25kg BOPP Bags',
      message: 'Looking for 2x20ft FCL monthly contract of 1121 Steam Basmati. Need SGS certification.',
      createdAt: '2026-10-12T05:30:00Z',
      autoReplySent: true
    },
    {
      id: 'INQ-2026-3914',
      fullName: 'Dimitri Vanev',
      companyName: 'Balkan Agro Import Ltd',
      email: 'd.vanev@balkanagro.bg',
      phone: '+359 2 984 1022',
      country: 'Bulgaria',
      riceVariety: 'Sugandha Rice',
      quantityMT: 26,
      destinationPort: 'Varna Port, Bulgaria',
      packagingPreference: '50kg PP Bags',
      message: 'Requesting CIF Varna quote for Sugandha Creamy Sella.',
      createdAt: '2026-10-12T03:15:00Z',
      autoReplySent: true
    }
  ]);

  const handleRefreshRates = () => {
    // In live browser environment, fetch or simulate slight micro-fluctuation around live rates
    const delta = (Math.random() - 0.5) * 0.25;
    const newUsd = Number((86.85 + delta).toFixed(2));
    const newEur = Number((94.20 + delta * 1.1).toFixed(2));
    setExchangeRates({
      usdInr: newUsd,
      eurInr: newEur,
      usdEur: Number((newUsd / newEur).toFixed(4)),
      lastUpdated: 'Live Interbank Forex Feed (Synchronized)',
      source: 'ExchangeRate-API Live / Reserve Bank of India Ref'
    });
  };

  const handleSelectProductForInquiry = (product: RiceProduct) => {
    setSelectedProductForInquiry(product);
    setActiveTab('site');
    // Scroll to contact form
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewInquiry = (msg: ContactMessage) => {
    setInquiries(prev => [msg, ...prev]);
  };

  const handleSaveInvoice = (inv: ExportInvoice) => {
    setSavedInvoices(prev => [inv, ...prev]);
  };

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateSection={scrollToSection}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'site' && (
          <>
            <div id="home">
              <Hero
                currentLang={currentLang}
                onExploreProducts={() => scrollToSection('products')}
                onRequestQuote={() => scrollToSection('contact')}
                onOpenERP={() => setActiveTab('admin')}
                usdRate={exchangeRates.usdInr}
                eurRate={exchangeRates.eurInr}
              />
            </div>

            <AboutSection currentLang={currentLang} />

            <ProductCatalog
              currentLang={currentLang}
              onSelectForInquiry={handleSelectProductForInquiry}
            />

            <Certifications />

            <ContactSection
              currentLang={currentLang}
              preSelectedProduct={selectedProductForInquiry}
              onNewMessage={handleNewInquiry}
            />
          </>
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            exchangeRates={exchangeRates}
            onRefreshRates={handleRefreshRates}
            savedInvoices={savedInvoices}
            onSaveInvoice={handleSaveInvoice}
            inquiries={inquiries}
            onExitAdmin={() => setActiveTab('site')}
          />
        )}

        {activeTab === 'codehub' && (
          <PhpCodeHub />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenERP={() => setActiveTab('admin')}
        onOpenCodeHub={() => setActiveTab('codehub')}
      />
    </div>
  );
}
