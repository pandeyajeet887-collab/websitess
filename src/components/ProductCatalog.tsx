import React, { useState } from 'react';
import { RICE_PRODUCTS } from '../data/riceData';
import { RiceProduct, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Check, Info, ArrowRight, X, Sparkles, Shield, Package } from 'lucide-react';

interface ProductCatalogProps {
  currentLang: SupportedLanguage;
  onSelectForInquiry: (product: RiceProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currentLang,
  onSelectForInquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'basmati' | 'non-basmati'>('all');
  const [selectedProductDetails, setSelectedProductDetails] = useState<RiceProduct | null>(null);

  const t = TRANSLATIONS[currentLang];

  const filteredProducts = RICE_PRODUCTS.filter(product => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  return (
    <section id="products" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Global Export Grade Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
            Premium Basmati &amp; Non-Basmati Rice Varieties
          </h2>
          <p className="mt-4 text-base text-stone-600">
            Strictly graded under international food standards with calibrated Average Grain Length (AGL), moisture limits, and zero chalky grains.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-md'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              {t.filterAll} ({RICE_PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveCategory('basmati')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeCategory === 'basmati'
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-md'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              {t.filterBasmati} ({RICE_PRODUCTS.filter(p => p.category === 'basmati').length})
            </button>
            <button
              onClick={() => setActiveCategory('non-basmati')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeCategory === 'non-basmati'
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-md'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              {t.filterNonBasmati} ({RICE_PRODUCTS.filter(p => p.category === 'non-basmati').length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Category & HS Code Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-stone-900/85 text-white backdrop-blur-xs ${
                    product.category === 'basmati' ? 'border-l-2 border-amber-400' : 'border-l-2 border-blue-400'
                  }`}>
                    {product.category === 'basmati' ? 'Basmati' : 'Non-Basmati'}
                  </span>
                  <span className="text-[10px] font-mono bg-white/90 text-stone-800 font-bold px-2 py-0.5 rounded shadow-xs">
                    HS {product.hsCode}
                  </span>
                </div>

                {/* Prominent AGL Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-3 pt-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      Average Grain Length (AGL)
                    </div>
                    <div className="text-lg font-bold text-white font-cinzel">
                      {product.agl}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-300">Purity</div>
                    <div className="text-xs font-semibold text-emerald-300">{product.purity}</div>
                  </div>
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-editorial text-stone-900 group-hover:text-amber-800 transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Sub-variant Pills / Badges */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {product.subVariants.map((variant, vIdx) => (
                      <span
                        key={vIdx}
                        className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>

                  {/* Specs Matrix */}
                  <div className="mt-4 pt-3.5 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-stone-50 p-2 rounded">
                      <span className="text-stone-500 block">Elongation</span>
                      <span className="font-semibold text-stone-800">{product.elongation}</span>
                    </div>
                    <div className="bg-stone-50 p-2 rounded">
                      <span className="text-stone-500 block">Moisture</span>
                      <span className="font-semibold text-stone-800">{product.moisture}</span>
                    </div>
                    <div className="bg-stone-50 p-2 rounded">
                      <span className="text-stone-500 block">Broken</span>
                      <span className="font-semibold text-stone-800">{product.broken}</span>
                    </div>
                    <div className="bg-stone-50 p-2 rounded">
                      <span className="text-stone-500 block">Stuffing / 20ft</span>
                      <span className="font-semibold text-stone-800">25 - 26 MT</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProductDetails(product)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-stone-600" />
                    <span>Specifications</span>
                  </button>

                  <button
                    onClick={() => onSelectForInquiry(product)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Specification Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-editorial text-stone-100">
                    {selectedProductDetails.name}
                  </h3>
                  <div className="text-xs text-amber-300 font-mono">
                    HS Code: {selectedProductDetails.hsCode} · {selectedProductDetails.category.toUpperCase()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProductDetails(null)}
                className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <img
                  src={selectedProductDetails.imageUrl}
                  alt={selectedProductDetails.name}
                  className="w-full sm:w-48 h-36 object-cover rounded-lg border border-stone-200"
                />
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {selectedProductDetails.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProductDetails.features.map((feat, fIdx) => (
                      <span key={fIdx} className="text-[11px] font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-amber-700" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comprehensive Technical Matrix */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-600" />
                  Official Export Specification Parameters
                </h4>
                <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full divide-y divide-stone-200 text-left">
                    <tbody className="divide-y divide-stone-100">
                      <tr className="bg-stone-50">
                        <td className="px-4 py-2.5 font-semibold text-stone-700 w-1/2">Average Grain Length (Raw)</td>
                        <td className="px-4 py-2.5 text-stone-900 font-bold font-mono">{selectedProductDetails.agl}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Cooking Elongation Ratio</td>
                        <td className="px-4 py-2.5 text-stone-900">{selectedProductDetails.elongation}</td>
                      </tr>
                      <tr className="bg-stone-50">
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Moisture Content</td>
                        <td className="px-4 py-2.5 text-stone-900">{selectedProductDetails.moisture}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Broken Grains</td>
                        <td className="px-4 py-2.5 text-stone-900">{selectedProductDetails.broken}</td>
                      </tr>
                      <tr className="bg-stone-50">
                        <td className="px-4 py-2.5 font-semibold text-stone-700">DNA Varietal Purity</td>
                        <td className="px-4 py-2.5 text-emerald-700 font-bold">{selectedProductDetails.purity}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Available Sub-Finishes</td>
                        <td className="px-4 py-2.5 text-stone-900">{selectedProductDetails.subVariants.join(', ')}</td>
                      </tr>
                      <tr className="bg-stone-50">
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Packaging Options</td>
                        <td className="px-4 py-2.5 text-stone-900">1kg, 5kg, 10kg, 20kg, 25kg, 50kg (PP / Jute / Non-Woven / BOPP)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-stone-700">Port of Loading</td>
                        <td className="px-4 py-2.5 text-stone-900">Mundra Port (INMUN1) / Nhava Sheva (INNSA1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  const p = selectedProductDetails;
                  setSelectedProductDetails(null);
                  onSelectForInquiry(p);
                }}
                className="px-5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md shadow-xs flex items-center gap-1.5"
              >
                <span>Request Price For This Variety</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
