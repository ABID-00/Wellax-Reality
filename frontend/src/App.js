// App.js
import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PropertyShow from "./components/PropertyShow";
import Calculator from "./components/Calculator";
import EnquiryForm from "./components/EnquiryForm";
import Auth from "./Auth";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [params, setParams] = useState({});
  const [user, setUser] = useState(null);

  const handleNavigate = (page, pageParams = {}) => {
    setCurrentPage(page);
    setParams(pageParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "property":
        return (
          <PropertyShow
            propertyName={params.name}
            onNavigate={handleNavigate}
          />
        );
      case "calculator":
        return <Calculator propertyId={params.id} />;
      case "enquiry":
        return <EnquiryForm />;
      case "auth":
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

export default function App() {
  return (
    <GoogleOAuthProvider clientId="286883709485-u64618t640d2uvlto2uqrfhf2invbaoi.apps.googleusercontent.com">
      <AppContent />
    </GoogleOAuthProvider>
  );
}
