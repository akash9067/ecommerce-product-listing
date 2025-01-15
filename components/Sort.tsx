interface SortProps {
  onSortChange: (option: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="mb-4 flex items-center flex-row">
      <label htmlFor="sort-by" className="block text-sm font-medium mb-2 w-32">
        Sort By
      </label>
      <select
        id="sort-by"
        className="w-full p-2 border rounded-md"
        defaultValue="Most Popular"
        onChange={handleSortChange}
      >
        <option value="Most Popular">Most Popular</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
