"use client";
import { useEffect, useState } from "react";

type Selection = {
  year: number;
  selectedMonth: number;
  selectedDate: number | null;
};

export default function DatabaseTablePage() {
  const [selection, setSelection] = useState<Selection | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("ibadahSelection");
    if (data) setSelection(JSON.parse(data) as Selection);
  }, []);

  const jemaat = [
    { nama: "Toing Sidayat", kehadiran: "Hadir", jabatan: "Pendeta", status: "Aktif" },
    { nama: "Abdul Sulaiman", kehadiran: "Hadir", jabatan: "Pengurus A", status: "Aktif" },
    { nama: "Steve Johnson", kehadiran: "Tidak hadir", jabatan: "Pengurus B", status: "Aktif" },
    { nama: "Supriad Ismail", kehadiran: "Hadir", jabatan: "Pengurus C", status: "Aktif" },
    { nama: "Suti Sutantari", kehadiran: "Hadir", jabatan: "Jemaat", status: "Tidak Aktif" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4 text-center">
        Data Jemaat GKI Karawaci
      </h1>

      {selection && (
        <p className="text-center mb-6 text-gray-600">
          Data Ibadah: {selection.selectedDate ?? "-"}{" "}
          {selection.selectedMonth !== null && 
            new Date(0, selection.selectedMonth).toLocaleString("id-ID", { month: "long" })
          } {selection.year}
        </p>
      )}

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-900 text-white">
            <tr>
              <th className="px-4 py-2 border">No.</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Kehadiran</th>
              <th className="px-4 py-2 border">Jabatan</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {jemaat.map((j, idx) => (
              <tr key={idx} className="odd:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{j.nama}</td>
                <td className="px-4 py-2 border">{j.kehadiran}</td>
                <td className="px-4 py-2 border">{j.jabatan}</td>
                <td className="px-4 py-2 border">{j.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
