import React, { useState, useEffect } from 'react';
import { Building, Instagram, Facebook, Linkedin, Phone, ChevronDown } from 'lucide-react';
import { DollarSign, TrendingUp, MapPin, School, Building2, ShoppingCart, Train } from 'lucide-react';


const API_URL = 'http://localhost:4090';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-xl font-semibold hover:text-gray-700">
            <Building className="w-6 h-6" />
            Wellax Reality
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
          <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 gap-4 md:items-center border-b md:border-0 shadow-md md:shadow-none`}>
            <li><button onClick={() => onNavigate('home')} className="hover:text-gray-600 font-medium">Home</button></li>
            <li><button onClick={() => onNavigate('story')} className="hover:text-gray-600">Our Story</button></li>
            <li className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 hover:text-gray-600">
                Our Projects
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <ul className="md:absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-2 min-w-[200px]">
                  <li><button onClick={() => onNavigate('property', { name: 'wellax' })} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Wellax</button></li>
                  <li><button onClick={() => onNavigate('property', { name: 'wellax2' })} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Wellax 2</button></li>
                  <li><hr className="my-2" /></li>
                  <li><button onClick={() => onNavigate('allprojects')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">All Projects</button></li>
                </ul>
              )}
            </li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-gray-600">Contact</button></li>
            <li><button onClick={() => onNavigate('enquiry')} className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">Enquire</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-6 mb-6">
          <div>
            <p className="font-semibold mb-2">Socials</p>
            <div className="flex gap-3">
              <button className="hover:text-gray-300"><Instagram className="w-5 h-5" /></button>
              <button className="hover:text-gray-300"><Facebook className="w-5 h-5" /></button>
              <button className="hover:text-gray-300"><Linkedin className="w-5 h-5" /></button>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Explore</p>
            <div className="flex flex-col gap-1">
              <button className="text-left hover:text-gray-300">Privacy</button>
              <button className="text-left hover:text-gray-300">Terms</button>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Connect</p>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 xxxx xxx xxx</span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm border-t border-gray-700 pt-4">© Wellax Reality</div>
      </div>
    </footer>
  );
};

const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to Wellax Reality</h1>
        <p className="text-xl text-gray-600 mb-8">Find Your Dream Property</p>
        <button onClick={() => onNavigate('allprojects')} className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          Explore Projects
        </button>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
          <p className="text-gray-600">Luxury apartments and villas in prime locations</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-2">Cost Calculator</h3>
          <p className="text-gray-600">Transparent pricing with detailed breakdowns</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
          <p className="text-gray-600">Professional support throughout your journey</p>
        </div>
      </section>
    </div>
  );
};

// Replace the PropertyShow component in your App.js with this updated version

const PropertyShow = ({ propertyName, onNavigate }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch(`${API_URL}/projects/${propertyName}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [propertyName]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (!property) return <div className="text-center py-20">Property not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Property Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="flex items-center justify-center min-h-[400px] bg-gray-100">
          <img 
            src={property.image} 
            alt={property.name} 
            className="max-w-md max-h-[350px] object-contain" 
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{property.name}</h1>
          <p className="text-xl text-gray-600 mb-4">📍 {property.location}</p>
          <p className="text-lg mb-6">{property.description}</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-2xl font-semibold">
              ₹{property.costPerSqInch?.toLocaleString()} per sq. ft.
            </p>
          </div>
          
          {/* Location Map */}
          <div className="my-6">
            <h2 className="text-2xl font-semibold mb-3">Location on Map</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border shadow-md">
              <iframe
                src={property.coordinates 
                  ? `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
                  : `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('calculator', {id: property._id})} 
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
          >
            Calculate Total Cost
          </button>
        </div>
      </div>

      {/* Tabs for Additional Features */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('emi')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'emi' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'nearby' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Nearby Places
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'investment' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Investment
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Property Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                  <span className="font-medium">Property Type:</span>
                  <span>Residential Apartment</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-semibold">Available</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                  <span className="font-medium">Possession:</span>
                  <span>Ready to Move</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emi' && (
            <EMICalculator propertyPrice={property.costPerSqInch * 1000} />
          )}

          {activeTab === 'nearby' && (
            <NearbyPlaces location={property.location} />
          )}

          {activeTab === 'investment' && (
            <InvestmentAnalysis 
              propertyPrice={property.costPerSqInch * 1000} 
              location={property.location} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Calculator = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    area: '', development: '', parking: '', clubhouse: '',
    society: '', grill: '', documentFees: '', floorRise: ''
  });
  const [results, setResults] = useState({ basic: 0, total: 0 });

  useEffect(() => {
    fetch(`${API_URL}/property/${propertyId}/calculator`)
      .then(res => res.json())
      .then(data => setProperty(data.property || data))
      .catch(err => console.error(err));
  }, [propertyId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const area = parseFloat(formData.area) || 0;
    const basic = area * (property?.costPerSqInch || 0);
    const total = basic +
      (parseFloat(formData.development) || 0) +
      (parseFloat(formData.parking) || 0) +
      (parseFloat(formData.clubhouse) || 0) +
      (parseFloat(formData.society) || 0) +
      (parseFloat(formData.grill) || 0) +
      (parseFloat(formData.documentFees) || 0) +
      (parseFloat(formData.floorRise) || 0);
    setResults({ basic, total });
  };

  if (!property) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cost Calculator - {property.name}</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Area (sq. ft.)', field: 'area' },
            { label: 'Development Charges', field: 'development' },
            { label: 'Parking Charges', field: 'parking' },
            { label: 'Clubhouse Charges', field: 'clubhouse' },
            { label: 'Society Charges', field: 'society' },
            { label: 'Grill Charges', field: 'grill' },
            { label: 'Document Fees', field: 'documentFees' },
            { label: 'Floor Rise Charges', field: 'floorRise' }
          ].map(item => (
            <div key={item.field}>
              <label className="block font-medium mb-2">{item.label}</label>
              <input
                type="number"
                value={formData[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button onClick={calculateTotal} className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
          Calculate Total
        </button>
        {results.total > 0 && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Basic Cost:</span>
              <span className="text-xl">₹{results.basic.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold text-lg">Total Cost:</span>
              <span className="text-2xl font-bold text-green-600">₹{results.total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EnquiryForm = () => {
  const [formData, setFormData] = useState({ enquiry: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    fetch(`${API_URL}/enquire/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(() => {
        setSubmitted(true);
        setFormData({ enquiry: '', email: '', phone: '' });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Enquire Now</h1>
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Thank you! We'll get back to you soon.
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div>
          <label className="block font-medium mb-2">Your Enquiry</label>
          <textarea
            value={formData.enquiry}
            onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
          Submit Enquiry
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState({});

  const handleNavigate = (page, pageParams = {}) => {
    setCurrentPage(page);
    setParams(pageParams);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'property': return <PropertyShow propertyName={params.name} onNavigate={handleNavigate} />;
      case 'calculator': return <Calculator propertyId={params.id} />;
      case 'enquiry': return <EnquiryForm />;
      case 'story': return <div className="text-center py-20"><h1 className="text-3xl font-bold">Our Story</h1><p className="mt-4 text-gray-600">Coming soon...</p></div>;
      case 'contact': return <div className="text-center py-20"><h1 className="text-3xl font-bold">Contact Us</h1><p className="mt-4 text-gray-600">Coming soon...</p></div>;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}


// Add these components to your App.js file

// ========== EMI CALCULATOR COMPONENT ==========
const EMICalculator = ({ propertyPrice = 5000000 }) => {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(P)
    });
  };

  const handleLoanChange = (value) => {
    const loan = parseFloat(value) || 0;
    setLoanAmount(loan);
    setDownPayment(propertyPrice - loan);
  };

  const handleDownPaymentChange = (value) => {
    const down = parseFloat(value) || 0;
    setDownPayment(down);
    setLoanAmount(propertyPrice - down);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold">EMI Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Down Payment (₹)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm text-gray-500 mt-1">
            {((downPayment / propertyPrice) * 100).toFixed(1)}% of property price
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => handleLoanChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Interest Rate (% per annum)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Calculate EMI
        </button>

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Monthly EMI:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{result.emi.toLocaleString()}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="font-semibold">₹{result.principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-semibold text-orange-600">₹{result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount Payable:</span>
                <span className="font-semibold">₹{result.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== NEARBY PLACES COMPONENT ==========
const NearbyPlaces = ({ location }) => {
  const nearbyPlaces = [
    {
      category: 'Schools',
      icon: <School className="w-5 h-5" />,
      places: [
        { name: 'DPS International School', distance: '1.2 km' },
        { name: 'Ryan International', distance: '2.5 km' },
        { name: 'Narayana e-Techno School', distance: '3.1 km' }
      ]
    },
    {
      category: 'Hospitals',
      icon: <Building2 className="w-5 h-5" />,
      places: [
        { name: 'Apollo Hospital', distance: '2.0 km' },
        { name: 'Fortis Hospital', distance: '3.5 km' },
        { name: 'MGM Hospital', distance: '4.2 km' }
      ]
    },
    {
      category: 'Shopping',
      icon: <ShoppingCart className="w-5 h-5" />,
      places: [
        { name: 'Seawoods Grand Central Mall', distance: '0.8 km' },
        { name: 'Raghuleela Mall', distance: '2.3 km' },
        { name: 'Orion Mall', distance: '3.8 km' }
      ]
    },
    {
      category: 'Transport',
      icon: <Train className="w-5 h-5" />,
      places: [
        { name: 'Seawoods Railway Station', distance: '1.0 km' },
        { name: 'Nerul Metro Station', distance: '2.5 km' },
        { name: 'CBD Belapur Railway', distance: '4.0 km' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Nearby Places</h2>
      </div>

      <div className="space-y-6">
        {nearbyPlaces.map((category, idx) => (
          <div key={idx} className="border-b pb-4 last:border-b-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-blue-600">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700">{category.category}</h3>
            </div>
            <div className="space-y-2 ml-7">
              {category.places.map((place, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{place.name}</span>
                  <span className="text-sm font-medium text-blue-600">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
          View on Map
        </button>
      </div>
    </div>
  );
};

// ========== INVESTMENT ANALYSIS COMPONENT ==========
const InvestmentAnalysis = ({ propertyPrice, location }) => {
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const appreciationRate = 8; // 8% per year average
    const rentalYield = 3; // 3% per year
    const maintenanceCost = 1; // 1% per year

    const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, investmentPeriod);
    const capitalGain = futureValue - propertyPrice;
    const totalRentalIncome = (propertyPrice * rentalYield / 100) * investmentPeriod;
    const totalMaintenance = (propertyPrice * maintenanceCost / 100) * investmentPeriod;
    const netGain = capitalGain + totalRentalIncome - totalMaintenance;
    const roi = (netGain / propertyPrice) * 100;
    const annualizedROI = roi / investmentPeriod;

    setResult({
      futureValue: Math.round(futureValue),
      capitalGain: Math.round(capitalGain),
      totalRentalIncome: Math.round(totalRentalIncome),
      totalMaintenance: Math.round(totalMaintenance),
      netGain: Math.round(netGain),
      roi: roi.toFixed(2),
      annualizedROI: annualizedROI.toFixed(2),
      monthlyRent: Math.round((propertyPrice * rentalYield / 100) / 12)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Investment Analysis</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Current Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Investment Period (Years)</label>
          <input
            type="number"
            value={investmentPeriod}
            onChange={(e) => setInvestmentPeriod(e.target.value)}
            min="1"
            max="30"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={calculateInvestment}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
        >
          Analyze Investment
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
              <div className="text-center mb-2">
                <span className="text-sm text-gray-600">Projected Future Value</span>
                <div className="text-3xl font-bold text-purple-600">
                  ₹{result.futureValue.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Capital Gain</div>
                <div className="text-lg font-bold text-green-600">
                  ₹{result.capitalGain.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-gray-600 mb-1">Rental Income</div>
                <div className="text-lg font-bold text-blue-600">
                  ₹{result.totalRentalIncome.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected Monthly Rent:</span>
                  <span className="font-semibold">₹{result.monthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Maintenance Cost:</span>
                  <span className="font-semibold text-orange-600">-₹{result.totalMaintenance.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="font-medium">Net Gain:</span>
                  <span className="text-xl font-bold text-green-600">₹{result.netGain.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Total ROI</div>
                  <div className="text-2xl font-bold text-orange-600">{result.roi}%</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Annualized ROI</div>
                  <div className="text-2xl font-bold text-orange-600">{result.annualizedROI}%</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center mt-2">
              * Based on 8% annual appreciation, 3% rental yield, and 1% maintenance cost
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== EXPORT ALL COMPONENTS ==========
export { EMICalculator, NearbyPlaces, InvestmentAnalysis };