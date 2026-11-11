import { useEffect, useState } from 'react'
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
} from 'lucide-react'

function getWeatherVisual(code) {
  if (code === 0) {
    return {
      label: 'Güneşli',
      Icon: Sun,
      tint: 'bg-amber-50',
      iconColor: 'text-amber-500',
    }
  }

  if ([1, 2, 3].includes(code)) {
    return {
      label: 'Bulutlu',
      Icon: CloudSun,
      tint: 'bg-slate-100',
      iconColor: 'text-slate-500',
    }
  }

  if ([45, 48].includes(code)) {
    return {
      label: 'Sisli',
      Icon: CloudFog,
      tint: 'bg-stone-100',
      iconColor: 'text-stone-500',
    }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: 'Karlı',
      Icon: Snowflake,
      tint: 'bg-sky-50',
      iconColor: 'text-sky-600',
    }
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: 'Fırtınalı',
      Icon: CloudLightning,
      tint: 'bg-violet-50',
      iconColor: 'text-violet-600',
    }
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: 'Yağmurlu',
      Icon: CloudRain,
      tint: 'bg-blue-50',
      iconColor: 'text-blue-600',
    }
  }

  return {
    label: 'Kapalı',
    Icon: Cloud,
    tint: 'bg-slate-100',
    iconColor: 'text-slate-500',
  }
}

function WeatherCard() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=39.79&longitude=32.80&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto',
        )

        if (!response.ok) {
          throw new Error('Hava durumu bilgisi alınamadı.')
        }

        const data = await response.json()
        setWeather(data.current)
      } catch (error) {
        setError('Hava durumu bilgisi şu an yüklenemedi.')
      }
    }

    getWeather()
  }, [])

  if (error) {
    return (
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-stone-800">🐄 Çiftlik hava durumu</h2>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </section>
    )
  }

  if (!weather) {
    return (
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-stone-800">🐄 Çiftlik hava durumu</h2>
        <p className="mt-2 text-sm text-stone-500">Hava durumu yükleniyor...</p>
      </section>
    )
  }

  const weatherVisual = getWeatherVisual(weather.weather_code)
const WeatherIcon = weatherVisual.Icon

 return (
  <section className="grid gap-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:grid-cols-[1fr_180px] sm:items-center">
    <div>
      <p className="text-sm font-semibold text-emerald-700">
        Ankara / Gölbaşı
      </p>

      <h2 className="mt-1 text-xl font-bold text-stone-800">
        🐄 Çiftlik hava durumu
      </h2>

      <p className="mt-4 text-4xl font-bold text-stone-800">
        {Math.round(weather.temperature_2m)}°C
      </p>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
        <p>💧 Nem: %{weather.relative_humidity_2m}</p>
        <p>🌧️ Yağış: {weather.precipitation} mm</p>
      </div>

      <p className="mt-4 text-xs text-stone-400">
        Hava durumu verileri:{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Open-Meteo
        </a>
      </p>
    </div>

   <div
  className={`grid h-36 w-full place-items-center rounded-2xl sm:h-40 ${weatherVisual.tint}`}
>
  <div className="text-center">
    <WeatherIcon
      size={58}
      aria-hidden="true"
      className={`mx-auto ${weatherVisual.iconColor}`}
    />
    <p className="mt-2 text-sm font-semibold text-stone-700">
      {weatherVisual.label}
    </p>
  </div>
</div>

  </section>
)
}

export default WeatherCard