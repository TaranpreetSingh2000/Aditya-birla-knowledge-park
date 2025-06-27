"use client";
import React, { useEffect } from "react";

import watches from "../constants/products";

const AddData = () => {
  useEffect(() => {
    const STRAPI_URL = "http://localhost:1339";

    const sendDataToStrapi = async () => {
      debugger;
      for (const watch of watches.results[0].hits) {
        const payload = {
          data: {
            objectID: watch.objectID,
            name: watch.name,
            price: watch.price,
            description: watch.description,
            free_shipping: watch.free_shipping,
            image: watch.image,
            popularity: watch.popularity,
            type: watch.type,
          },
        };

        try {
          const response = await fetch(`${STRAPI_URL}/api/amazons`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(
              `Failed: ${watch.name} | Status: ${response.status}`
            );
          }

          if (response.status === 200) {
            const resData = await response.json();
            console.log("Added:", resData.data.name);
          }
        } catch (error) {}
      }
    };

    sendDataToStrapi();
  }, []);

  return (
    <div className="p-4 text-green-700">Sending watches data to Strapi...</div>
  );
};

export default AddData;
