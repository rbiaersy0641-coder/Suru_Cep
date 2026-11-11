import { Link } from 'react-router-dom'

const healthTypes = [
  'Aşı',
  'İlaç',
  'Hastalık gözlemi',
  'Veteriner ziyareti',
]

function HealthRecordsPage({ calves }) {
  const healthRecords = calves
    .flatMap((calf) =>
      (calf.careRecords ?? [])
        .filter((record) => healthTypes.includes(record.type))
        .map((record) => ({ calf, record })),
    )
    .sort((first, second) =>
      second.record.date.localeCompare(first.record.date),
    )

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">
          Hayvan sağlığı
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">
          Sağlık Kayıtları
        </h1>
        <p className="mt-2 text-stone-600">
          Aşı, ilaç, hastalık gözlemi ve veteriner ziyaretlerini görüntüle.
        </p>
      </header>

      <Link
        to="/hayvanlar"
        className="inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Hayvanlarımda sağlık notu ekle
      </Link>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-stone-800">
          Sağlık kayıtları ({healthRecords.length})
        </h2>

        {healthRecords.length === 0 ? (
          <p className="mt-3 rounded-xl bg-white p-5 text-stone-500">
            Henüz sağlık kaydı yok. Hayvanlarım sayfasından ilgili buzağıya
            sağlık notu ekleyebilirsin.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {healthRecords.map(({ calf, record }) => (
              <li
                key={`${calf.id}-${record.id}`}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold text-stone-800">{calf.name}</h3>
                  <span className="text-sm text-stone-500">{record.date}</span>
                </div>

                <p className="mt-2 text-sm font-semibold text-rose-700">
                  {record.type}
                </p>
                <p className="mt-1 text-sm text-stone-600">{record.note}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default HealthRecordsPage