"use client";

import React, { useState, useEffect } from "react";

interface Filter {
  category: string;
  items: string[];
}

interface FilterProps {
  onFilterChange: (filters: string[]) => void;
  selectedFilters: string[]; // Accept selected filters from query
}

const FilterComponent: React.FC<FilterProps> = ({
  onFilterChange,
  selectedFilters,
}) => {
  console.log("TCL: selectedFilters", selectedFilters);
  const [activeFilters, setActiveFilters] = useState<string[]>(selectedFilters);
  console.log("TCL: activeFilters", activeFilters);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const filters: Filter[] = [
    { category: "Brand", items: ["Mobil", "Old World", "Peak"] },
    {
      category: "Viscosity",
      items: ["0W-20", "0W-30", "5W-20", "5W-30", "10W-30", "10W-40"],
    },
    {
      category: "Size",
      items: [
        "1 Quart",
        "5 Quarts",
        "1 Gallon",
        "Bulk 1 Drum",
        "Bulk 1 Tote",
        "Half-Quart",
      ],
    },
  ];

  useEffect(() => {
    setActiveFilters(selectedFilters); // Update state when selectedFilters prop changes
  }, [selectedFilters]);

  const handleFilterClick = (filter: string) => {
    const updatedFilters = [...activeFilters];
    if (activeFilters.includes(filter)) {
      const index = updatedFilters.indexOf(filter);
      updatedFilters.splice(index, 1);
    } else {
      updatedFilters.push(filter);
    }
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="w-full max-w-sm p-4 border shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sort & Filters</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters &&
            activeFilters?.map((filter, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm py-1 px-2 rounded-full flex items-center"
              >
                {filter}
                <button
                  onClick={() => handleFilterClick(filter)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </span>
            ))}
        </div>
      </div>

      {filters.map((filter) => (
        <div key={filter.category} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleCategory(filter.category)}
          >
            <h4 className="text-sm font-medium">{filter.category}</h4>
            <span>
              {expandedCategories.includes(filter.category) ? "−" : "+"}
            </span>
          </div>
          {expandedCategories.includes(filter.category) && (
            <ul className="mt-2 pl-2">
              {filter.items.map((item) => (
                <li key={item} className="mb-1">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={activeFilters.includes(item)}
                      onChange={() => handleFilterClick(item)}
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
