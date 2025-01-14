import React from "react";

const Sort = () => {
  return (
    <div className="mb-4 flex items-center flex-row ">
      <label htmlFor="sort-by" className="block text-sm font-medium mb-2 w-32">
        Sort By
      </label>
      <select
        id="sort-by"
        className="w-full p-2 border rounded-md"
        defaultValue="Most Popular"
      >
        <option value="Most Popular">Most Popular</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
        <option value="Newest">Newest</option>
      </select>
    </div>
  );
};

export default Sort;
