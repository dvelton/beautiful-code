import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CATEGORIES, type Category, type CuratedExample } from './types';
import { examples } from './lib/curated';
import { Header } from './components/Header';
import { CategorySidebar } from './components/CategorySidebar';
import { SearchBar } from './components/SearchBar';
import { Gallery } from './components/Gallery';

function getCategoryFromHash(): Category | null {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  return CATEGORIES.find((c) => slugify(c) === hash) ?? null;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const PAGE_SIZE = 30;

const categoryCounts = CATEGORIES.map((cat) => ({
  category: cat,
  count: examples.filter((ex: CuratedExample) => ex.category === cat).length,
  filteredCount: 0,
}));

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    getCategoryFromHash,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.className = 'bg-gray-950 text-gray-100 transition-colors';
      document.getElementById('hljs-dark')?.removeAttribute('disabled');
      document.getElementById('hljs-light')?.setAttribute('disabled', '');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.className = 'bg-white text-gray-900 transition-colors';
      document.getElementById('hljs-light')?.removeAttribute('disabled');
      document.getElementById('hljs-dark')?.setAttribute('disabled', '');
    }
  }, [dark]);

  const handleCategorySelect = useCallback((cat: Category | null) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setSidebarOpen(false);
    if (cat) {
      history.replaceState(null, '', '#' + slugify(cat));
    } else {
      history.replaceState(null, '', window.location.pathname);
    }
    mainRef.current?.scrollTo(0, 0);
  }, []);

  const handleSurprise = useCallback(() => {
    const idx = Math.floor(Math.random() * examples.length);
    const entry = examples[idx];
    setActiveCategory(null);
    setSearchQuery('');
    // Render enough cards so the random pick is actually in the DOM
    setVisibleCount(Math.max(PAGE_SIZE, idx + 1));
    setHighlightId(entry.id);
    history.replaceState(null, '', window.location.pathname);
    setTimeout(() => {
      document.getElementById(`card-${entry.id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 50);
    setTimeout(() => setHighlightId(null), 2000);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const filtered = useMemo(() =>
    examples.filter((ex: CuratedExample) => {
      if (activeCategory && ex.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ex.title.toLowerCase().includes(q) ||
          ex.language.toLowerCase().includes(q) ||
          ex.conceptTags.some((t) => t.toLowerCase().includes(q)) ||
          ex.explanation.toLowerCase().includes(q) ||
          ex.whyElegant.toLowerCase().includes(q) ||
          ex.keyInsight.toLowerCase().includes(q)
        );
      }
      return true;
    }),
    [activeCategory, searchQuery],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className={`min-h-screen flex flex-col ${dark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      <Header
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onSurprise={handleSurprise}
        onMenuToggle={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar
          categories={categoryCounts}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          dark={dark}
        />
        <main ref={mainRef} className="flex-1 overflow-y-auto px-4 pb-12 pt-4 lg:px-8">
          <SearchBar value={searchQuery} onChange={handleSearch} dark={dark} />
          <p className={`mt-2 mb-6 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filtered.length} of {examples.length} examples
            {activeCategory ? ` in ${activeCategory}` : ''}
            {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}
          </p>
          <Gallery examples={visible} highlightId={highlightId} dark={dark} />
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  dark
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Show more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
