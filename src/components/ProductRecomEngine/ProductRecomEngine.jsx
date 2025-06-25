"use client";

import { useEffect, useState } from "react";
import RecommendationQuestionSection from "../RecommendationQuestionSection/RecommendationQuestionSection";

export default function ProductRecomEngine({
  recommendationRes,
  productFilter,
}) {
  console.log("ProductRecomEngine", productFilter);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [recommendedProductsByQuestion, setRecommendedProductsByQuestion] =
    useState({});
  const [options, setOptions] = useState({
    ageGroupData: [],
    genderData: [],
    employmentStatusData: [],
  });

  const [form, setForm] = useState({
    ageGroup: "",
    gender: "",
    employment: "",
    goals: {},
  });

  useEffect(() => {
    const ageGroups = new Set();
    const genders = new Set();
    const employmentStatuses = new Set();

    recommendationRes?.data?.forEach(
      ({ ageGroup, gender, employmentStatus }) => {
        ageGroup?.forEach((a) => ageGroups.add(a));
        gender?.forEach((g) => genders.add(g));
        employmentStatus?.forEach((e) => employmentStatuses.add(e));
      }
    );

    setOptions({
      ageGroupData: [...ageGroups],
      genderData: [...genders],
      employmentStatusData: [...employmentStatuses],
    });
  }, [recommendationRes]);

  useEffect(() => {
    debugger;
    if (!form.ageGroup || !form.gender || !form.employment) {
      setFilteredQuestions([]);
      return;
    }

    const matched = new Set();
    recommendationRes?.data?.forEach(
      ({ ageGroup, gender, employmentStatus, recommended_questions }) => {
        const isMatch =
          ageGroup?.includes(form?.ageGroup) &&
          gender?.includes(form?.gender) &&
          employmentStatus?.includes(form?.employment);

        if (isMatch && recommended_questions) {
          recommended_questions.forEach((q) => matched.add(q));
        }
      }
    );

    setFilteredQuestions([...matched]);
  }, [form, recommendationRes]);

  const handleSelectChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      goals: {},
    }));
    setRecommendedProductsByQuestion({});
  };

  const handleRadioChange = (documentId, value) => {
    setForm((prev) => ({
      ...prev,
      goals: { ...prev.goals, [documentId]: value },
    }));

    if (value === true) {
      const questionMatch = productFilter.data.find(
        (q) => q.documentId === documentId
      );
      const products = questionMatch?.recommended_products ?? [];

      setRecommendedProductsByQuestion((prev) => ({
        ...prev,
        [documentId]: products,
      }));
    } else {
      setRecommendedProductsByQuestion((prev) => {
        const updated = { ...prev };
        delete updated[documentId];
        return updated;
      });
    }
  };

  const filterFields = [
    { key: "ageGroup", label: "Select Age Group", data: options.ageGroupData },
    { key: "gender", label: "Select Gender", data: options.genderData },
    {
      key: "employment",
      label: "Select Employment Status",
      data: options.employmentStatusData,
    },
  ];

  return (
    <div className="m-20 p-6 bg-white rounded-2xl border-2 border-gray-200 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-red-600 pb-2">
          GENERATE YOUR PRODUCTS
        </h2>
        <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full absolute right-44 -top-4">
          Phase 1
        </span>
      </div>
      <h1 className="text-2xl font-semibold mt-2 pb-10">
        Product recommendation engine
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-3/5">
        {filterFields.map(({ key, label, data }) => (
          <div key={key} className="flex flex-col">
            <label
              htmlFor={key}
              className="mb-1 text-xs font-medium text-gray-700"
            >
              {label.replace("Select ", "")}
            </label>
            <div className="relative w-full">
              <select
                key={key}
                className="appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-stone-500 font-medium w-full"
                value={form[key]}
                onChange={(e) => handleSelectChange(key, e.target.value)}
              >
                <option value="" disabled>
                  {label}
                </option>
                {data.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Future Goals</h3>
        <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
      </div>

      <div className="w-full">
        {form.ageGroup && form.gender && form.employment ? (
          filteredQuestions.length ? (
            <ul>
              {filteredQuestions.map((question, index) => {
                const questionId = question.documentId;
                const showProducts = form.goals[questionId] === true;
                const products =
                  recommendedProductsByQuestion[questionId] || [];

                return (
                  <RecommendationQuestionSection
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    showProducts={showProducts}
                    products={products}
                    form={form}
                    onRadioChange={handleRadioChange}
                    number={index + 1}
                    isLast={index === filteredQuestions.length - 1}
                  />
                );
              })}
            </ul>
          ) : (
            <h2>No Data Available</h2>
          )
        ) : null}
      </div>
    </div>
  );
}
