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
  dark: boolean;
}

export function CategorySidebar({
  categories,
  activeCategory,
  onSelect,
  open,
  onClose,
  dark,
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
        className={`fixed inset-y-0 left-0 z-40 w-64 pt-16 overflow-y-auto border-r transition-transform lg:static lg:translate-x-0 lg:z-0 lg:pt-4 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } ${
          dark
            ? 'bg-gray-950 border-gray-800'
            : 'bg-gray-50 border-gray-200'
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        <nav className="px-3 py-4">
          <button
            onClick={() => onSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
              activeCategory === null
                ? 'bg-indigo-600/20 text-indigo-400'
                : dark
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
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
                  : dark
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
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
