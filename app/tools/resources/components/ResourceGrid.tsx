'use client'

import { useState, useMemo } from 'react'
import { Resource } from './resourceData'
import ResourceCard from './ResourceCard'

type SortOption = 'downloads' | 'rating' | 'newest' | 'name'

interface ResourceGridProps {
  resources: Resource[]
  searchQuery: string
}

const sortLabels: Record<SortOption, string> = {
  downloads: '🔥 Most Downloaded',
  rating: '⭐ Top Rated',
  newest: '🆕 Newest',
  name: '🔤 A–Z',
}

export default function ResourceGrid({ resources, searchQuery }: ResourceGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('downloads')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const sorted = useMemo(() => {
    const arr = [...resources]
    if (sortBy === 'downloads') return arr.sort((a, b) => b.downloads - a.downloads)
    if (sortBy === 'rating') return arr.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'newest') return arr.sort((a, b) => b.id - a.id)
    if (sortBy === 'name') return arr.sort((a, b) => a.subject.localeCompare(b.subject))
    return arr
  }, [resources, sortBy])

  return (
    <div>
      <style>{`
        @keyframes emptyBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .empty-icon { animation: emptyBounce 2s ease-in-out infinite; }
        @keyframes listIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .grid-appear { animation: listIn 0.3s ease-out both; }
      `}</style>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm font-black text-gray-500 uppercase tracking-wide">
          {resources.length === 0
            ? 'No results'
            : `${resources.length} resource${resources.length !== 1 ? 's' : ''} found`}
          {searchQuery && (
            <span className="ml-2 text-black">for "{searchQuery}"</span>
          )}
        </p>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-2 border-2 border-black rounded-full text-xs font-bold bg-white cursor-pointer shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 outline-none"
            >
              {(Object.keys(sortLabels) as SortOption[]).map(k => (
                <option key={k} value={k}>{sortLabels[k]}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* View toggle */}
          <div className="flex border-2 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 transition-colors duration-150 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 transition-colors duration-150 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              aria-label="List view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid / List */}
      {sorted.length > 0 ? (
        <div
          className={`grid gap-5 grid-appear ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {sorted.map((r, i) => (
            <ResourceCard key={r.id} resource={r} index={i} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black rounded-3xl bg-gray-50">
          <div className="empty-icon text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-black mb-2">No resources found</h3>
          <p className="text-gray-500 font-medium text-center max-w-sm mb-6">
            {searchQuery
              ? `We couldn't find anything for "${searchQuery}". Try a different keyword or remove some filters.`
              : "No resources match the selected filters. Try changing your filters."}
          </p>
          <a
            href="mailto:resources@nextsem.igdtuw.ac.in"
            className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-[3px_3px_0px_#666]"
          >
            📤 Upload the first one!
          </a>
        </div>
      )}
    </div>
  )
}
