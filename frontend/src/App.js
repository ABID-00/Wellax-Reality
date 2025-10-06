// App.js
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  Building,
  Instagram,
  Facebook,
  Linkedin,
  Phone,
  ChevronDown,
  User,
  DollarSign,
  TrendingUp,
  MapPin,
  School,
  Building2,
  ShoppingCart,
  Train
} from 'lucide-react';
import Auth from './Auth';

const API_URL = 'http://localhost:4090';

// ====== NAVBAR ======
const Navbar = ({ onNavigate, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-black/70 via-gray-900/60 to-transparent border-b border-gray-800">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-xl font-semibold text-white hover:text-indigo-300 transition"
        >
          <Building className="w-6 h-6 text-indigo-400" />
          Wellax Reality
        </button>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-indigo-400 transition"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-400"></div>
          </button>
        </div>

        <ul
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-gray-900/95 md:bg-transparent p-6 md:p-0 gap-6 md:items-center transition-all duration-400 ease-in-out shadow-lg md:shadow-none`}
        >
          <li>
            <button
              onClick={() => {
                onNavigate('home');
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-indigo-300 font-medium"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onNavigate('story');
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-indigo-300"
            >
              Our Story
            </button>
          </li>

          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-indigo-300"
            >
              Our Projects
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fadeIn min-w-[200px]">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('property', { name: 'wellax' });
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    Wellax
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('property', { name: 'wellax2' });
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    Wellax 2
                  </button>
                </li>
                <li>
                  <hr className="border-gray-700 my-1" />
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('allprojects');
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    All Projects
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-indigo-300"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onNavigate('enquiry');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md transition"
            >
              Enquire
            </button>
          </li>

          <li>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-200">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate('auth');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 shadow-md transition"
              >
                <User className="w-5 h-5" /> Login / Signup
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

// ====== FOOTER ======
const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black/70 via-gray-900/80 to-transparent text-gray-300 py-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-semibold mb-3 text-white">Follow Us</p>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition" />
            <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer transition" />
            <Linkedin className="w-5 h-5 hover:text-blue-400 cursor-pointer transition" />
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3 text-white">Explore</p>
          <div className="flex flex-col gap-2">
            <button className="hover:text-indigo-400 text-left">Privacy</button>
            <button className="hover:text-indigo-400 text-left">Terms</button>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3 text-white">Contact</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4 text-indigo-400" /> +91 xxxx xxx xxx
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Wellax Reality
      </div>
    </footer>
  );
};

// ====== HOMEPAGE ======
const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-16 text-gray-200 animate-fadeIn">
      <section className="text-center py-24 bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-900 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold mb-4 text-white tracking-wide">
          Welcome to Wellax Reality
        </h1>
        <p className="text-lg text-gray-400 mb-8">Find Your Dream Property with Confidence</p>
        <button
          onClick={() => onNavigate('allprojects')}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md transition-transform transform hover:scale-105"
        >
          Explore Projects
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          { icon: '🏢', title: 'Premium Properties', desc: 'Luxury apartments and villas in prime locations' },
          { icon: '💰', title: 'Cost Calculator', desc: 'Transparent pricing with detailed breakdowns' },
          { icon: '🤝', title: 'Expert Guidance', desc: 'Professional support throughout your journey' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/30 transition-transform transform hover:scale-105 backdrop-blur-md"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// ====== PROPERTY SHOW (full feature-preserving) ======
const PropertyShow = ({ propertyName, onNavigate }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/projects/${propertyName}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [propertyName]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl text-gray-300">
        Loading...
      </div>
    );
  if (!property)
    return (
      <div className="text-center py-20 text-gray-300">
        Property not found
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-900/60 rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-b from-gray-800 to-gray-900">
          <img
            src={property.image}
            alt={property.name}
            className="max-w-md max-h-[350px] object-contain"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2 text-white">{property.name}</h1>
          <p className="text-lg text-gray-400 mb-2">📍 {property.location}</p>
          <p className="text-gray-300 mb-6">{property.description}</p>

          <div className="bg-gradient-to-r from-gray-800 to-indigo-900 p-4 rounded-lg mb-6 border border-gray-700">
            <p className="text-2xl font-semibold text-white">
              ₹{property.costPerSqInch?.toLocaleString()} per sq. ft.
            </p>
          </div>

          <div className="my-6">
            <h2 className="text-2xl font-semibold text-white mb-3">Location on Map</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-800 shadow-md">
              <iframe
                src={
                  property.coordinates
                    ? `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="property-map"
              />
            </div>
          </div>

          <button
            onClick={() => onNavigate('calculator', { id: property._id })}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 font-medium transition transform hover:scale-105"
          >
            Calculate Total Cost
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900/60 rounded-xl shadow overflow-hidden border border-gray-800">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'overview'
                ? 'bg-indigo-700 text-white'
                : 'bg-transparent text-gray-300 hover:bg-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('emi')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'emi'
                ? 'bg-green-700 text-white'
                : 'bg-transparent text-gray-300 hover:bg-gray-800'
            }`}
          >
            EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'nearby'
                ? 'bg-indigo-700 text-white'
                : 'bg-transparent text-gray-300 hover:bg-gray-800'
            }`}
          >
            Nearby Places
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'investment'
                ? 'bg-purple-700 text-white'
                : 'bg-transparent text-gray-300 hover:bg-gray-800'
            }`}
          >
            Investment
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Property Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Property Type:</span>
                  <span className="text-gray-300">Residential Apartment</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Status:</span>
                  <span className="text-green-400 font-semibold">Available</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Possession:</span>
                  <span className="text-gray-300">Ready to Move</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emi' && (
            <EMICalculator propertyPrice={property.costPerSqInch * 1000} />
          )}

          {activeTab === 'nearby' && <NearbyPlaces location={property.location} />}

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

// ====== CALCULATOR ======
const Calculator = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    area: '',
    development: '',
    parking: '',
    clubhouse: '',
    society: '',
    grill: '',
    documentFees: '',
    floorRise: ''
  });
  const [results, setResults] = useState({ basic: 0, total: 0 });

  useEffect(() => {
    fetch(`${API_URL}/property/${propertyId}/calculator`)
      .then((res) => res.json())
      .then((data) => setProperty(data.property || data))
      .catch((err) => console.error(err));
  }, [propertyId]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const calculateTotal = () => {
    const area = parseFloat(formData.area) || 0;
    const basic = area * (property?.costPerSqInch || 0);
    const total =
      basic +
      (parseFloat(formData.development) || 0) +
      (parseFloat(formData.parking) || 0) +
      (parseFloat(formData.clubhouse) || 0) +
      (parseFloat(formData.society) || 0) +
      (parseFloat(formData.grill) || 0) +
      (parseFloat(formData.documentFees) || 0) +
      (parseFloat(formData.floorRise) || 0);
    setResults({ basic, total });
  };

  if (!property)
    return (
      <div className="text-center py-20 text-gray-300">Loading...</div>
    );

  const fields = [
    { label: 'Area (sq. ft.)', field: 'area' },
    { label: 'Development Charges', field: 'development' },
    { label: 'Parking Charges', field: 'parking' },
    { label: 'Clubhouse Charges', field: 'clubhouse' },
    { label: 'Society Charges', field: 'society' },
    { label: 'Grill Charges', field: 'grill' },
    { label: 'Document Fees', field: 'documentFees' },
    { label: 'Floor Rise Charges', field: 'floorRise' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Cost Calculator - {property.name}</h1>
      <div className="bg-gray-900/70 rounded-lg shadow-lg p-8 border border-gray-800">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {fields.map((item) => (
            <div key={item.field}>
              <label className="block font-medium mb-2 text-gray-200">{item.label}</label>
              <input
                type="number"
                value={formData[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button
          onClick={calculateTotal}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 font-medium transition transform hover:scale-105"
        >
          Calculate Total
        </button>

        {results.total > 0 && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-200">Basic Cost:</span>
              <span className="text-xl text-gray-100">₹{results.basic.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold text-lg text-gray-200">Total Cost:</span>
              <span className="text-2xl font-bold text-green-400">₹{results.total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ====== ENQUIRY FORM ======
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
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Enquire Now</h1>

      {submitted && (
        <div className="bg-green-900/60 border border-green-600 text-green-200 px-4 py-3 rounded mb-6">
          Thank you! We'll get back to you soon.
        </div>
      )}

      <div className="bg-gray-900/70 rounded-lg shadow-lg p-8 border border-gray-800 space-y-6">
        <div>
          <label className="block font-medium mb-2 text-gray-200">Your Enquiry</label>
          <textarea
            value={formData.enquiry}
            onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
            placeholder="Type your enquiry..."
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-200">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-200">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="+91 xxxxx xxxxx"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 font-medium transition transform hover:scale-105"
        >
          Submit Enquiry
        </button>
      </div>
    </div>
  );
};

// ====== EMI CALCULATOR ======
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
    <div className="bg-gray-900/70 rounded-lg shadow-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-400" />
        <h2 className="text-2xl font-bold text-white">EMI Calculator</h2>
      </div>

      <div className="space-y-4 text-gray-200">
        <div>
          <label className="block font-medium mb-2">Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            disabled
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Down Payment (₹)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="text-sm text-gray-400 mt-1">
            {((downPayment / propertyPrice) * 100).toFixed(1)}% of property price
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => handleLoanChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Interest Rate (% per annum)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-indigo-600 text-white rounded-lg hover:from-green-500 hover:to-indigo-500 font-medium transition transform hover:scale-105"
        >
          Calculate EMI
        </button>

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg border border-gray-700">
            <div className="space-y-3 text-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Monthly EMI:</span>
                <span className="text-2xl font-bold text-green-400">₹{result.emi.toLocaleString()}</span>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between">
                <span className="text-gray-400">Principal Amount:</span>
                <span className="font-semibold">₹{result.principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Interest:</span>
                <span className="font-semibold text-orange-400">₹{result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount Payable:</span>
                <span className="font-semibold">₹{result.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ====== NEARBY PLACES ======
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
    <div className="bg-gray-900/70 rounded-lg shadow-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">Nearby Places</h2>
      </div>

      <div className="space-y-6 text-gray-200">
        {nearbyPlaces.map((category, idx) => (
          <div key={idx} className="border-b border-gray-800 pb-4 last:border-b-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-indigo-400">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-200">{category.category}</h3>
            </div>
            <div className="space-y-2 ml-7">
              {category.places.map((place, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{place.name}</span>
                  <span className="text-sm font-medium text-indigo-300">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-2 border-2 border-indigo-600 text-indigo-300 rounded-lg hover:bg-indigo-800/40 font-medium transition">
          View on Map
        </button>
      </div>
    </div>
  );
};

// ====== INVESTMENT ANALYSIS ======
const InvestmentAnalysis = ({ propertyPrice, location }) => {
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const appreciationRate = 8; // 8% per year average
    const rentalYield = 3; // 3% per year
    const maintenanceCost = 1; // 1% per year

    const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, investmentPeriod);
    const capitalGain = futureValue - propertyPrice;
    const totalRentalIncome = (propertyPrice * rentalYield) / 100 * investmentPeriod;
    const totalMaintenance = (propertyPrice * maintenanceCost) / 100 * investmentPeriod;
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
    <div className="bg-gray-900/70 rounded-lg shadow-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Investment Analysis</h2>
      </div>

      <div className="space-y-4 text-gray-200">
        <div>
          <label className="block font-medium mb-2">Current Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            disabled
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
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
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={calculateInvestment}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 font-medium transition transform hover:scale-105"
        >
          Analyze Investment
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/10 rounded-lg border border-purple-700">
              <div className="text-center mb-2">
                <span className="text-sm text-gray-400">Projected Future Value</span>
                <div className="text-3xl font-bold text-purple-400">₹{result.futureValue.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-700">
                <div className="text-xs text-gray-400 mb-1">Capital Gain</div>
                <div className="text-lg font-bold text-green-400">₹{result.capitalGain.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700">
                <div className="text-xs text-gray-400 mb-1">Rental Income</div>
                <div className="text-lg font-bold text-indigo-300">₹{result.totalRentalIncome.toLocaleString()}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Expected Monthly Rent:</span>
                  <span className="font-semibold">₹{result.monthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Maintenance Cost:</span>
                  <span className="font-semibold text-orange-400">-₹{result.totalMaintenance.toLocaleString()}</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-200">Net Gain:</span>
                  <span className="text-xl font-bold text-green-400">₹{result.netGain.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 rounded-lg border border-yellow-800">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Total ROI</div>
                  <div className="text-2xl font-bold text-orange-400">{result.roi}%</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Annualized ROI</div>
                  <div className="text-2xl font-bold text-orange-400">{result.annualizedROI}%</div>
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

// ====== APP CONTENT & ROUTING (simple internal routing) ======
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState({});
  const [user, setUser] = useState(null);

  const handleNavigate = (page, pageParams = {}) => {
    setCurrentPage(page);
    setParams(pageParams);
    // scroll to top for nicer UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage('home'); // Redirect to home after login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'property':
        return <PropertyShow propertyName={params.name} onNavigate={handleNavigate} />;
      case 'calculator':
        return <Calculator propertyId={params.id} />;
      case 'enquiry':
        return <EnquiryForm />;
      case 'story':
        return (
          <div className="text-center py-20 text-gray-200">
            <h1 className="text-3xl font-bold">Our Story</h1>
            <p className="mt-4 text-gray-400">Coming soon...</p>
          </div>
        );
      case 'contact':
        return (
          <div className="text-center py-20 text-gray-200">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-4 text-gray-400">Coming soon...</p>
          </div>
        );
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <Navbar onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <main className="flex-1 container mx-auto px-6 py-10">{renderPage()}</main>
      <Footer />
    </div>
  );
}

// ====== MAIN APP ======
export default function App() {
  return (
    <GoogleOAuthProvider clientId="286883709485-u64618t640d2uvlto2uqrfhf2invbaoi.apps.googleusercontent.com">
      <AppContent />
    </GoogleOAuthProvider>
  );
}

// ====== Named exports (kept for compatibility) ======
export { EMICalculator, NearbyPlaces, InvestmentAnalysis };
