import { RiceProduct } from '../types';
import img1121 from '../assets/images/basmati_1121_raw_1791789975173.jpg';
import imgGoldenSella from '../assets/images/golden_sella_basmati_1791789998569.jpg';
import imgWhiteSteam from '../assets/images/white_steam_basmati_1791790026737.jpg';
import imgTraditional from '../assets/images/aged_traditional_basmati_1791790052074.jpg';
import imgPusa from '../assets/images/pusa_basmati_macro_1791790250650.jpg';
import imgParboiledIr64 from '../assets/images/parboiled_ir64_rice_1791790081196.jpg';
import imgSugandha from '../assets/images/sugandha_rice_grains_1791790123471.jpg';
import imgSonaMasoori from '../assets/images/sona_masoori_macro_1791790299478.jpg';

export const RICE_PRODUCTS: RiceProduct[] = [
  // Basmati Rice Varieties
  {
    id: '1121-basmati',
    name: '1121 Basmati Rice',
    category: 'basmati',
    subVariants: ['Steam', 'Creamy Sella (Parboiled)', 'Golden Sella', 'Raw Aged'],
    agl: '8.35 mm – 8.40 mm',
    elongation: 'Up to 2.5x post-cooking length (19mm+)',
    moisture: 'Max 12.5%',
    broken: 'Max 1.0%',
    purity: '95.0% Min',
    hsCode: '10063020',
    description: 'Renowned worldwide for holding the Guinness World Record for the longest grain length. Exceptionally fragrant with distinct royal aroma and slender non-sticky grains after cooking.',
    imageUrl: img1121,
    features: ['Extra Long Slender Grain', 'Pearl White & Golden Luster', 'Zero Chalkiness', 'Aged 1 to 2 Years']
  },
  {
    id: '1718-basmati',
    name: '1718 Basmati Rice',
    category: 'basmati',
    subVariants: ['Steam', 'Sella / Parboiled', 'Golden Sella', 'Raw'],
    agl: '8.30 mm – 8.35 mm',
    elongation: 'Up to 2.4x post-cooking length',
    moisture: 'Max 12.5%',
    broken: 'Max 1.0%',
    purity: '95.0% Min',
    hsCode: '10063020',
    description: 'An improved genetic lineage derived from 1121 Basmati with high bacterial blight resistance, higher grain density, exquisite natural aroma, and superior elongation upon boiling.',
    imageUrl: imgGoldenSella,
    features: ['High Tensile Strength Grain', 'Sweet Natural Fragrance', 'Excellent Cooking Volume', 'High Resistance to Breakage']
  },
  {
    id: '1509-basmati',
    name: '1509 Basmati Rice',
    category: 'basmati',
    subVariants: ['Steam', 'Creamy Sella', 'Golden Sella'],
    agl: '8.40 mm – 8.50 mm',
    elongation: 'Up to 2.3x post-cooking length',
    moisture: 'Max 12.5%',
    broken: 'Max 1.0%',
    purity: '95.0% Min',
    hsCode: '10063020',
    description: 'Early-maturing premium basmati variety celebrated for its exceptionally fast cooking time, needle-like elongated kernel, and great value pricing for international food service and retail packaging.',
    imageUrl: imgWhiteSteam,
    features: ['Ultra Slender Needle Grain', 'Fast Cooking & Tender Texture', 'Cost-Effective Gourmet Grade', 'High Yield on Parboiling']
  },
  {
    id: '1401-basmati',
    name: '1401 Basmati Rice',
    category: 'basmati',
    subVariants: ['Steam', 'Creamy Sella', 'Raw'],
    agl: '7.70 mm – 7.80 mm',
    elongation: 'Up to 2.2x post-cooking length',
    moisture: 'Max 12.5%',
    broken: 'Max 1.0%',
    purity: '95.0% Min',
    hsCode: '10063020',
    description: 'Cross-breed variety developed by IARI offering remarkable grain breadth and pleasant sweetness, favored heavily across GCC and European hospitality sectors for Biryani and Mandi dishes.',
    imageUrl: imgSugandha,
    features: ['Medium-Thick Grain Girth', 'Rich Mouthfeel & Fluffy Separation', 'High Thermal Tolerance', 'Sortex Cleaned 100%']
  },
  {
    id: 'pusa-basmati',
    name: 'Pusa Basmati Rice',
    category: 'basmati',
    subVariants: ['Raw (DB)', 'Steam', 'Sella'],
    agl: '7.40 mm – 7.50 mm',
    elongation: 'Up to 2.1x post-cooking length',
    moisture: 'Max 12.5%',
    broken: 'Max 1.5%',
    purity: '94.0% Min',
    hsCode: '10063020',
    description: 'A benchmark hybrid of Traditional Basmati with remarkable aroma retention. Famous for easy digestibility, pleasant sweetness, and non-sticky granular dispersion.',
    imageUrl: imgPusa,
    features: ['Historic Benchmark Hybrid', 'Delicate Floral Aroma', 'Natural Golden Hues in Sella', 'Ideal for High-End Catering']
  },
  {
    id: 'traditional-basmati',
    name: 'Traditional Royal Basmati',
    category: 'basmati',
    subVariants: ['Raw Aged 2 Yrs', 'Vintage Steam'],
    agl: '7.30 mm – 7.45 mm',
    elongation: 'Up to 2.0x with sweet aroma',
    moisture: 'Max 12.0%',
    broken: 'Max 1.0%',
    purity: '98.0% Min',
    hsCode: '10063020',
    description: 'The monarch of Indian culinary heritage cultivated exclusively in the snow-fed Himalayan foothill plains. Naturally aged in climate-controlled godowns for 24 months to mature intense 2-AP aroma.',
    imageUrl: imgTraditional,
    features: ['Himalayan Glacial Water Fed', 'Aged 24 Months in Silos', 'Highest 2-Acetyl-1-Pyrroline Level', 'The Connoisseur Choice']
  },

  // Non-Basmati Rice Varieties
  {
    id: 'sugandha-rice',
    name: 'Sugandha Rice',
    category: 'non-basmati',
    subVariants: ['Steam', 'Creamy Sella', 'Golden Sella', 'Raw'],
    agl: '7.80 mm – 7.90 mm',
    elongation: 'Up to 2.0x post-cooking',
    moisture: 'Max 13.0%',
    broken: 'Max 1.5%',
    purity: '95.0% Min',
    hsCode: '10063090',
    description: 'Widely celebrated as the closest aromatic non-basmati substitute to 1121 Basmati. Offers long grain structure and mild appetizing fragrance at very competitive pricing.',
    imageUrl: imgSugandha,
    features: ['Basmati-Like Elongation', 'Subtle Fragrance', 'High Cost Advantage', 'Preferred in Middle East & Africa']
  },
  {
    id: 'sharbati-rice',
    name: 'Sharbati Rice',
    category: 'non-basmati',
    subVariants: ['Steam', 'Sella / Parboiled', 'Golden Sella', 'Raw'],
    agl: '7.00 mm – 7.15 mm',
    elongation: 'Up to 1.9x post-cooking',
    moisture: 'Max 13.0%',
    broken: 'Max 2.0%',
    purity: '95.0% Min',
    hsCode: '10063090',
    description: 'A budget-friendly long grain aromatic rice popular for community kitchens, buffets, and institutional dining due to its fluffy grain texture and economical pricing.',
    imageUrl: imgWhiteSteam,
    features: ['Long Slender Grains', 'Easy Digestibility', 'Non-Sticky Consistency', 'Available in Bulk 50Kg Packing']
  },
  {
    id: 'pr11-pr14-rice',
    name: 'PR 11 / PR 14 Rice',
    category: 'non-basmati',
    subVariants: ['Steam', 'Parboiled (Sella)', 'Raw / White'],
    agl: '6.80 mm – 7.00 mm',
    elongation: 'Up to 1.8x post-cooking',
    moisture: 'Max 14.0%',
    broken: 'Max 5.0% / 1% as per spec',
    purity: '95.0% Min',
    hsCode: '10063090',
    description: 'Long grain non-basmati milled in the heart of Haryana and Punjab. Widely consumed and exported across East Africa, GCC, and South Asia for daily meal staples.',
    imageUrl: imgParboiledIr64,
    features: ['High Amylose Content', 'Firm Grain Structure', 'Resistant to Overcooking', 'Uniform Milling & Sortex 100%']
  },
  {
    id: 'parmal-ir64-rice',
    name: 'Parmal / IR 64 Parboiled Rice',
    category: 'non-basmati',
    subVariants: ['5% Broken Parboiled', '25% Broken', '100% Broken Sortex', 'Raw Rice'],
    agl: '6.00 mm – 6.20 mm',
    elongation: 'Up to 1.7x post-cooking',
    moisture: 'Max 14.0%',
    broken: '5% / 25% customized',
    purity: '95.0% Min',
    hsCode: '10063090',
    description: 'The workhorse of global bulk rice shipping. Nutrient-rich parboiled grain with golden tint, high shelf-life, and robust resistance to weevils during sea transit.',
    imageUrl: imgParboiledIr64,
    features: ['High Calorie Nutrition', 'Zero Yellow / Damaged Kernels', 'Break-Bulk & Container Friendly', 'Exported in 50Kg PP Bags']
  },
  {
    id: 'sona-masoori-rice',
    name: 'Sona Masoori Rice',
    category: 'non-basmati',
    subVariants: ['Raw (Single/Double Polished)', 'Steam'],
    agl: '5.00 mm – 5.20 mm',
    elongation: 'Up to 1.6x post-cooking',
    moisture: 'Max 13.0%',
    broken: 'Max 3.0%',
    purity: '95.0% Min',
    hsCode: '10063090',
    description: 'Medium grain aromatic delicacy grown primarily in the fertile river basins of South India. Extremely lightweight, low in starch, and a staple for Indian diaspora globally.',
    imageUrl: imgSonaMasoori,
    features: ['Aromatic Medium Grain', 'Low Starch Content', 'Easily Digestible Staple', 'Exported in 20lb & 10kg BOPP Bags']
  }
];

