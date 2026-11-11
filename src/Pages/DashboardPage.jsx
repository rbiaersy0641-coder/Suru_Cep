import { useState } from 'react'
import {
  Beef,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Lightbulb,
  TriangleAlert,
  Wheat,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import WeatherCard from '../Components/WeatherCard.jsx'



const dailyTips = [
  'Yem takvimindeki tamamlanan beslemeleri işaretleyerek kayıtlarını güncel tut.',
  'Yem stoğu miktarlarını düzenli güncelle ki düşük stok uyarıları doğru çalışsın.',
  'Bakım notlarına tarih ve kısa açıklama ekleyerek geçmiş kayıtları kolayca bul.',
  'Buzağı ve yem kayıtlarında küpe numarası ve miktar gibi alanları kontrol et.',
]

function DashboardPage({ calves, careRecordCount, lowStockCount, feedStocks }) {
  const [tipIndex, setTipIndex] = useState(0)

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
     <header className="relative mb-8 min-h-64 overflow-hidden rounded-3xl shadow-lg sm:min-h-80">
  <img
    src="/images/farm-hero.jpeg"
    alt="Çiftlikte büyükbaş hayvanlar"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-r from-[#173f35]/90 via-[#173f35]/55 to-transparent"
  />

  <div className="relative z-10 flex min-h-64 items-end p-7 text-white sm:min-h-80 sm:p-10">
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
        Çiftlik takip paneli
      </p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">SürüCep</h1>
      <p className="mt-3 text-emerald-50">
        Sürünüzü tek ekrandan kolayca yönetin.
      </p>
    </div>
  </div>
</header>
<section className="mb-8 grid gap-4 sm:grid-cols-3">
  <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-stone-600">Takipteki buzağı</p>
      <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
        <Beef size={22} aria-hidden="true" />
      </span>
    </div>
    <p className="mt-4 text-4xl font-bold text-emerald-800">{calves.length}</p>
    <p className="mt-1 text-xs text-stone-500">İlk 30 günlük bakımda</p>
  </article>

  <article className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-stone-600">Bakım kaydı</p>
      <span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
        <ClipboardCheck size={21} aria-hidden="true" />
      </span>
    </div>
    <p className="mt-4 text-4xl font-bold text-sky-800">{careRecordCount}</p>
    <p className="mt-1 text-xs text-stone-500">Kaydedilen bakım notu</p>
  </article>

  <article className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-stone-600">Düşük stok uyarısı</p>
      <span
        className={`grid size-11 place-items-center rounded-xl ${
          lowStockCount > 0
            ? 'bg-red-50 text-red-700'
            : 'bg-emerald-50 text-emerald-700'
        }`}
      >
        <TriangleAlert size={21} aria-hidden="true" />
      </span>
    </div>
    <p
      className={`mt-4 text-4xl font-bold ${
        lowStockCount > 0 ? 'text-red-700' : 'text-emerald-800'
      }`}
    >
      {lowStockCount}
    </p>
    <p className="mt-1 text-xs text-stone-500">
      Kontrol edilmesi gereken yem
    </p>
  </article>
</section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <Link
    to="/hayvanlar"
    className="group flex min-h-40 flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="flex items-start justify-between">
      <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
        <Beef size={24} />
      </span>
      <img
        src="/images/calf.jpeg"
        alt=""
        className="size-14 rounded-xl object-cover"
      />
    </div>
    <h2 className="mt-4 font-bold text-stone-800">Hayvanlarım</h2>
    <p className="mt-1 text-sm text-stone-500">Buzağı kayıtlarını yönet</p>
  </Link>

  <Link
    to="/yem-stoklari"
    className="group flex min-h-40 flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="flex items-start justify-between">
      <span className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-700">
        <Wheat size={24} />
      </span>
      <img
        src="/images/feed.jpeg"
        alt=""
        className="size-14 rounded-xl object-cover"
      />
    </div>
    <h2 className="mt-4 font-bold text-stone-800">Yem stokları</h2>
    <p className="mt-1 text-sm text-stone-500">
      Miktarları ve sınırları takip et
    </p>
  </Link>

  <Link
    to="/yem-takvimi"
    className="group flex min-h-40 flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
      <CalendarDays size={24} />
    </span>
    <h2 className="mt-4 font-bold text-stone-800">Yem takvimi</h2>
    <p className="mt-1 text-sm text-stone-500">
      Besleme planlarını görüntüle
    </p>
  </Link>

  <Link
    to="/bakim-kayitlari"
    className="group flex min-h-40 flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <span className="grid size-11 place-items-center rounded-xl bg-violet-50 text-violet-700">
      <ClipboardList size={24} />
    </span>
    <h2 className="mt-4 font-bold text-stone-800">Bakım kayıtları</h2>
    <p className="mt-1 text-sm text-stone-500">Son notlara göz at</p>
  </Link>
</section>

    <section className="mb-8 grid gap-4 lg:grid-cols-2">
  <div className="space-y-4">
    <WeatherCard />

    <article className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-600" size={21} />
          <h2 className="font-bold text-stone-800">Bugünün önerisi</h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Önceki öneri"
            onClick={() =>
              setTipIndex((currentIndex) =>
                (currentIndex - 1 + dailyTips.length) % dailyTips.length,
              )
            }
            className="rounded-lg bg-white p-2 text-stone-700 hover:bg-amber-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Sonraki öneri"
            onClick={() =>
              setTipIndex((currentIndex) =>
                (currentIndex + 1) % dailyTips.length,
              )
            }
            className="rounded-lg bg-white p-2 text-stone-700 hover:bg-amber-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm text-stone-700">{dailyTips[tipIndex]}</p>
      <p className="mt-2 text-xs text-stone-500">
        Öneri {tipIndex + 1} / {dailyTips.length}
      </p>
    </article>
  </div>

  <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-xl bg-red-50 text-red-700">
        <TriangleAlert size={19} aria-hidden="true" />
      </span>
      <h2 className="text-xl font-bold text-stone-800">
        Dikkat gerektirenler
      </h2>
    </div>

    <Link
      to="/uyarilar"
      className="text-sm font-semibold text-emerald-800 hover:underline"
    >
      Tümünü gör
    </Link>
  </div>

  {lowStockFeeds.length === 0 ? (
    <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-stone-600">
      Şu an düşük stok uyarısı yok.
    </p>
  ) : (
    <ul className="mt-4 space-y-3">
      {lowStockFeeds.map((feed) => (
        <li
          key={feed.id}
          className="rounded-xl border border-red-100 bg-red-50/60 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-stone-800">{feed.name}</p>
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
              Stok düşük
            </span>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            Mevcut: {feed.quantity} {feed.unit} · Uyarı sınırı:{' '}
            {feed.lowStockLimit} {feed.unit}
          </p>
        </li>
      ))}
    </ul>
  )}

  <div className="mt-5 border-t border-stone-100 pt-4">
    <h3 className="font-semibold text-stone-800">
      Bakım hatırlatmaları ({careReminders.length})
    </h3>

    {careReminders.length === 0 ? (
      <p className="mt-2 rounded-xl bg-stone-50 p-3 text-sm text-stone-600">
        Henüz tarihli bakım hatırlatması yok.
      </p>
    ) : (
      <ul className="mt-3 space-y-2">
        {careReminders.slice(0, 3).map(({ calf, record }) => (
          <li
            key={`${calf.id}-${record.id}`}
            className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-sm text-stone-700"
          >
            <strong>{calf.name}</strong> · {record.type} ·{' '}
            {record.reminderDate}
          </li>
        ))}
      </ul>
    )}
  </div>
</article>
</section>

    </div>
  )
}

export default DashboardPage