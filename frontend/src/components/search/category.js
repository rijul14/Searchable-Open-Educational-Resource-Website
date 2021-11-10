import React from "react";
import "./category.css"

export default function Category({ category, options, onChange }) {
    return (
        <div className="p-4">
            <div className="categoryName">{category}</div>
            <div className="options">
                {options.map((option, index) => (
                    <div>
                        <input onChange={() => onChange(option)} className="input" key={index} type="checkbox"/>{option}
                    </div>
                ))}
            </div>
        </div>
    )
}