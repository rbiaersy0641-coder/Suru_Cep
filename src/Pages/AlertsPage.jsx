import { Link } from 'react-router-dom'

function getToday() {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function AlertsPage({ calves, feedStocks }) {
  const today = getToday()

  const lowStockFeeds = feedStocks.filter(
    (feed) => feed.quantity <= feed.lowStockLimit,
  )

  const careReminders = calves
    .flatMap((calf) =>
      (calf.careRecords ?? [])
        .filter((record) => record.reminderDate)
        .map((record) => ({ calf, record })),
    )
    .sort((first, second) =>
      first.record.reminderDate.localeCompare(second.record.reminderDate),
    )

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Takip merkezi
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Uyarılar</h1>
        <p className="mt-2 text-stone-600">
          Düşük stokları ve tarihi gelen bakım hatırlatmalarını kontrol et.
        </p>
      </header>

      <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
        <h2 className="text-xl font-bold text-red-800">
          Düşük yem stokları ({lowStockFeeds.length})
        </h2>

        {lowStockFeeds.length === 0 ? (
          <p className="mt-3 text-sm text-stone-600">
            Şu an düşük stok uyarısı yok.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {lowStockFeeds.map((feed) => (
              <li
                key={feed.id}
                className="rounded-xl bg-white p-4 text-sm text-stone-700"
              >
                <strong>{feed.name}</strong> stoğu {feed.quantity} {feed.unit}.
                {' '}Uyarı sınırı: {feed.lowStockLimit} {feed.unit}.
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/yem-stoklari"
          className="mt-4 inline-block text-sm font-semibold text-emerald-800 underline"
        >
          Yem stoklarına git
        </Link>
      </section>

      <section className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-xl font-bold text-amber-900">
          Bakım hatırlatmaları ({careReminders.length})
        </h2>

        {careReminders.length === 0 ? (
          <p className="mt-3 text-sm text-stone-600">
            Henüz tarihli bakım hatırlatması yok.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {careReminders.map(({ calf, record }) => (
              <li
                key={`${calf.id}-${record.id}`}
                className="rounded-xl bg-white p-4 text-sm text-stone-700"
              >
                <strong>{calf.name}</strong> · {record.type} ·{' '}
                {record.reminderDate}
                <p className="mt-1 text-stone-500">
                  {record.reminderDate < today ? 'Hatırlatma tarihi geçti' : 'Yaklaşan hatırlatma'}
                  {record.note ? ` · ${record.note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/hayvanlar"
          className="mt-4 inline-block text-sm font-semibold text-emerald-800 underline"
        >
          Hayvanlara git
        </Link>
      </section>
    </div>
  )
}

export default AlertsPage