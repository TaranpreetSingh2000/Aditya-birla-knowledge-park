import Link from 'next/link'
import React from 'react'

const RecommendationQuestionSection = ({ question, questionId, showProducts, products, form, onRadioChange, number, isLast }) => {
    const borderClass = isLast ? '' : 'border-b border-gray-200';
    return (
        <li className="flex items-end justify-between ">
            <div className={`flex justify-between w-2/3 py-4 px-2 ${borderClass}`}>
                <p className="text-base text-gray-600 font-semibold"><span>{number}. </span>{question.displayName}</p>
                <div className="flex gap-6">
                    {["yes", "no"].map(value => (
                        <label key={value} className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`goal-${question.id}`}
                                value={value}
                                checked={form.goals[questionId] === (value === "yes")}
                                onChange={() => onRadioChange(questionId, value === "yes")}
                                className="accent-red-700 scale-150"
                            />
                            <span className="ml-2 text-xs font-xs text-stone-500">
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={`w-1/4 text-right py-4 ${borderClass}`}>
                {showProducts && products.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={product.productLink}
                                target={product?.openInNewTab ? "_blank" : "_self"}
                                className="text-red-700 font-semibold text-base underline cursor-pointer whitespace-nowrap"
                            >
                                {product.productName}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </li>
    )
}

export default RecommendationQuestionSection