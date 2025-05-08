'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Design {
  id: string;
  namaDesign: string;
  kategori: string;
  harga: number;
  gambar: string;
}

interface Booking {
  id: string;
  namaPelanggan: string;
  treatment: string;
  tanggal: string;
  waktu: string;
  nailArtist: string;
  status: string;
  harga: number;
}

export default function AdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    namaDesign: '',
    kategori: 'Natural',
    harga: '',
    gambar: null as File | null
  });

  useEffect(() => {
    const savedDesigns = JSON.parse(localStorage.getItem('designs') || '[]');
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setDesigns(savedDesigns);
    setBookings(savedBookings);
  }, []);

  const handleDelete = (designId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus design ini?')) {
      const updatedDesigns = designs.filter(design => design.id !== designId);
      localStorage.setItem('designs', JSON.stringify(updatedDesigns));
      setDesigns(updatedDesigns);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        gambar: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gambar) {
      alert('Silakan pilih gambar terlebih dahulu');
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(formData.gambar);
      
      reader.onload = () => {
        const newDesign = {
          id: Date.now().toString(),
          namaDesign: formData.namaDesign,
          kategori: formData.kategori,
          harga: parseFloat(formData.harga),
          gambar: reader.result as string
        };
        
        const updatedDesigns = [...designs, newDesign];
        localStorage.setItem('designs', JSON.stringify(updatedDesigns));
        setDesigns(updatedDesigns);
        setFormData({
          namaDesign: '',
          kategori: 'Natural',
          harga: '',
          gambar: null
        });
        setShowForm(false);
      };
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data');
      console.error('Error:', error);
    }
  };

  const handleStatusChange = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: 'confirmed',
          nailArtist: 'Admin' // Bisa diganti sesuai kebutuhan
        };
      }
      return booking;
    });

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printArea');
    const windowPrint = window.open('', '', 'width=900,height=600');
    
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Daftar Booking BeautyInn Nail Studio</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
              .header { text-align: center; margin-bottom: 20px; }
              .print-date { text-align: right; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>BeautyInn Nail Studio</h1>
              <h2>Daftar Booking</h2>
            </div>
            <div class="print-date">
              Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}
            </div>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
      windowPrint.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Tambah Design
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Design</h3>
            <p className="text-3xl font-bold text-purple-600">{designs.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Booking</h3>
            <p className="text-3xl font-bold text-purple-600">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Pending</h3>
            <p className="text-3xl font-bold text-purple-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Booking Table with Print Button */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Daftar Booking</h2>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Cetak Daftar
              </button>
            </div>
            <div id="printArea">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nama Pelanggan</th>
                    <th className="px-4 py-2 text-left">Treatment</th>
                    <th className="px-4 py-2 text-left">Tanggal</th>
                    <th className="px-4 py-2 text-left">Waktu</th>
                    <th className="px-4 py-2 text-left">Nail Artist</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="px-4 py-2">{booking.id}</td>
                      <td className="px-4 py-2">{booking.namaPelanggan}</td>
                      <td className="px-4 py-2">{booking.treatment}</td>
                      <td className="px-4 py-2">{booking.tanggal}</td>
                      <td className="px-4 py-2">{booking.waktu}</td>
                      <td className="px-4 py-2">{booking.nailArtist}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(booking.harga)}
                      </td>
                      <td className="px-4 py-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(booking.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                          >
                            Konfirmasi
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Design Gallery */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Galeri Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((design, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={design.gambar}
                    alt={design.namaDesign}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(design.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{design.namaDesign}</h3>
                  <p className="text-purple-600 font-medium">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(design.harga)}
                  </p>
                  <p className="text-sm text-gray-500">{design.kategori}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Tambah Design Baru</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Design
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.namaDesign}
                    onChange={(e) => setFormData({...formData, namaDesign: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.kategori}
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  >
                    <option value="Natural">Natural</option>
                    <option value="Artistic">Artistic</option>
                    <option value="French">French</option>
                    <option value="Gel">Gel</option>
                    <option value="Wedding">Wedding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.harga}
                    onChange={(e) => setFormData({...formData, harga: e.target.value})}
                    placeholder="Contoh: 499000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Gambar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}