import axios from "axios";
import React, { useState, useEffect } from "react";
import { MapPin, User } from "lucide-react";

const Home = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/section/fullroutine/6BM")
      .then((res) => {
        console.log("API Response:", res.data); // Debug response
        setSchedule(res.data.rows || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const slots = [1, 2, 3, 4, 5, 6];
  const timeSlots = {
    1: "10:30 AM - 11:20 AM",
    2: "11:20 AM - 12:10 PM",
    3: "12:10 PM - 1:00 PM",
    4: "1:40 PM - 2:30 PM",
    5: "2:30 PM - 3:20 PM",
    6: "3:20 PM - 4:10 PM",
  };

  // Create the grid
  const routineGrid = Array(7).fill(null).map(() => Array(6).fill(null));

  // Populate the grid with the schedule
  schedule.forEach((classItem) => {
    for (let i = 0; i < classItem.count; i++) {
      routineGrid[classItem.day][classItem.slot - 1 + i] = classItem;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-indigo-900 to-slate-800 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-6xl shadow-blue-700">
        <h1 className="text-2xl font-bold text-center text-slate-700 font-serif bg-blue-300 py-4">
          Class Schedule
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th className="p-4 border-[2px]  border-black">Time / Day</th>
                {days.map((day, index) => (
                  <th key={index} className="font-bold p-4 border-[2px] border-black">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot}>
                  <td className="p-3 border-[2px]  border-black bg-gray-50 text-sm font-medium text-gray-500">
                    {timeSlots[slot]}
                  </td>
                  {days.map((_, dayIndex) => {
                    const classItem = routineGrid[dayIndex][slot - 1];

                    if (classItem && classItem.slot !== slot) {
                      return null; // Prevent duplicate cells for multi-slot classes
                    }

                    const rowSpan = classItem?.count || 1;

                    return classItem ? (
                      <td
                        key={`${dayIndex}-${slot}`}
                        rowSpan={rowSpan}
                        className="p-3 border-[2px]  border-black bg-indigo-50 hover:bg-indigo-100 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-indigo-900">{classItem.code}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-1" />
                            {classItem.faculty}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {classItem.room}
                          </div>
                          <div className="text-xs text-gray-500">Section: {classItem.sec}</div>
                        </div>
                      </td>
                    ) : (
                      <td
                        key={`${dayIndex}-${slot}`}
                        className="p-3 border-[2px]  border-black text-center text-sm text-gray-400"
                      >
                        -
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
