type FilterType = 'all' | 'active' | 'completed';

interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="filter-todo">
            <button
                className={currentFilter === 'all' ? 'active' : ''}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            <button
                className={currentFilter === 'active' ? 'active' : ''}
                onClick={() => onFilterChange('active')}
            >
                Active
            </button>
            <button
                className={currentFilter === 'completed' ? 'active' : ''}
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </button>
        </div>
    );
};

export default FilterButtons;