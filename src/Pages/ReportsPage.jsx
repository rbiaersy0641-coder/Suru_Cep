function ReportsPage({ calves, feedStocks, careRecordCount }) {
  const lowStockCount = feedStocks.filter(
    (feed) => feed.quantity <= feed.lowStockLimit,
  ).length

  const quantitiesByUnit = feedStocks.reduce((totals, feed) => {
    totals[feed.unit] = (totals[feed.unit] ?? 0) + Number(feed.quantity)
    return totals
  }, {})

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
          Çiftlik özeti
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Raporlar</h1>
        <p className="mt-2 text-stone-600">
          Çiftlikteki mevcut kayıtların genel görünümü.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Kayıtlı buzağı</p>
          <p className="mt-2 text-3xl font-bold text-emerald-800">
            {calves.length}
          </p>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Bakım kaydı</p>
          <p className="mt-2 text-3xl font-bold text-sky-700">
            {careRecordCount}
          </p>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Düşük stok uyarısı</p>
          <p className="mt-2 text-3xl font-bold text-red-700">
            {lowStockCount}
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-stone-800">Yem miktarları</h2>

        {feedStocks.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">
            Raporlamak için henüz yem stoğu eklenmemiş.
          </p>
        ) : (
          <>
            <ul className="mt-4 space-y-3">
              {feedStocks.map((feed) => {
                const percentage =
                  feed.lowStockLimit > 0
                    ? Math.min(
                        (Number(feed.quantity) / Number(feed.lowStockLimit)) *
                          100,
                        100,
                      )
                    : 100

                return (
                  <li key={feed.id}>
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="font-medium text-stone-700">
                        {feed.name}
                      </span>
                      <span className="text-stone-500">
                        {feed.quantity} {feed.unit}
                      </span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-stone-100">
                      <div
                        className={`h-2 rounded-full ${
                          feed.quantity <= feed.lowStockLimit
                            ? 'bg-red-500'
                            : 'bg-emerald-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-5 border-t border-stone-100 pt-4">
              <h3 className="font-semibold text-stone-700">
                Birime göre toplam
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-stone-600">
                {Object.entries(quantitiesByUnit).map(([unit, total]) => (
                  <li key={unit}>
                    {unit}: {total}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default ReportsPage