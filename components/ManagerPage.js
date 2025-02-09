// import React from 'react'

// const ManagerPage = () => {
//   return (
//     <div className='text-black'>
//       Manager page
//     </div>
//   )
// }

// export default ManagerPage
// implement sections for manage other garages or all garages to oversee their oeperations and occupance, and another section for qr code verification of user with confirmed booking spot


"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { createGarage, getGaragesByManager } from "@/utils/actions/garageActions";

const ManagerPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("addGarage"); // Track active section
  const [garages, setGarages] = useState([]);
  const [garage, setGarage] = useState({
    name: "",
    location: "",
    capacity: 0,
    managerEmail: "",
  });

  // Auto-set manager email when Clerk user loads
  useEffect(() => {
    console.log("Manager Email:", user.primaryEmailAddress?.emailAddress);
    if (user) {
      setGarage((prev) => ({
        ...prev,
        managerEmail: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  // Fetch garages for the signed-in manager
  const fetchGarages = async () => {
    if (user) {
      const email = user.primaryEmailAddress?.emailAddress;
      const fetchedGarages = await getGaragesByManager(email);
      setGarages(fetchedGarages);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGarage((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Math.max(0, parseInt(value) || 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!garage.name.trim() || !garage.location.trim() || garage.capacity < 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const response = await createGarage(garage);
      if (response?.success) {
        alert("Garage added successfully!");
        setGarage({ name: "", location: "", capacity: 0, managerEmail: user.primaryEmailAddress?.emailAddress || "" });
      } else {
        alert("Failed to add garage.");
      }
    } catch (error) {
      console.error("Error creating garage:", error);
      alert("An error occurred.");
    }
  };

  return (
    <main className="relative min-h-screen bg-white flex flex-col items-center">
      {/* 🚀 Navigation Bar */}
      <nav className="w-full bg-amber-400 text-black py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-around font-semibold text-lg">
          <button className={`px-6 py-2 ${activeTab === "addGarage" ? "underline" : ""}`} onClick={() => setActiveTab("addGarage")}>
            Add Garage
          </button>
          <button className={`px-6 py-2 ${activeTab === "manageGarages" ? "underline" : ""}`} onClick={() => { setActiveTab("manageGarages"); fetchGarages(); }}>
            Manage Garages
          </button>
          <button className={`px-6 py-2 ${activeTab === "verifyRequests" ? "underline" : ""}`} onClick={() => setActiveTab("verifyRequests")}>
            Verify Requests
          </button>
        </div>
      </nav>

      {/* 🚀 Add Garage Section */}
      {activeTab === "addGarage" && (
        <div className="p-8 w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
          <h2 className="text-3xl font-bold text-black text-center mb-6">Add New Garage</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="name" placeholder="Garage Name" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-black" value={garage.name} onChange={handleChange} required />
            <input type="text" name="location" placeholder="Garage Location" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-black" value={garage.location} onChange={handleChange} required />
            <input type="number" name="capacity" placeholder="4-Wheeler Capacity" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-black" value={garage.capacity} onChange={handleChange} min="0" required />
            <button type="submit" className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-md shadow-md hover:bg-yellow-600 transition">
              Add Garage
            </button>
          </form>
        </div>
      )}

      {/* 🚀 Manage Garages Section */}
      {activeTab === "manageGarages" && (
        <div className="p-8 w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
          <h2 className="text-3xl font-bold text-black text-center mb-6">Your Garages</h2>
          <div className="space-y-4">
            {garages.length > 0 ? (
              garages.map((garage) => (
                <div key={garage._id} className="p-4 border rounded-lg shadow-sm bg-gray-100">
                  <h3 className="text-2xl font-semibold text-black">{garage.name}</h3>
                  <p className="text-gray-600">{garage.location}</p>
                  <p className="text-gray-700">Capacity: {garage.capacity}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No garages found.</p>
            )}
          </div>
        </div>
      )}

      {/* 🚀 Verify Requests Section (Blank for now) */}
      {activeTab === "verifyRequests" && (
        <div className="p-8 w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
          <h2 className="text-3xl font-bold text-black text-center mb-6">Verify User Parking Requests</h2>
          <p className="text-gray-500 text-center">This section will be implemented later.</p>
        </div>
      )}
    </main>
  );
};

export default ManagerPage;
