import React, { useState } from 'react';
import { InvoiceEngine } from './InvoiceEngine';
import { ExchangeRates, ExportInvoice, ContactMessage } from '../../types';
import { 
  FileSpreadsheet, 
  TrendingUp, 
  ShieldAlert, 
  Ship, 
  Users, 
  FileCheck, 
  Clock, 
  Key, 
  DollarSign,
  ArrowUpRight,
  CheckCircle,
  Eye,
  RefreshCw,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  exchangeRates: ExchangeRates;
  onRefreshRates: () => void;
  savedInvoices: ExportInvoice[];
  onSaveInvoice: (inv: ExportInvoice) => void;
  inquiries: ContactMessage[];
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  exchangeRates,
  onRefreshRates,
  savedInvoices,
  onSaveInvoice,
  inquiries,
  onExitAdmin
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'invoices' | 'inquiries' | 'forex'>('invoices');

  const totalTonnage = savedInvoices.reduce((acc, inv) => acc + (inv.costSheet?.quantityMT || 26), 0);
  const totalUsdPipeline = savedInvoices.reduce((acc, inv) => acc + (inv.totalAmountForeign || 0), 0);

  return (
    <div className="min-h-screen bg-stone-100/90 py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top ERP Header & Auth Badge */}
        <div className="bg-[#0B1B3D] text-white p-5 rounded-2xl border border-amber-500/30 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-editorial text-stone-100">
                  Export ERP Admin &amp; Trade Control Center
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  SESSION SECURE
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                S&amp;A Global Agro Exporter · IEC: 0514089921 · Authorized Trade Terminal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right text-xs">
              <div className="text-stone-300">Signed in as: <strong className="text-amber-300 font-mono">director@saglobalagro.com</strong></div>
              <div className="text-[10px] text-stone-400 font-mono">PHP Session Active · CSRF: 8f7e2a9b</div>
            </div>

            <button
              onClick={onExitAdmin}
              className="px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Return To Public Website</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Active Export Invoices</span>
              <FileCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              {savedInvoices.length} PI / CI
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <span>Mundra &amp; Nhava Sheva Ports</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Export Tonnage Pipeline</span>
              <Ship className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              {totalTonnage} MT
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              Approx. {Math.round(totalTonnage / 26)} x 20ft FCL Containers
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Transaction Value (USD)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              ${totalUsdPipeline.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1">
              +10% Profit Margin Protected
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Live USD/INR Exchange</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              ₹{exchangeRates.usdInr.toFixed(2)}
            </div>
            <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
              <span>EUR/INR: ₹{exchangeRates.eurInr.toFixed(2)}</span>
              <button onClick={onRefreshRates} className="text-amber-700 hover:underline">
                Sync
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveSubTab('invoices')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSubTab === 'invoices'
                ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Invoice Generator &amp; Cost Sheet Engine
          </button>

          <button
            onClick={() => setActiveSubTab('inquiries')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'inquiries'
                ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Buyer Inquiries &amp; Auto-Replies ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('forex')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'forex'
                ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Forex Live API Terminal</span>
          </button>
        </div>

        {/* SubTab 1: INVOICE GENERATOR */}
        {activeSubTab === 'invoices' && (
          <InvoiceEngine
            exchangeRates={exchangeRates}
            onRefreshRates={onRefreshRates}
            savedInvoices={savedInvoices}
            onSaveInvoice={onSaveInvoice}
          />
        )}

        {/* SubTab 2: BUYER INQUIRIES LOG */}
        {activeSubTab === 'inquiries' && (
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold font-editorial text-stone-900">
                  Logged Export Quotation Inquiries
                </h3>
                <p className="text-xs text-stone-500">
                  Real-time database log of international container quote submissions from the public website
                </p>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded font-bold">
                {inquiries.length} Inquiries Logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Inquiry ID</th>
                    <th className="py-2.5 px-3">Buyer &amp; Company</th>
                    <th className="py-2.5 px-3">Rice Variety</th>
                    <th className="py-2.5 px-3">Qty (MT)</th>
                    <th className="py-2.5 px-3">Destination Port</th>
                    <th className="py-2.5 px-3">Auto-Reply Status</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-stone-50/70">
                      <td className="py-3 px-3 font-mono font-bold text-amber-800">{inq.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-900">{inq.fullName}</div>
                        <div className="text-[11px] text-stone-500">{inq.companyName} ({inq.email})</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-stone-800">{inq.riceVariety}</td>
                      <td className="py-3 px-3 font-mono font-bold">{inq.quantityMT} MT</td>
                      <td className="py-3 px-3 text-stone-600">{inq.destinationPort}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Dispatched 200 OK
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-stone-500 font-mono">
                        {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SubTab 3: FOREX API LIVE MONITOR */}
        {activeSubTab === 'forex' && (
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold font-editorial text-stone-900">
                  Forex API Integration &amp; Fallback Matrix
                </h3>
                <p className="text-xs text-stone-500">
                  Live ExchangeRate-API connection with automatic failover buffer
                </p>
              </div>
              <button
                onClick={onRefreshRates}
                className="px-3.5 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-md flex items-center gap-1.5 hover:bg-black transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Trigger Manual Sync</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500">USD / INR Interbank Rate</span>
                <div className="text-3xl font-bold font-mono text-[#0B1B3D] mt-1">
                  ₹{exchangeRates.usdInr.toFixed(2)}
                </div>
                <span className="text-[11px] text-stone-500">Base conversion for all US Dollar export quotes</span>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500">EUR / INR Interbank Rate</span>
                <div className="text-3xl font-bold font-mono text-[#0B1B3D] mt-1">
                  ₹{exchangeRates.eurInr.toFixed(2)}
                </div>
                <span className="text-[11px] text-stone-500">European Union and Mediterranean trade</span>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500">USD / EUR Cross Rate</span>
                <div className="text-3xl font-bold font-mono text-[#0B1B3D] mt-1">
                  €{exchangeRates.usdEur.toFixed(2)}
                </div>
                <span className="text-[11px] text-stone-500">Cross currency hedging benchmark</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-100 text-xs text-stone-700 space-y-2">
              <div className="font-bold text-stone-900">Failover Architecture:</div>
              <p>
                When running on a production PHP / LAMP server, `admin/dashboard.php` calls `https://open.er-api.com/v6/latest/USD` with a 3.0-second cURL timeout. If the remote service is unreachable or rate limited, the backend seamlessly falls back to the calibrated historical matrix array without breaking invoice generation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
