import CalfForm from '../Components/CalfForm.jsx'
import CalfCareForm from '../Components/CalfCareForm.jsx'
import { useState } from 'react'

function getDayOfLife(birthDate, careDate) {
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)
  const [careYear, careMonth, careDay] = careDate.split('-').map(Number)

  const birthTime = Date.UTC(birthYear, birthMonth - 1, birthDay)
  const careTime = Date.UTC(careYear, careMonth - 1, careDay)

  return Math.floor((careTime - birthTime) / 86400000) + 1
}

function getMaxCareDate(birthDate) {
  const [year, month, day] = birthDate.split('-').map(Number)

  return new Date(Date.UTC(year, month - 1, day + 29))
    .toISOString()
    .slice(0, 10)
}

function CalvesPage({
  calves,
  editingCalfId,
  setEditingCalfId,
  saveCalf,
  deleteCalf,
  addCareRecord,
}) {

const [openCareFormCalfId, setOpenCareFormCalfId] = useState(null)    
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Sürü yönetimi
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Hayvanlarım</h1>
        <p className="mt-2 text-stone-600">
          Buzağı kayıtlarını ve ilk 30 günlük bakım notlarını yönet.
        </p>
      </header>

      <CalfForm
        key={editingCalfId ?? 'new'}
        onSave={saveCalf}
        initialData={calves.find((calf) => calf.id === editingCalfId)}
        onCancel={() => setEditingCalfId(null)}
      />

      <section className="mt-8">
        <h2 className="text-xl font-bold text-stone-800">
          Buzağılar ({calves.length})
        </h2>

        {calves.length === 0 ? (
          <p className="mt-3 rounded-xl bg-white p-5 text-stone-500">
            Henüz kayıtlı buzağı yok. İlk buzağını yukarıdaki formdan ekle.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {calves.map((calf) => (
              <li key={calf.id} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
               <div className="flex items-start gap-4">
  <img
    src="/images/calf.jpeg"
    alt={`${calf.name} adlı buzağı`}
    className="size-20 shrink-0 rounded-xl object-cover"
  />

  <div>
    <h3 className="font-bold text-stone-800">{calf.name}</h3>
    <p className="mt-1 text-sm text-stone-600">
      Küpe no: {calf.earTag}
    </p>
    <p className="text-sm text-stone-600">
      Doğum tarihi: {calf.birthDate}
    </p>
    <p className="text-sm text-stone-600">
      Anne küpe no: {calf.motherTag || 'Belirtilmedi'}
    </p>
  </div>
</div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingCalfId(calf.id)}
                      className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-200"
                    >
                      Düzenle
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteCalf(calf.id)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t border-stone-200 pt-4">
                  <h4 className="font-semibold text-stone-800">
                    Bakım kayıtları ({(calf.careRecords ?? []).length})
                  </h4>

                  {(calf.careRecords ?? []).map((record) => (
                    <p
                      key={record.id}
                      className="mt-2 text-sm text-stone-600"
                    >
                      Gün {getDayOfLife(calf.birthDate, record.date)} ·{' '}
                      {record.date} · {record.type}: {record.note}
                    </p>
                  ))}

                 <button
  type="button"
  onClick={() =>
    setOpenCareFormCalfId((currentId) =>
      currentId === calf.id ? null : calf.id,
    )
  }
  className="mt-3 rounded-lg bg-sky-100 px-3 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-200"
>
  {openCareFormCalfId === calf.id ? 'Formu kapat' : 'Bakım kaydı ekle'}
</button>

{openCareFormCalfId === calf.id && (
  <CalfCareForm
    onSave={(recordData) => addCareRecord(calf.id, recordData)}
    minDate={calf.birthDate}
    maxDate={getMaxCareDate(calf.birthDate)}
  />
)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default CalvesPage