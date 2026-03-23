'use client'

import { useState, useEffect } from 'react'
import { Resource, typeColors, typeEmoji } from './resourceData'

interface ResourceCardProps {
  resource: Resource
  index?: number
}

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Persist bookmark state
  useEffect(() => {
    const saved = localStorage.getItem(`bookmark-${resource.id}`)
    if (saved) setBookmarked(true)
  }, [resource.id])

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    const next = !bookmarked
    setBookmarked(next)
    if (next) localStorage.setItem(`bookmark-${resource.id}`, '1')
    else localStorage.removeItem(`bookmark-${resource.id}`)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(window.location.href + `#resource-${resource.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const colors = typeColors[resource.type]
  const emoji = typeEmoji[resource.type]

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bookmarkPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .card-animate {
          animation: cardIn 0.4s ease-out both;
          animation-delay: ${Math.min(index * 60, 400)}ms;
        }
        .bookmark-pop { animation: bookmarkPop 0.3s ease-out; }
      `}</style>

      <div
        id={`resource-${resource.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`card-animate group relative bg-white border-2 border-black rounded-2xl overflow-hidden flex flex-col transition-all duration-200 cursor-pointer ${
          hovered ? 'shadow-[6px_6px_0px_0px_#000] -translate-x-[2px] -translate-y-[2px]' : 'shadow-[3px_3px_0px_0px_#000]'
        }`}
      >
        {/* Top color bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: colors.bg }} />

        {/* Badge row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-2">
            {/* Type badge */}
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wide"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {emoji} {resource.type}
            </span>
            {/* NEW badge */}
            {resource.new && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-black text-white uppercase tracking-wide">
                NEW
              </span>
            )}
            {/* TRENDING badge */}
            {resource.trending && !resource.new && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black border-2 border-black text-black uppercase tracking-wide">
                🔥 Hot
              </span>
            )}
          </div>

          {/* Bookmark */}
          <button
            onClick={toggleBookmark}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
              bookmarked
                ? 'bg-black border-black text-white'
                : 'border-gray-300 text-gray-400 hover:border-black hover:text-black'
            }`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-2 flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{resource.code} · {resource.branch} · {resource.semester} Sem</p>
          <h3 className="text-lg font-black text-black leading-tight mb-2 line-clamp-2 group-hover:underline decoration-2 underline-offset-2">
            {resource.subject}
          </h3>
          <p className="text-sm text-gray-600 leading-snug line-clamp-2 mb-3">
            {resource.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {resource.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-semibold text-gray-600">
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-semibold text-gray-400">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black px-4 py-3 bg-gray-50 flex items-center justify-between gap-2">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {resource.downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              ⭐ {resource.rating}
            </span>
            <span>by {resource.uploader}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Share */}
            <button
              onClick={handleShare}
              className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-150"
              aria-label="Copy link"
            >
              {copied
                ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              }
            </button>

            {/* View / Download */}
            <a
              href={resource.link}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-black rounded-full hover:bg-gray-800 transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
