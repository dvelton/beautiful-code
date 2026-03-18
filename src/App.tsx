import { useState, useEffect, useCallback, useRef } from 'react';
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

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    getCategoryFromHash,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onHash = () => setActiveCategory(getCategoryFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleCategorySelect = useCallback((cat: Category | null) => {
    setActiveCategory(cat);
    setSidebarOpen(false);
    if (cat) {
      window.location.hash = slugify(cat);
    } else {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleSurprise = useCallback(() => {
    const idx = Math.floor(Math.random() * examples.length);
    const entry = examples[idx];
    setActiveCategory(null);
    setSearchQuery('');
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

  const filtered = examples.filter((ex: CuratedExample) => {
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
  });

  const categoryCounts = CATEGORIES.map((cat) => ({
    category: cat,
    count: examples.filter((ex: CuratedExample) => ex.category === cat).length,
    filteredCount: filtered.filter((ex) => ex.category === cat).length,
  }));

  return (
    <div className="min-h-screen flex flex-col">
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
        />
        <main className="flex-1 overflow-y-auto px-4 pb-12 pt-4 lg:px-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <p className={`mt-2 mb-6 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filtered.length} of {examples.length} examples
            {activeCategory ? ` in ${activeCategory}` : ''}
            {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}
          </p>
          <div ref={galleryRef}>
            <Gallery examples={filtered} highlightId={highlightId} dark={dark} />
          </div>
        </main>
      </div>
    </div>
  );
}
