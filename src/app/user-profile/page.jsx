'use client'

import { useState } from 'react';

export default function UserPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        // onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Upload & Contact</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. +1234567890"
            // value={phone}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
