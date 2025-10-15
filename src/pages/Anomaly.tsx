import { useState, useEffect, useCallback } from "react";
import { ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";

// Define the types for our product data
interface Product {
  id: number;
  productName: string;
  platform: string;
  seller: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  imageUrl: string;
  price: number;
  mrp: number;
  violations: string[];
  productUrl: string;
  isResolved: boolean;
}

// Product Card Component
const ProductCard = ({ product, isExpanded, onToggle }: { product: Product; isExpanded: boolean; onToggle: () => void; }) => {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className={`relative bg-slate-800 rounded-lg shadow-lg transform hover:scale-[1.02] hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col ${isExpanded ? 'z-20' : 'z-10'}`}>
      <div className="w-full h-48 relative flex-shrink-0 bg-black">
        <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/600x400/1e293b/94a3b8?text=Image+Not+Found'; }} />
        <span className={`absolute top-2 right-2 whitespace-nowrap px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(product.riskLevel)}`}>{product.riskLevel} Risk</span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-white leading-tight truncate">{product.productName}</h3>
        <button onClick={onToggle} className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors mt-2">
          {isExpanded ? 'Hide Details' : 'Show Details'}
          {isExpanded ? <ChevronUp className="h-5 w-5 ml-1" /> : <ChevronDown className="h-5 w-5 ml-1" />}
        </button>
      </div>
      {isExpanded && (
        <div className="absolute top-full left-0 w-full z-20 mt-2">
            <div className="p-4 bg-slate-800 rounded-b-lg shadow-lg border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-2"><strong>{product.platform}</strong> | {product.seller}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-white">₹{parseInt(String(product.price)).toLocaleString('en-IN')}</span>
                <span className="text-slate-400 line-through">₹{parseInt(String(product.mrp)).toLocaleString('en-IN')}</span>
                {discount > 0 && <span className="text-green-400 font-semibold">{discount}% off</span>}
              </div>
              <div className="border-t border-slate-700 pt-4">
                <h4 className="font-semibold text-slate-300 mb-2">Detected Violations:</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  {product.violations.map((v, i) => (
                    <li key={i} className="flex items-start">
                      <ShieldAlert className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center justify-start gap-4">
                <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">Visit Product</a>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

// Main Anomaly Page Component
export default function Anomaly() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCardExpansion = (productId: number) => {
    setExpandedCards(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [productId] // Only allow one card to be expanded at a time
    );
  };

  const fetchAndAnalyzeProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawResponse = await fetch('https://dummyjson.com/products');
      if (!rawResponse.ok) throw new Error('Failed to fetch raw product data.');
      const rawData = await rawResponse.json();

      const augmentedProducts = rawData.products.map((p: any, index: number) => {
        const riskLevels: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
        const platforms = ['Amazon', 'Flipkart', 'Myntra'];
        const sellers = ['Cloudtail Retail', 'Appario Retail', 'SuperComNet', 'GadgetGalaxy', 'UrbanAttire'];
        const violationsList = [
          ["Price Anomaly (Significantly below market average)", "Mismatched Product Description"],
          ["Missing 'Country of Origin' Declaration"],
          ["Potential Counterfeit (Based on seller history and reviews)"],
          ["MRP mentioned is higher than allowed", "Missing Manufacturer Details"],
          ["Duplicate Listing Detected in Database"],
        ];

        return {
          ...p,
          productName: p.title,
          imageUrl: p.thumbnail,
          platform: platforms[index % platforms.length],
          seller: sellers[index % sellers.length],
          riskLevel: riskLevels[index % riskLevels.length],
          mrp: Math.round(p.price * (1 + (p.discountPercentage / 100)) * 1.1),
          violations: violationsList[index % violationsList.length],
          productUrl: '#',
          isResolved: false,
        };
      });

      const analyzedProducts = augmentedProducts.sort((a: Product, b: Product) => {
        const riskOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      });

      setAllProducts(analyzedProducts);
      setFilteredProducts(analyzedProducts);
    } catch (err) {
      console.error("Failed to fetch and analyze products:", err);
      setError('Could not fetch product data from the API. Please try again later.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAndAnalyzeProducts();
  }, [fetchAndAnalyzeProducts]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allProducts.filter(item => {
      return (
        item.productName.toLowerCase().includes(lowercasedFilter) ||
        item.seller.toLowerCase().includes(lowercasedFilter) ||
        item.platform.toLowerCase().includes(lowercasedFilter) ||
        item.violations.some(v => v.toLowerCase().includes(lowercasedFilter))
      );
    });
    setFilteredProducts(filteredData);
  }, [searchTerm, allProducts]);

  return (
    <div className="bg-background text-foreground p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Anomaly Detection</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Automated monitoring to identify unusual product patterns and ensure data quality, compliance, and fraud prevention based on the Legal Metrology Act.
        </p>
      </header>

      <div className="mb-8 p-4 bg-card rounded-lg shadow-xl">
        <div className="relative">
          <input
            type="text"
            id="searchInput"
            placeholder="Search by product name, seller, or violation..."
            className="w-full bg-background text-foreground placeholder-muted-foreground border border-border rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-2xl font-semibold">Products Based on Risk Priority</h2>
        <span className="text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full">
          {filteredProducts.length} Anomalies Found
        </span>
      </div>

      {loading && <p className="text-center text-lg">Loading and analyzing products...</p>}
      {error && (
        <div className="text-center py-16 bg-card rounded-lg">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-lg font-semibold">Connection Error</h3>
          <p className="mt-1 text-muted-foreground">{error}</p>
        </div>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-lg font-semibold">No products found</h3>
          <p className="mt-1 text-muted-foreground">Your search did not match any products. Try a different query.</p>
        </div>
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isExpanded={expandedCards.includes(product.id)} 
              onToggle={() => toggleCardExpansion(product.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
