"use client";
import React, { useState } from "react";
import blogdata from "../src/constants/data.json";

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

      canvas.toBlob(
        (newBlob) => {
          const file = new File([newBlob], filename, { type: "image/avif" });
          resolve(file);
        },
        "image/avif",
        0.8
      );
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

const UpdateExistingEntries = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    debugger;
    setStatus(null);
    setLoading(true);

    for (const product of blogdata) {
      try {
        // 1. Find existing entry by title
        const findRes = await fetch(
          `${STRAPI_URL}/api/blogsdatas?filters[name][$eq]=${encodeURIComponent(
            product.name
          )}&populate=*`
        );
        const findData = await findRes.json();
        const existing = findData.data?.[0];

        if (!existing) {
          console.warn("Entry not found:", product.name);
          continue;
        }

        let imagePath = null;

        try {
          const parsedImage = JSON.parse(product.image);
          if (parsedImage?.url) {
            imagePath = parsedImage.url;
          }
        } catch (e) {
          console.warn("Image field is not valid JSON:", product.name);
        }

        const imageId = imagePath ? await uploadUserImage(imagePath) : null;
        if (!imageId) {
          console.warn("Image upload failed for:", product.name);
          continue;
        }

        const updateRes = await fetch(
          `${STRAPI_URL}/api/blogsdatas/${existing.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                image: imageId ? imageId : null,
              },
            }),
          }
        );

        const updateData = await updateRes.json();
        console.log(" Updated:", updateData);
      } catch (err) {
        console.error("Failed to update:", product.name, err);
      }
    }

    setLoading(false);
    setStatus("Update completed successfully.");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <button
        onClick={handleImport}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Start Image Update"}
      </button>

      {status && <p style={{ marginTop: "1rem", color: "green" }}>{status}</p>}
    </div>
  );
};

export default UpdateExistingEntries;
