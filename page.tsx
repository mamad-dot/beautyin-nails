'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  treatment: string;
  booking_date: string;
  booking_time: string;
  artist: string;
  price: number;
  status: string;
  customer_name: string;
  customer_phone: string;
  notes: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Gagal menghapus booking');
      }

      // Refresh data booking setelah berhasil menghapus
      fetchBookings();
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menghapus booking');
    }
  };

  const isBookingPassed = (bookingDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(0, 0, 0, 0);
    return bookingDateTime < today;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Booking</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Tanggal Booking</th>
              <th className="px-6 py-3 border-b">Waktu</th>
              <th className="px-6 py-3 border-b">Treatment</th>
              <th className="px-6 py-3 border-b">Nail Artist</th>
              <th className="px-6 py-3 border-b">Pelanggan</th>
              <th className="px-6 py-3 border-b">No. Telepon</th>
              <th className="px-6 py-3 border-b">Harga</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className={isBookingPassed(booking.booking_date) ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 border-b">{formatDate(booking.booking_date)}</td>
                <td className="px-6 py-4 border-b">{booking.booking_time}</td>
                <td className="px-6 py-4 border-b">{booking.treatment}</td>
                <td className="px-6 py-4 border-b">{booking.artist}</td>
                <td className="px-6 py-4 border-b">{booking.customer_name}</td>
                <td className="px-6 py-4 border-b">{booking.customer_phone}</td>
                <td className="px-6 py-4 border-b">{formatPrice(booking.price)}</td>
                <td className="px-6 py-4 border-b">
                  <span className={`px-2 py-1 rounded ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b">
                  {isBookingPassed(booking.booking_date) && (
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}