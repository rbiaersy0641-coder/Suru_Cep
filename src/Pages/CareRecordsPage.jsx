function getDayOfLife(birthDate, careDate) {
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)
  const [careYear, careMonth, careDay] = careDate.split('-').map(Number)

  const birthTime = Date.UTC(birthYear, birthMonth - 1, birthDay)
  const careTime = Date.UTC(careYear, careMonth - 1, careDay)

  return Math.floor((careTime - birthTime) / 86400000) + 1
}

function CareRecordsPage({ calves }) {
  const allRecords = calves
    .flatMap((calf) =>
      (calf.careRecords ?? []).map((record) => ({ calf, record })),
    )
    .sort((first, second) =>
      second.record.date.localeCompare(first.record.date),
    )

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Günlük takip
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">
          Bakım Kayıtları
        </h1>
        <p className="mt-2 text-stone-600">
          Buzağılar için eklenen bakım notlarını tarih sırasıyla görüntüle.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-bold text-stone-800">
          Toplam kayıt ({allRecords.length})
        </h2>

        {allRecords.length === 0 ? (
          <p className="mt-3 rounded-xl bg-white p-5 text-stone-500">
            Henüz bakım kaydı yok. Bakım notu eklemek için Hayvanlarım
            sayfasından bir buzağı seç.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {allRecords.map(({ calf, record }) => (
              <li
                key={`${calf.id}-${record.id}`}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold text-stone-800">{calf.name}</h3>
                  <span className="text-sm text-stone-500">{record.date}</span>
                </div>

                <p className="mt-2 text-sm text-stone-600">
                  Gün {getDayOfLife(calf.birthDate, record.date)} ·{' '}
                  {record.type} · {record.note}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default CareRecordsPage