import type { Category } from '../types';

interface CategoryInfo {
  category: Category;
  count: number;
  filteredCount: number;
}

interface CategorySidebarProps {
  categories: CategoryInfo[];
  activeCategory: Category | null;
  onSelect: (cat: Category | null) => void;
  open: boolean;
  onClose: () => void;
}

export function CategorySidebar({
  categories,
  activeCategory,
  onSelect,
  open,
  onClose,
}: CategorySidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 pt-16 overflow-y-auto border-r transition-transform lg:static lg:translate-x-0 lg:z-0 lg:pt-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-950 border-gray-800 dark:bg-gray-950 dark:border-gray-800`}
        style={{ scrollbarWidth: 'thin' }}
      >
        <nav className="px-3 py-4">
          <button
            onClick={() => onSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
              activeCategory === null
                ? 'bg-indigo-600/20 text-indigo-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            All Examples
          </button>
          {categories.map(({ category, count }) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm mb-0.5 transition-colors flex justify-between items-center ${
                activeCategory === category
                  ? 'bg-indigo-600/20 text-indigo-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <span className="truncate">{category}</span>
              <span className="ml-2 text-xs tabular-nums opacity-60">{count}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
