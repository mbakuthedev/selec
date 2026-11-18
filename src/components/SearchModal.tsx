import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchProducts } from '../lib/catalog'

export function SearchModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const results = useMemo(() => (query.trim().length < 2 ? [] : searchProducts(query).slice(0, 8)), [query])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] grid place-items-start bg-black/50 px-4 pt-[12vh]" onClick={onClose}>
      <div className="w-full max-w-[640px] bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <form
          className="flex items-center border-b border-[#eee]"
          onSubmit={(event) => {
            event.preventDefault()
            if (!query.trim()) return
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            onClose()
          }}
        >
          <Search size={18} className="ml-4 text-[#888]" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Our Products..."
            className="h-14 flex-1 px-3 text-[15px] outline-none"
            aria-label="Search Our Products"
          />
          <button type="button" className="px-4 text-[#666]" aria-label="Close search" onClick={onClose}>
            <X size={18} />
          </button>
        </form>
        {query.trim().length >= 2 && (
          <ul>
            {results.length === 0 && <li className="px-4 py-4 text-[13px] text-[#666]">No matching products.</li>}
            {results.map((product) => (
              <li key={product.slug} className="border-t border-[#f3f3f3]">
                <Link to={`/product-details/${product.slug}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafafa]" onClick={onClose}>
                  <img src={product.image} alt="" className="h-12 w-12 object-contain" />
                  <span>
                    <span className="block text-[13px] font-semibold">{product.name}</span>
                    <span className="text-[12px] text-brand">{product.model}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="border-t border-[#f3f3f3]">
              <button
                type="submit"
                className="w-full px-4 py-3 text-left text-[13px] font-bold text-brand"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(query.trim())}`)
                  onClose()
                }}
              >
                View all results
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