export const CERTIFICATIONS = [
  { name: 'APEDA Approved', code: 'RCMC / Govt of India', desc: 'Authorized Agricultural & Processed Food Products Export Development Authority registration.' },
  { name: 'ISO 22000:2018', code: 'Food Safety Management', desc: 'Audited international standard for farm-to-table food safety and processing cleanliness.' },
  { name: 'HACCP Certified', code: 'Hazard Analysis Critical Point', desc: 'Zero biological, chemical, or physical hazards across multi-stage milling & sortex lines.' },
  { name: 'FSSAI License', code: 'Central Licensing Authority', desc: 'Strict adherence to Food Safety and Standards Authority of India export mandates.' },
  { name: 'Halal Certified', code: 'Islamic Food Council', desc: '100% compliant with GCC, Middle East, and Southeast Asian Halal dietary requirements.' },
  { name: 'US FDA Registered', code: 'Facility Registration #', desc: 'Facility verified and registered with United States Food and Drug Administration for import clearance.' }
];

export const DEFAULT_EXCHANGE_RATES = {
  usdInr: 86.85,
  eurInr: 94.20,
  usdEur: 0.92,
  lastUpdated: 'Live Forex Feed (RBI Reference Synchronized)',
  source: 'Bank of India Interbank / ExchangeRate API'
};
