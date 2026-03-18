import { CodeCard } from './CodeCard';
import type { CuratedExample } from '../types';

interface GalleryProps {
  examples: CuratedExample[];
  highlightId: string | null;
  dark: boolean;
}

export function Gallery({ examples, highlightId, dark }: GalleryProps) {
  if (examples.length === 0) {
    return (
      <div className="text-center py-20">
        <p className={`text-lg ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          No examples match your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {examples.map((ex) => (
        <CodeCard
          key={ex.id}
          example={ex}
          highlight={highlightId === ex.id}
          dark={dark}
        />
      ))}
    </div>
  );
}
