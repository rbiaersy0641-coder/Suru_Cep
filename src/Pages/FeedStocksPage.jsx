import { Pencil, Trash2 } from 'lucide-react'
import FeedForm from '../Components/FeedForm.jsx'

function FeedStocksPage({
  feedStocks,
  editingFeedId,
  setEditingFeedId,
  saveFeedStock,
  deleteFeedStock,
}) {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Yem ve envanter
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Yem Stokları</h1>
        <p className="mt-2 text-stone-600">
          Yem miktarlarını ve düşük stok sınırlarını takip et.
        </p>
      </header>

      <FeedForm
        key={editingFeedId ?? 'new-feed'}
        onSave={saveFeedStock}
        initialData={feedStocks.find((feed) => feed.id === editingFeedId)}
        onCancel={() => setEditingFeedId(null)}
      />

      <section className="mt-8">
        <h2 className="text-xl font-bold text-stone-800">
          Yem stokları ({feedStocks.length})
        </h2>

        {feedStocks.length === 0 ? (
          <p className="mt-3 rounded-xl bg-white p-5 text-stone-500">
            Henüz yem stoğu yok. İlk yem kaydını yukarıdaki formdan ekle.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {feedStocks.map((feed) => (
              <li
                key={feed.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
               <div className="flex items-start gap-4">
  <img
    src="/images/feed.jpeg"
    alt={`${feed.name} yem stoğu`}
    className="size-20 shrink-0 rounded-xl object-cover"
  />

  <div>
    <h3 className="font-bold text-stone-800">{feed.name}</h3>
    <p className="mt-1 text-sm text-stone-600">
      Miktar: {feed.quantity} {feed.unit}
    </p>
    <p className="text-sm text-stone-600">
      Düşük stok sınırı: {feed.lowStockLimit} {feed.unit}
    </p>

    {feed.quantity <= feed.lowStockLimit && (
      <p className="mt-2 text-sm font-semibold text-red-700">
        Stok düşük
      </p>
    )}
  </div>
</div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingFeedId(feed.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-200"
                    >
                      <Pencil size={16} aria-hidden="true" />
                      Düzenle
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteFeedStock(feed.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default FeedStocksPage