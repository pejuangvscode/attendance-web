"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function DatabasePage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay(); 
  };

  const handleSelectDate = (day: number, month: number) => {
    setSelectedMonth(null); 
    setSelectedDate(new Date(year, month, day));
  };

  const handleSelectMonth = (month: number) => {
    setSelectedDate(null); 
    setSelectedMonth(month);
  };

  const router = useRouter();

  const handleNext = () => {
  if (selectedDate === null && selectedMonth === null) {
    return alert("Pilih bulan atau tanggal dulu!");
  }

  localStorage.setItem(
    "ibadahSelection",
    JSON.stringify({
      year,
      selectedMonth, 
      selectedDate,  
    })
  );
  void router.push("/database");
};

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-indigo-900 text-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <Image src="/LOGOGKI.png" alt="Logo" width={48} height={48} className="h-12 w-12"/>
          <span className="ml-3 text-2xl font-bold">Data Jemaat GKI Karawaci</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-indigo-700 rounded-full">?</button>
          <button className="p-2 hover:bg-indigo-700 rounded-full">⟳</button>
        </div>
      </div>

      <div className="bg-indigo-400 text-center font-semibold text-white py-2">
        Pilih Bulan atau Tanggal Ibadah
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setYear(year - 1)}
          className="p-2 rounded-full  hover:bg-indigo-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold">Tahun {year}</h2>
        <button
          onClick={() => setYear(year + 1)}
          className="p-2 rounded-full  hover:bg-indigo-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 flex-grow">
        {monthNames.map((month, monthIndex) => {
          const daysInMonth = getDaysInMonth(monthIndex, year);
          const firstDay = getFirstDayOfMonth(monthIndex, year);

          const daysArray = Array(firstDay).fill(null).concat(
            Array.from({ length: daysInMonth }, (_, i) => i + 1)
          );

          return (
            <div
              key={month}
              className={`bg-white rounded-2xl shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl ${
                selectedMonth === monthIndex ? "border-2 border-indigo-600" : ""
              }`}
            >
              <h3
                className={`text-center font-semibold mb-2 cursor-pointer ${
                  selectedMonth === monthIndex ? "text-indigo-600" : ""
                }`}
                onClick={() => handleSelectMonth(monthIndex)}
              >
                {month}
              </h3>

              <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                {["m", "t", "w", "t", "f", "s", "s"].map((d) => (
                  <div key={d} className="text-center">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {daysArray.map((day, i) => (
                  <div
                    key={i}
                    className={`p-1 rounded-lg cursor-pointer ${
                      day === null
                        ? ""
                        : selectedDate &&
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === monthIndex &&
                          selectedDate.getFullYear() === year
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-indigo-200"
                    }`}
                    onClick={() =>
                      typeof day === "number" && handleSelectDate(day, monthIndex)
                    }
                  >
                    {day ?? ""}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

     {((selectedDate ?? selectedMonth !== null)) && (
        <div className="flex justify-between items-center px-6 mb-6">
          <p className="font-bold ml-130">
            {selectedDate
              ? `Tanggal terpilih: ${selectedDate.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}`
              : selectedMonth !== null
              ? `Bulan terpilih: ${monthNames[selectedMonth]} ${year}`
              : ""}
          </p>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg font-semibold"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
