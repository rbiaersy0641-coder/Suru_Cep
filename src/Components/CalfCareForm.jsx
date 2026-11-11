import { useState } from 'react'

const emptyForm = {
  date: '',
  type: 'Günlük kontrol',
  note: '',
  reminderDate: '',
}

function CalfCareForm({ onSave, minDate, maxDate }) {
  const [formData, setFormData] = useState(emptyForm)

  

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave(formData)
    setFormData(emptyForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-3 rounded-xl bg-stone-50 p-4"
    >
      <h4 className="font-semibold text-stone-800">Bakım kaydı ekle</h4>

      <label className="block text-sm text-stone-700">
        Tarih
        <input
          name="date"
          type="date"
          min={minDate}
          max={maxDate}
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
        />
      </label>

      <label className="block text-sm text-stone-700">
        Bakım türü
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
        >
          <option>Günlük kontrol</option>
          <option>Besleme</option>
          <option>Tartım</option>
          <option>Gözlem</option>
          <option>Veteriner ziyareti</option>
          <option>Aşı</option>
<option>İlaç</option>
<option>Hastalık gözlemi</option>
        </select>
      </label>

      <label className="block text-sm text-stone-700">
        Not
        <input
          name="note"
          value={formData.note}
          onChange={handleChange}
          required
          placeholder="Örn. sabah kontrolü yapıldı"
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
        />
      
      </label>

<label className="block text-sm text-stone-700">
  Hatırlatma tarihi (isteğe bağlı)
  <input
    name="reminderDate"
    type="date"
    value={formData.reminderDate}
    onChange={handleChange}
    className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
    min={formData.date || minDate}
 />
</label>

      <button
        type="submit"
        className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Bakım kaydını ekle
      </button>
    </form>
  )
}

export default CalfCareForm