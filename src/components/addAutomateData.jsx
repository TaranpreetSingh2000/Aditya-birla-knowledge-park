"use client";
import React, { useState } from "react";
import products from "../constants/watches.json";

const AutomateData = () => {
  const [update, setUpdate] = useState(false);
  const STRAPI_URL = "http://localhost:1337";

  async function convertBlobToPng(blob, filename) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((newBlob) => {
          const file = new File([newBlob], filename, { type: "image/avif" });
          resolve(file);
        }, "image/avif");
      };

      img.src = url;
    });
  }

  const uploadUserImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const jpegBlob = await response.blob();
      let filename = imageUrl.split("/").pop() || "upload.jpg";

      filename = filename.includes("_")
        ? filename.split("_").join("").toLowerCase()
        : filename.toLowerCase();

      let file;
      if (jpegBlob.type === "image/jpeg") {
        file = await convertBlobToPng(jpegBlob, filename);
      } else {
        file = new File([jpegBlob], filename, { type: jpegBlob.type });
      }

      const formData = new FormData();
      formData.append("files", file);

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
