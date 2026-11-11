import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

function getMaxDate(birthDate) {
  const [year, month, day] = birthDate.split('-').map(Number)

  return new Date(Date.UTC(year, month - 1, day + 29))
    .toISOString()
    .slice(0, 10)
}

function getDayOfLife(birthDate, planDate) {
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)
  const [planYear, planMonth, planDay] = planDate.split('-').map(Number)

  const birthTime = Date.UTC(birthYear, birthMonth - 1, birthDay)
  const planTime = Date.UTC(planYear, planMonth - 1, planDay)

  return Math.floor((planTime - birthTime) / 86400000) + 1
}

function createEmptyForm(calfId = '') {
  return {
    calfId,
    date: '',
    time: '08:00',
    feedName: '',
    quantity: '',
    unit: 'kg',
    note: '',
  }
}

function FeedingSchedulePage({ calves, feedStocks }) {
  const [schedules, setSchedules] = useState(() => {
    const savedSchedules = localStorage.getItem('surucep-feeding-schedules')

    if (!savedSchedules) {
      return []
    }

    try {
      return JSON.parse(savedSchedules)
    } catch {
      return []
    }
  })

  const [formData, setFormData] = useState(() =>
    createEmptyForm(calves[0]?.id ?? ''),
  )
  const [editingScheduleId, setEditingScheduleId] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      'surucep-feeding-schedules',
      JSON.stringify(schedules),
    )
  }, [schedules])

  const selectedCalf = calves.find((calf) => calf.id === formData.calfId)
  const feedUnits = [
    ...new Set([...feedStocks.map((feed) => feed.unit), 'kg', 'litre', 'çuval']),
  ]

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!selectedCalf) {
      return
    }

    if (
      formData.date < selectedCalf.birthDate ||
      formData.date > getMaxDate(selectedCalf.birthDate)
    ) {
      window.alert('Yem planı buzağının ilk 30 günlük dönemi içinde olmalı.')
      return
    }

    const scheduleData = {
      ...formData,
      quantity: Number(formData.quantity),
    }

    if (editingScheduleId) {
      setSchedules((currentSchedules) =>
        currentSchedules.map((schedule) =>
          schedule.id === editingScheduleId
            ? { ...schedule, ...scheduleData }
            : schedule,
        ),
      )
      setEditingScheduleId(null)
    } else {
      setSchedules((currentSchedules) => [
        {
          ...scheduleData,
          id: crypto.randomUUID(),
          completed: false,
        },
        ...currentSchedules,
      ])
    }

    setFormData(createEmptyForm(calves[0]?.id ?? ''))
  }

  function editSchedule(schedule) {
    setEditingScheduleId(schedule.id)
    setFormData({
      calfId: schedule.calfId,
      date: schedule.date,
      time: schedule.time,
      feedName: schedule.feedName,
      quantity: String(schedule.quantity),
      unit: schedule.unit,
      note: schedule.note,
    })
  }

  function deleteSchedule(scheduleId) {
    const shouldDelete = window.confirm('Bu yem planını silmek istiyor musun?')

    if (!shouldDelete) {
      return
    }

    setSchedules((currentSchedules) =>
      currentSchedules.filter((schedule) => schedule.id !== scheduleId),
    )

    if (editingScheduleId === scheduleId) {
      setEditingScheduleId(null)
      setFormData(createEmptyForm(calves[0]?.id ?? ''))
    }
  }

  function toggleCompleted(scheduleId) {
    setSchedules((currentSchedules) =>
      currentSchedules.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, completed: !schedule.completed }
          : schedule,
      ),
    )
  }

  const sortedSchedules = [...schedules].sort((first, second) =>
    `${first.date} ${first.time}`.localeCompare(
      `${second.date} ${second.time}`,
    ),
  )

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          İlk 30 günlük beslenme planı
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Yem Takvimi</h1>
        <p className="mt-2 text-stone-600">
          Buzağıların günlük yem planlarını oluştur ve takibini yap.
        </p>
      </header>

      {calves.length === 0 ? (
        <p className="rounded-xl bg-white p-5 text-stone-600">
          Yem planı oluşturmak için önce{' '}
          <Link
            to="/hayvanlar"
            className="font-semibold text-emerald-800 underline"
          >
            Hayvanlarım
          </Link>{' '}
          sayfasından bir buzağı ekle.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-stone-800">
            {editingScheduleId ? 'Yem planını düzenle' : 'Yeni yem planı ekle'}
          </h2>

          <label className="block text-sm text-stone-700">
            Buzağı
            <select
              name="calfId"
              value={formData.calfId}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
            >
              {calves.map((calf) => (
                <option key={calf.id} value={calf.id}>
                  {calf.name} · Küpe no: {calf.earTag}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-stone-700">
              Tarih
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={selectedCalf?.birthDate}
                max={selectedCalf ? getMaxDate(selectedCalf.birthDate) : ''}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
              />
            </label>

            <label className="block text-sm text-stone-700">
              Saat
              <input
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
              />
            </label>
          </div>

          <label className="block text-sm text-stone-700">
            Yem adı
            <input
              name="feedName"
              value={formData.feedName}
              onChange={handleChange}
              list="feed-name-options"
              required
              placeholder="Örn. buzağı başlangıç yemi"
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
            />
            <datalist id="feed-name-options">
              {feedStocks.map((feed) => (
                <option key={feed.id} value={feed.name} />
              ))}
            </datalist>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-stone-700">
              Miktar
              <input
                name="quantity"
                type="number"
                min="0.1"
                step="0.1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
              />
            </label>

            <label className="block text-sm text-stone-700">
              Birim
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
              >
                {feedUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-sm text-stone-700">
            Not (isteğe bağlı)
            <input
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Örn. sabah beslemesi"
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
            />
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
            >
              {editingScheduleId ? 'Değişiklikleri kaydet' : 'Yem planını kaydet'}
            </button>

            {editingScheduleId && (
              <button
                type="button"
                onClick={() => {
                  setEditingScheduleId(null)
                  setFormData(createEmptyForm(calves[0]?.id ?? ''))
                }}
                className="rounded-lg bg-stone-200 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-300"
              >
                Vazgeç
              </button>
            )}
          </div>
        </form>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-bold text-stone-800">
          Planlanan beslemeler ({schedules.length})
        </h2>

        {sortedSchedules.length === 0 ? (
          <p className="mt-3 rounded-xl bg-white p-5 text-stone-500">
            Henüz yem planı yok.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {sortedSchedules.map((schedule) => {
              const calf = calves.find((item) => item.id === schedule.calfId)

              return (
                <li
                  key={schedule.id}
                  className="rounded-xl bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-stone-800">
                        {schedule.feedName}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {calf ? calf.name : 'Buzağı kaydı bulunamadı'} ·{' '}
                        {schedule.date} saat {schedule.time}
                      </p>
                      {calf && (
                        <p className="text-sm text-stone-600">
                          Buzağı günü {getDayOfLife(calf.birthDate, schedule.date)}
                        </p>
                      )}
                      <p className="text-sm text-stone-600">
                        Miktar: {schedule.quantity} {schedule.unit}
                      </p>
                      {schedule.note && (
                        <p className="mt-1 text-sm text-stone-500">
                          {schedule.note}
                        </p>
                      )}
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          schedule.completed
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {schedule.completed ? 'Tamamlandı' : 'Planlandı'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCompleted(schedule.id)}
                        className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-200"
                      >
                        {schedule.completed ? 'Geri al' : 'Tamamlandı'}
                      </button>

                      <button
                        type="button"
                        onClick={() => editSchedule(schedule)}
                        className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200"
                      >
                        <Pencil size={16} aria-hidden="true" />
                        Düzenle
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteSchedule(schedule.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        Sil
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

export default FeedingSchedulePage