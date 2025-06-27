"use client";
import React, { useState } from "react";
import products from "../constants/watches.json";

const AutomateData = () => {
  const [update, setUpdate] = useState(false);
  const STRAPI_URL = "http://localhost:1337";

  // 1. Upload image to Strapi
  const uploadUserImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      let filename = imageUrl.split("/").pop();

      filename = filename.includes("_")
        ? filename.split("_").join("").toLowerCase()
        : filename.toLowerCase();

      const formData = new FormData();
      formData.append("files", blob, filename);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      return uploadData[0]?.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // 2. Main product import function
  const handleImport = async () => {
    setUpdate(false);
    debugger;
    for (const product of products) {
      try {
        const imageId = await uploadUserImage(product.image);

        const res = await fetch(`${STRAPI_URL}/api/blogsdatas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...product,
              image: imageId ? imageId : null,
            },
          }),
        });

        const result = await res.json();
        setUpdate(true);
        console.log("✅ Created:", result);
      } catch (error) {
        console.error("❌ Failed to create product:", error);
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

      {update && <p>✅ Data updated successfully</p>}
    </div>
  );
};

export default AutomateData;
