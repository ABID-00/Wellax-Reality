import React from "react";

const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-16 text-gray-200 animate-fadeIn">
      <section className="text-center py-24 bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-900 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold mb-4 text-white tracking-wide">
          Welcome to Wellax Reality
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Find Your Dream Property with Confidence
        </p>
        <button
          onClick={() => onNavigate("allprojects")}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md transition-transform transform hover:scale-105"
        >
          Explore Projects
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "🏢",
            title: "Premium Properties",
            desc: "Luxury apartments and villas in prime locations",
          },
          {
            icon: "💰",
            title: "Cost Calculator",
            desc: "Transparent pricing with detailed breakdowns",
          },
          {
            icon: "🤝",
            title: "Expert Guidance",
            desc: "Professional support throughout your journey",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/30 transition-transform transform hover:scale-105 backdrop-blur-md"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
