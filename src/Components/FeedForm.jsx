import { useState } from 'react'

const emptyForm = {
  name: '',
  quantity: '',
  unit: 'kg',
  lowStockLimit: '',
}

function FeedForm({ onSave, initialData, onCancel }) {
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

    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      lowStockLimit: Number(formData.lowStockLimit),
    })

    setFormData(emptyForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold text-stone-800">
        {initialData ? 'Yem bilgisini düzenle' : 'Yeni yem stoğu ekle'}
      </h2>

      <label className="block text-sm font-medium text-stone-700">
        Yem adı
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Miktar
        <input
          name="quantity"
          type="number"
          min="0"
          step="0.1"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Birim
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        >
          <option value="kg">Kilogram (kg)</option>
          <option value="çuval">Çuval</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Düşük stok uyarı sınırı
        <input
          name="lowStockLimit"
          type="number"
          min="0"
          step="0.1"
          value={formData.lowStockLimit}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
        >
          {initialData ? 'Değişiklikleri kaydet' : 'Yem stoğunu kaydet'}
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

export default FeedForm