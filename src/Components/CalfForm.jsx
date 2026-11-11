import { useState } from 'react'

const emptyForm = {
  earTag: '',
  name: '',
  birthDate: '',
  motherTag: '',
}

function CalfForm({ onSave, initialData, onCancel }) {
  const [formData, setFormData] = useState(initialData ?? emptyForm)

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
      className="space-y-4 rounded-2xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold text-stone-800">
        {initialData ? 'Buzağı bilgilerini düzenle' : 'Yeni buzağı ekle'}
      </h2>

      <label className="block text-sm font-medium text-stone-700">
        Küpe numarası
        <input
          name="earTag"
          value={formData.earTag}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Buzağının adı
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Doğum tarihi
        <input
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Anne küpe numarası
        <input
          name="motherTag"
          value={formData.motherTag}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
        >
          {initialData ? 'Değişiklikleri kaydet' : 'Buzağıyı kaydet'}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-4 py-2 font-semibold text-stone-700"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}

export default CalfForm