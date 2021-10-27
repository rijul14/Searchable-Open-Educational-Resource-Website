import React from "react";
import "./category.css"

export default function Category({ category, options }) {
    return (
        <div className="p-4">
            <div className="categoryName">{category}</div>
            <div className="options">
                {options.map((option, index) => (
                    <div>
                        <input className="input" key={index} type="checkbox"/>{option}
                    </div>
                ))}
            </div>
        </div>
    )
}