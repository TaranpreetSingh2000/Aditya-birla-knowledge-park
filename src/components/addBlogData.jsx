"use client";
import React, { useState } from "react";
import products from "../constants/blog.json";

const BlogData = () => {
  const STRAPI_URL = "http://localhost:1338";

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
      let filename = imageUrl.split("/").pop();

      filename = filename.includes("_")
        ? filename.split("_").join("").toLowerCase()
        : filename.toLowerCase();

      filename = filename.includes("-")
        ? filename.split("-").join("")
        : filename;

      filename = filename.includes("?") ? filename.split("?")[0] : filename;

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

  const handleImport = async () => {
    debugger;

    for (const product of products) {
      try {
        const imageId = await uploadUserImage(product.image);

        const res = await fetch(`${STRAPI_URL}/api/blog-articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...product,
              image: imageId,
            },
          }),
        });

        const result = await res.json();
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

export default BlogData;
