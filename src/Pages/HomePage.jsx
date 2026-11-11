import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../Components/FarmSidebar.jsx'
import DashboardPage from './DashboardPage.jsx'
import CalvesPage from './CalvesPage.jsx'
import FeedStocksPage from './FeedStocksPage.jsx'
import CareRecordsPage from './CareRecordsPage.jsx'
import HealthRecordsPage from './HealthRecordsPage.jsx'
import AlertsPage from './AlertsPage.jsx'
import ReportsPage from './ReportsPage.jsx'
import SettingsPage from './SettingsPage.jsx'
import FeedingSchedulePage from './FeedingSchedulePage.jsx'
import TopBar from '../Components/TopBar.jsx'

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

function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [calves, setCalves] = useState(() => {
        const savedCalves = localStorage.getItem('surucep-calves')
        return savedCalves ? JSON.parse(savedCalves) : []
    })

    const [feedStocks, setFeedStocks] = useState(() => {
        const savedFeedStocks = localStorage.getItem('surucep-feed-stocks')
        return savedFeedStocks ? JSON.parse(savedFeedStocks) : []
    })

    useEffect(() => {
        localStorage.setItem('surucep-calves', JSON.stringify(calves))
    }, [calves])

    const [editingCalfId, setEditingCalfId] = useState(null)

    const [editingFeedId, setEditingFeedId] = useState(null)

    function addCalf(calfData) {
        const newCalf = {
            ...calfData,
            id: crypto.randomUUID(),
        }

        setCalves((currentCalves) => [newCalf, ...currentCalves])
    }

    useEffect(() => {
        localStorage.setItem('surucep-feed-stocks', JSON.stringify(feedStocks))
    }, [feedStocks])

    function addFeedStock(feedData) {
        const newFeedStock = {
            ...feedData,
            id: crypto.randomUUID(),
        }

        setFeedStocks((currentFeedStocks) => [
            newFeedStock,
            ...currentFeedStocks,
        ])
    }

    function saveFeedStock(feedData) {
        if (editingFeedId) {
            setFeedStocks((currentFeedStocks) =>
                currentFeedStocks.map((feed) =>
                    feed.id === editingFeedId
                        ? { ...feed, ...feedData }
                        : feed,
                ),
            )

            setEditingFeedId(null)
            return
        }

        addFeedStock(feedData)
    }

    function deleteFeedStock(feedId) {
        const shouldDelete = window.confirm(
            'Bu yem kaydını silmek istiyor musun?',
        )

        if (!shouldDelete) {
            return
        }

        setFeedStocks((currentFeedStocks) =>
            currentFeedStocks.filter((feed) => feed.id !== feedId),
        )
    }

    function saveCalf(calfData) {
        if (editingCalfId) {
            setCalves((currentCalves) =>
                currentCalves.map((calf) =>
                    calf.id === editingCalfId ? { ...calf, ...calfData } : calf,
                ),
            )

            setEditingCalfId(null)
            return
        }

        addCalf(calfData)
    }

    function deleteCalf(calfId) {
        const shouldDelete = window.confirm(
            'Bu buzağı kaydını silmek istiyor musun?',
        )

        if (!shouldDelete) {
            return
        }

        setCalves((currentCalves) =>
            currentCalves.filter((calf) => calf.id !== calfId),
        )
    }

    function addCareRecord(calfId, recordData) {
        const newRecord = {
            ...recordData,
            id: crypto.randomUUID(),
        }

        setCalves((currentCalves) =>
            currentCalves.map((calf) =>
                calf.id === calfId
                    ? {
                        ...calf,
                        careRecords: [...(calf.careRecords ?? []), newRecord],
                    }
                    : calf,
            ),
        )
    }

    const careRecordCount = calves.reduce(
        (total, calf) => total + (calf.careRecords ?? []).length,
        0,
    )

    const lowStockCount = feedStocks.filter(
        (feed) => feed.quantity <= feed.lowStockLimit,
    ).length

   return (
  <main className="min-h-screen bg-[#f5f6ef] md:flex">
    <Sidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
/>

    <div className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 lg:p-8">
     <TopBar
  calves={calves}
  feedStocks={feedStocks}
  onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
/>
     <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              calves={calves}
              careRecordCount={careRecordCount}
              lowStockCount={lowStockCount}
               feedStocks={feedStocks}
            />
          }
        />

        <Route
          path="/hayvanlar"
          element={
            <CalvesPage
              calves={calves}
              editingCalfId={editingCalfId}
              setEditingCalfId={setEditingCalfId}
              saveCalf={saveCalf}
              deleteCalf={deleteCalf}
              addCareRecord={addCareRecord}
            />
          }
        />

        <Route
          path="/yem-stoklari"
          element={
            <FeedStocksPage
              feedStocks={feedStocks}
              editingFeedId={editingFeedId}
              setEditingFeedId={setEditingFeedId}
              saveFeedStock={saveFeedStock}
              deleteFeedStock={deleteFeedStock}
            />
          }
        />
<Route
  path="/yem-takvimi"
  element={
    <FeedingSchedulePage calves={calves} feedStocks={feedStocks} />
  }
/>

        <Route
          path="/bakim-kayitlari"
          element={<CareRecordsPage calves={calves} />}
        />

        <Route
          path="/saglik-kayitlari"
          element={<HealthRecordsPage calves={calves} />}
        />

        <Route
          path="/uyarilar"
          element={<AlertsPage calves={calves} feedStocks={feedStocks} />}
        />

        <Route
          path="/raporlar"
          element={
            <ReportsPage
              calves={calves}
              feedStocks={feedStocks}
              careRecordCount={careRecordCount}
            />
          }
        />

        <Route path="/ayarlar" element={<SettingsPage />} />
      </Routes>
    </div>
  </main>
)
}

export default HomePage