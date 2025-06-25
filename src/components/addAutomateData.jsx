"use client";
import React from "react";
import products from "../constants/data.json";

const AutomateData = () => {
  const STRAPI_URL = "http://localhost:1339/api/products";

  const handleImport = async () => {
    debugger
    for (const product of products) {
      try {
        const response = await fetch(STRAPI_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({
            data: {
              ...product,
            },
          }),
        });

        const result = await response.json();
        console.log(result);
        console.log("Created:", result);
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleImport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Import Products
      </button>
    </div>
  );
};

export default AutomateData;
