import { useState } from 'react'

const defaultSettings = {
  farmName: 'SürüCep',
  farmLocation: 'Ankara / Gölbaşı',
}

function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('surucep-farm-settings')

    if (!savedSettings) {
      return defaultSettings
    }

    try {
      return { ...defaultSettings, ...JSON.parse(savedSettings) }
    } catch {
      return defaultSettings
    }
  })

  const [savedMessage, setSavedMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }))

    setSavedMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem('surucep-farm-settings', JSON.stringify(settings))
    setSavedMessage('Çiftlik ayarları kaydedildi.')
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Kişiselleştirme
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">Ayarlar</h1>
        <p className="mt-2 text-stone-600">
          Çiftlik bilgilerini düzenle.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium text-stone-700">
          Çiftlik adı
          <input
            name="farmName"
            value={settings.farmName}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Çiftlik konumu
          <input
            name="farmLocation"
            value={settings.farmLocation}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
        >
          Ayarları kaydet
        </button>

        {savedMessage && (
          <p role="status" className="text-sm font-medium text-emerald-700">
            {savedMessage}
          </p>
        )}
      </form>
    </div>
  )
}

export default SettingsPage