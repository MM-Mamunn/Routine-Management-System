import React, { useState } from "react";
import axios from "axios";
import Nav1 from "../components/Nav1";
import Header from "../components/Header";

const RoomAvailability = () => {
  const [day, setDay] = useState(null); // Stores the selected day
  const [slot, setSlot] = useState(null); // Stores the selected slot
  const [rooms, setRooms] = useState([]); // Stores the room data from the API
  const [building, setBuilding] = useState(null);

  // Handler for API submission
  const handleSubmit = async () => {
    if (day !== null && slot !== null) {
      try {
        let response;
        if (building == null) {
          response = await axios.get(
            `${import.meta.env.VITE_URL}/api/room/available/${day}/${slot}`
          );
        } else {
          console.log(building);
          response = await axios.get(
            `${
              import.meta.env.VITE_URL
            }/api/room/available/${day}/${slot}/${building}`
          );
        }
        setRooms(response.data || []);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-xs mx-auto mb-8 mt-6">
          <h1 className="text-2xl font-bold text-center text-purple-600 mb-4">
            Select Day & Slot
          </h1>

          {/* Dropdown for Day Selection */}
          <div className="mb-4">
            <label
              htmlFor="day"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Day
            </label>
            <select
              id="day"
              value={day !== null ? day : ""}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select a day
              </option>
              <option value={6}>Saturday</option>
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
            </select>
          </div>

          {/* Dropdown for Slot Selection */}
          <div className="mb-4">
            <label
              htmlFor="slot"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Slot
            </label>
            <select
              id="slot"
              value={slot !== null ? slot : ""}
              onChange={(e) => setSlot(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select a slot
              </option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Building Selection */}
          <div className="mb-4">
            <label
              htmlFor="building"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Building
            </label>
            <select
              id="building"
              value={building !== null ? building : ""}
              onChange={(e) =>
                setBuilding(e.target.value === "None" ? null : e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Building (None Selected)
              </option>
              {["C", "CX", "CXB", "None"].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={day === null || slot === null}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-all ${
              day !== null && slot !== null
                ? "bg-purple-600 hover:bg-purple-600/90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Rooms Table */}
        {rooms.length > 0 && (
          <div className="bg-white rounded-lg w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center py-4 border rounded-t">
              Available Rooms
            </h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="p-4 border border-purple-800">Room Name</th>
                    <th className="p-4 border border-purple-800">Room Name</th>
                    <th className="p-4 border border-purple-800">Room Name</th>
                    <th className="p-4 border border-purple-800">Room Name</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((roomm, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-purple-100`}
                    >
                      <td className="p-4 text-gray-700 capitalize font-bold border border-gray-200">
                        {roomm.room}
                      </td>
                      <td className="p-4 text-gray-700 capitalize font-bold border border-gray-200">
                        {roomm.room}
                      </td>
                      <td className="p-4 text-gray-700 capitalize font-bold border border-gray-200">
                        {roomm.room}
                      </td>
                      <td className="p-4 text-gray-700 capitalize font-bold border border-gray-200">
                        {roomm.room}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomAvailability;
