import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Menu, Search, UserRound } from 'lucide-react'

function TopBar({ calves, feedStocks, onMenuClick }) {
  const [query, setQuery] = useState('')
  const searchText = query.trim().toLocaleLowerCase('tr-TR')

  const calfResults = calves
    .filter((calf) =>
      `${calf.name} ${calf.earTag} ${calf.motherTag ?? ''}`
        .toLocaleLowerCase('tr-TR')
        .includes(searchText),
    )
    .map((calf) => ({
      key: `calf-${calf.id}`,
      title: calf.name,
      detail: `Küpe no: ${calf.earTag}`,
      path: '/hayvanlar',
    }))

  const feedResults = feedStocks
    .filter((feed) =>
      `${feed.name} ${feed.unit}`.toLocaleLowerCase('tr-TR').includes(searchText),
    )
    .map((feed) => ({
      key: `feed-${feed.id}`,
      title: feed.name,
      detail: `Stok: ${feed.quantity} ${feed.unit}`,
      path: '/yem-stoklari',
    }))

  const searchResults = searchText
    ? [...calfResults, ...feedResults].slice(0, 6)
    : []

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
     <button
  type="button"
  onClick={onMenuClick}
  aria-label="Menüyü aç veya kapat"
  className="rounded-xl bg-stone-100 p-2 text-stone-700 hover:bg-stone-200 md:hidden"
>
  <Menu size={20} aria-hidden="true" />
</button>
      <div className="relative min-w-[220px] flex-1">
        <label className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
          <Search size={19} className="text-stone-500" aria-hidden="true" />
          <span className="sr-only">Hayvan veya yem ara</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hayvan, küpe no veya yem ara..."
            className="w-full bg-transparent text-sm text-stone-800 outline-none"
          />
        </label>

        {searchText && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
            {searchResults.length === 0 ? (
              <p className="p-3 text-sm text-stone-500">Sonuç bulunamadı.</p>
            ) : (
              searchResults.map((result) => (
                <Link
                  key={result.key}
                  to={result.path}
                  onClick={() => setQuery('')}
                  className="block rounded-lg px-3 py-2 hover:bg-emerald-50"
                >
                  <span className="block text-sm font-semibold text-stone-800">
                    {result.title}
                  </span>
                  <span className="mt-1 block text-xs text-stone-500">
                    {result.detail}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <p className="hidden text-right text-sm text-stone-600 sm:block">
          Ankara / Gölbaşı
        </p>

        <Link
          to="/uyarilar"
          aria-label="Uyarılar"
          className="rounded-xl bg-amber-50 p-2 text-amber-800 hover:bg-amber-100"
        >
          <Bell size={20} aria-hidden="true" />
        </Link>

        <Link
          to="/ayarlar"
          aria-label="Ayarlar"
          className="rounded-xl bg-stone-100 p-2 text-stone-700 hover:bg-stone-200"
        >
          <UserRound size={20} aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}

export default TopBar