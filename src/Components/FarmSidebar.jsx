import {
  House,
  Beef,
  Wheat, CalendarDays,
  ClipboardCheck,
  HeartPulse,
  Bell,
  ChartNoAxesColumn,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Ana Sayfa', to: '/', Icon: House },
  { label: 'Hayvanlarım', to: '/hayvanlar', Icon: Beef },
  { label: 'Yem Stokları', to: '/yem-stoklari', Icon: Wheat },
  { label: 'Yem Takvimi', to: '/yem-takvimi', Icon: CalendarDays },
  { label: 'Bakım Kayıtları', to: '/bakim-kayitlari', Icon: ClipboardCheck },
  { label: 'Sağlık Kayıtları', to: '/saglik-kayitlari', Icon: HeartPulse },
  { label: 'Uyarılar', to: '/uyarilar', Icon: Bell },
  { label: 'Raporlar', to: '/raporlar', Icon: ChartNoAxesColumn },
  { label: 'Ayarlar', to: '/ayarlar', Icon: Settings },
]

function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#183d33] p-5 text-white transition-transform duration-200 md:sticky md:top-0 md:h-screen md:shrink-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8 text-center">
          <img
  src="/images/surucep.logo.png"
  alt="SürüCep logosu"
  className="mx-auto size-16 object-contain"
/>
          <h1 className="mt-2 text-2xl font-bold">SürüCep</h1>
          <p className="mt-1 text-sm text-emerald-100">
            Sürünüzü kolayca yönetin
          </p>
        </div>

        <nav aria-label="Ana menü" className="space-y-2">
          {menuItems.map(({ label, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? 'bg-[#f5f6ef] text-[#183d33]'
                    : 'text-emerald-50 hover:bg-white/15'
                }`
              }
            >
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar