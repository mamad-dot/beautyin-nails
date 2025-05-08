import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">BeautyIn Nails</h1>
          <div className="flex items-center space-x-4">
            <input 
              type="search"
              placeholder="Cari layanan..."
              className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70"
            />
          </div>
        </header>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/layanan" className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition">
            <div className="flex flex-col items-center text-white">
              <Image src="/icons/nail-service.png" alt="Layanan" width={64} height={64} />
              <h3 className="mt-4 text-xl font-semibold">Layanan Kuku</h3>
            </div>
          </Link>

          <Link href="/appointment" className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition">
            <div className="flex flex-col items-center text-white">
              <Image src="/icons/calendar.png" alt="Appointment" width={64} height={64} />
              <h3 className="mt-4 text-xl font-semibold">Buat Janji</h3>
            </div>
          </Link>

          <Link href="/statistik" className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition">
            <div className="flex flex-col items-center text-white">
              <Image src="/icons/stats.png" alt="Statistik" width={64} height={64} />
              <h3 className="mt-4 text-xl font-semibold">Statistik</h3>
            </div>
          </Link>
        </div>

        {/* Pengumuman dan Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Pengumuman Terbaru</h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-white font-semibold">Promo Akhir Tahun!</h3>
                <p className="text-white/80">Dapatkan diskon 20% untuk semua layanan perawatan kuku.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Tips Perawatan</h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-white font-semibold">Cara Merawat Kuku</h3>
                <p className="text-white/80">Jaga kelembaban kuku dengan menggunakan pelembab khusus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}