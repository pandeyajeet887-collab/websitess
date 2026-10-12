import React, { useState } from 'react';
import { RiceProduct, ContactMessage, SupportedLanguage } from '../types';
import { RICE_PRODUCTS } from '../data/riceData';
import { TRANSLATIONS } from '../data/translations';
import { Send, CheckCircle, Mail, Phone, MapPin, Building2, Globe, Clock, Sparkles, Copy, X } from 'lucide-react';

interface ContactSectionProps {
  currentLang: SupportedLanguage;
  preSelectedProduct?: RiceProduct | null;
  onNewMessage: (msg: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  preSelectedProduct,
  onNewMessage
}) => {
  const t = TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    riceVariety: preSelectedProduct ? preSelectedProduct.name : '1121 Basmati Rice',
    quantityMT: 26,
    destinationPort: 'Jebel Ali Port, UAE',
    packagingPreference: '25kg Non-Woven BOPP Bags',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoReplyModal, setAutoReplyModal] = useState<ContactMessage | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Update variety if preSelectedProduct changes
  React.useEffect(() => {
    if (preSelectedProduct) {
      setFormData(prev => ({
        ...prev,
        riceVariety: preSelectedProduct.name
      }));
    }
  }, [preSelectedProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate AJAX transmission & database insert
    setTimeout(() => {
      const newInquiry: ContactMessage = {
        id: `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        createdAt: new Date().toISOString(),
        autoReplySent: true
      };

      onNewMessage(newInquiry);
      setIsSubmitting(false);
      setAutoReplyModal(newInquiry);

      // Reset form
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        country: '',
        riceVariety: '1121 Basmati Rice',
        quantityMT: 26,
        destinationPort: 'Jebel Ali Port, UAE',
        packagingPreference: '25kg Non-Woven BOPP Bags',
        message: ''
      });
    }, 600);
  };

  const getAutoReplyHtml = (msg: ContactMessage) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1f2937; }
    .email-card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; }
    .header { background-color: #0b1b3d; padding: 24px; text-align: center; border-bottom: 3px solid #d4af37; }
    .brand-title { color: #d4af37; font-size: 22px; font-weight: bold; margin: 0; letter-spacing: 1px; }
    .brand-sub { color: #ffffff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
    .body { padding: 30px; font-size: 14px; line-height: 1.6; }
    .inquiry-box { background-color: #faf8f5; border: 1px solid #e2d9cc; border-radius: 6px; padding: 16px; margin: 20px 0; }
    .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .badge { display: inline-block; background: #0b1b3d; color: #d4af37; padding: 3px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="email-card">
    <div class="header">
      <div class="brand-title">S&amp;A GLOBAL AGRO EXPORTER</div>
      <div class="brand-sub">Premium Indian Basmati &amp; Non-Basmati Rice Exporters</div>
    </div>
    <div class="body">
      <p>Dear <strong>${msg.fullName || 'Valued Buyer'}</strong>,</p>
      <p>Thank you for submitting your export trade inquiry to <strong>S&amp;A Global Agro Exporter</strong>.</p>
      <p>Our international trading desk has successfully logged your request under reference tracking number <span class="badge">${msg.id}</span>. Our export sales manager will prepare and send a formal Proforma Quotation with CIF / FOB vessel schedule to your email within <strong>24 business hours</strong>.</p>
      
      <div class="inquiry-box">
        <h4 style="margin: 0 0 10px 0; color: #0b1b3d; font-size: 13px;">INQUIRY SUMMARY DETAILS:</h4>
        <table style="width: 100%; font-size: 13px;">
          <tr><td style="color: #6b7280; width: 40%;">Rice Variety:</td><td><strong>${msg.riceVariety}</strong></td></tr>
          <tr><td style="color: #6b7280;">Quantity Requested:</td><td><strong>${msg.quantityMT} Metric Tons</strong></td></tr>
          <tr><td style="color: #6b7280;">Destination Discharge Port:</td><td><strong>${msg.destinationPort}</strong></td></tr>
          <tr><td style="color: #6b7280;">Packaging:</td><td><strong>${msg.packagingPreference}</strong></td></tr>
        </table>
      </div>

      <p>In the meantime, feel free to contact our senior export desk directly via WhatsApp at <strong>+91 98765 43210</strong> or email <strong>trade@saglobalagro.com</strong>.</p>
      <p style="margin-top: 24px;">Sincerely,<br><strong>Directorate of International Trade</strong><br>S&amp;A Global Agro Exporter<br>APEDA Registration: RCMC/DEL/2026/0942</p>
    </div>
    <div class="footer">
      Corporate Office: Export Trade Tower, Barakhamba Road, New Delhi 110001, India<br>
      Mills: Taraori, Karnal (Haryana) &amp; Port CFS at Mundra Port, Gujarat<br>
      &copy; 2026 S&amp;A Global Agro Exporter. All Rights Reserved.
    </div>
  </div>
</body>
</html>`;
  };

  const copyEmailHtmlToClipboard = () => {
    if (!autoReplyModal) return;
    navigator.clipboard.writeText(getAutoReplyHtml(autoReplyModal));
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 tracking-wider uppercase mb-3">
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            Global Export Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
            {t.contactHeadline}
          </h2>
          <p className="mt-3 text-base text-stone-600">
            {t.contactSubhead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <h3 className="text-lg font-bold font-editorial text-stone-900">
                Official Export RFQ (Request For Quotation)
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                ⚡ Auto-Reply Enabled
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Miller"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Company / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Farooq General Trading LLC"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="purchasing@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Select Rice Variety *
                  </label>
                  <select
                    value={formData.riceVariety}
                    onChange={e => setFormData({ ...formData, riceVariety: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  >
                    {RICE_PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.agl})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Order Quantity (Metric Tons) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="26 (1 Container = 26 MT)"
                    value={formData.quantityMT}
                    onChange={e => setFormData({ ...formData, quantityMT: Number(e.target.value) })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Destination Discharge Port *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jebel Ali, Rotterdam, Houston"
                    value={formData.destinationPort}
                    onChange={e => setFormData({ ...formData, destinationPort: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Packaging Specification
                  </label>
                  <select
                    value={formData.packagingPreference}
                    onChange={e => setFormData({ ...formData, packagingPreference: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                  >
                    <option value="25kg Non-Woven BOPP Bags">25kg Non-Woven BOPP Bags</option>
                    <option value="50kg Polypropylene (PP) Bags">50kg Polypropylene (PP) Bags</option>
                    <option value="10kg Master Carton Packing">10kg Master Carton Packing</option>
                    <option value="5kg Consumer Pouch (Pack of 4)">5kg Consumer Pouch (Pack of 4)</option>
                    <option value="Custom Private Label OEM">Custom Private Label OEM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Additional Quality Specifications / Tender Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify moisture tolerance, broken % limits, inspection agency (SGS, Bureau Veritas), or payment preference (LC at sight, CAD, T/T)..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-[#0B1B3D] hover:bg-[#122b5e] text-amber-300 font-semibold text-sm rounded-md shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Inquiry &amp; Dispatching Auto-Reply...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>{t.sendInquiry}</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  {t.autoReplyNotice}
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Details & Office Addresses */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1B3D] text-white p-6 sm:p-7 rounded-xl border border-amber-500/30 shadow-lg space-y-6">
              <h3 className="text-xl font-bold font-editorial text-amber-300">
                S&amp;A Global Agro Exporter
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Direct procurement from 50,000+ acres of contract farming in Karnal, Kurukshetra, and Kaithal with containerized shipping to ports worldwide.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-100 block">Head Office:</span>
                    <span className="text-stone-300">
                      Export Trade Tower, 8th Floor, Barakhamba Road, Connaught Place, New Delhi 110001, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-100 block">Integrated Milling Plants:</span>
                    <span className="text-stone-300">
                      G.T. Karnal Road, Taraori, District Karnal, Haryana 132116, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-100 block">International Trade Desk:</span>
                    <span className="text-stone-300 font-mono">+91 98765 43210 / +91 11 4567 8900</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-100 block">Export Email:</span>
                    <span className="text-stone-300 font-mono">info@saglobalagro.com / export@saglobalagro.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-100 block">Working Hours:</span>
                    <span className="text-stone-300">Mon - Sat: 09:00 - 18:30 IST (24/7 Port Logistics Ops)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maritime Port Readiness Card */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Standard Trade Settlement Terms:</span>
              </div>
              <ul className="list-disc pl-5 text-stone-600 space-y-1 text-[11px]">
                <li>Irrevocable 100% Letter of Credit (L/C) at sight from Prime Bank.</li>
                <li>30% T/T Advance, balance 70% against soft copy of Bill of Lading (B/L).</li>
                <li>Cash Against Documents (CAD) for established corporate importers.</li>
                <li>Currency accepted: USD ($) &amp; EUR (€).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Reply Email Dispatch Simulator Modal */}
      {autoReplyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl">
            {/* Modal Header */}
            <div className="bg-emerald-700 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-6 h-6 text-emerald-200" />
                <div>
                  <h3 className="font-bold text-base text-white">
                    Inquiry Received &amp; Auto-Reply Email Dispatched!
                  </h3>
                  <p className="text-xs text-emerald-100">
                    AJAX status 200 OK · MySQL Record Created · Dispatched from info@saglobalagro.com
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAutoReplyModal(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Email Preview */}
            <div className="p-6 bg-stone-50">
              <div className="text-xs text-stone-500 mb-2 flex items-center justify-between">
                <span>Buyer Received View (HTML Email Rendering):</span>
                <span className="font-mono text-emerald-700 font-bold">From: info@saglobalagro.com</span>
              </div>

              {/* Rendered HTML Container */}
              <div
                className="border border-stone-300 rounded-lg shadow-xs overflow-hidden"
                dangerouslySetInnerHTML={{ __html: getAutoReplyHtml(autoReplyModal) }}
              />
            </div>

            {/* Modal Actions */}
            <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={copyEmailHtmlToClipboard}
                className="px-3.5 py-2 text-xs font-semibold bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-stone-600" />
                <span>{copiedHtml ? 'Copied HTML Code!' : 'Copy HTML Email Code'}</span>
              </button>

              <button
                onClick={() => setAutoReplyModal(null)}
                className="px-5 py-2 text-xs font-semibold bg-[#0B1B3D] text-amber-300 rounded hover:bg-stone-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
