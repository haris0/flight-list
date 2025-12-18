interface SortViewProps {
  sortOptions: Record<string, string>;
  selectedSortMode: string;
  handeSortOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
  
const SortView = ({
  sortOptions,
  selectedSortMode,
  handeSortOptionChange,
}: SortViewProps) => {
  return Object.entries(sortOptions).map(([value, label]) => (
    <label key={value} className="flex items-center gap-3 p-1 cursor-pointer justify-between">
      <span>{label}</span>
      <div className="relative">
        <input
          type="radio"
          name="option"
          value={value}
          checked={selectedSortMode === value}
          onChange={handeSortOptionChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSortMode === value ? 'border-orange-500' : 'border-gray-300'}`}>
          {selectedSortMode === value && (
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500"/>
          )}
        </div>
      </div>
    </label>
  ));
};

export default SortView;
