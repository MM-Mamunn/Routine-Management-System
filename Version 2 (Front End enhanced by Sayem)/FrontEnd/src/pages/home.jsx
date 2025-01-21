import axios from "axios";
import Nav1 from "./components/Nav1";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

const Login = () => {
  const [schedule, setSchedule] = useState([]);
  const [show, setshow] = useState(0);
  const [search, setSearch] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const classes = [
    "10.30-11.20",
    "11.20-12.10",
    "12.10-1.00",
    "1.40-2.30",
    "2.30-3.20",
    "3.20-4.10",
  ];

  const generateDaySchedule = (day) => {
    const daySchedule = schedule.filter(
      (item) => item.day === days.indexOf(day)
    );
    const mergedSchedule = [];
    let i = 1;

    while (i <= classes.length) {
      const classItem = daySchedule.find((item) => item.slot === i);
      if (classItem) {
        mergedSchedule.push({
          subject: `${classItem.code}, ${classItem.room}`,
          faculty: `${classItem.faculty}`,
          colspan: classItem.count,
        });
        i += classItem.count; // Skip the spanned periods
      } else {
        mergedSchedule.push({ subject: "-", colspan: 1 });
        i++;
      }
    }
    return mergedSchedule;
  };

  const handleChange = async (e) => {
    setshow(0);

    const value = e.target.value;
    setSearch(value);

    if (value.length >= 1 && value.length <= 4) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/api/lookLike/sectionLookLike/${value}`
        );
        if (response.ok) {
          const data = await response.json();
          const sections = data.rows.map((row) => row.sec);

          setSuggestions(sections);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchRoutine = async () => {
    let inp = search.toUpperCase();
    console.log(inp);
    axios
      .get(`${import.meta.env.VITE_URL}/api/section/fullroutine/${inp}`)
      .then((res) => {
        setSchedule(res.data.rows);
        console.log(res.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleSearch = async (e) => {
    setshow(0);
    await fetchRoutine();
    setSuggestions([]);
    setshow(1);
  };
  return (
    <div>
      {/* <Nav1 /> */}
      <Header />
      <p className="font-medium flex justify-center w-full mt-10">
        Enter Section to Search
      </p>
      <div className="justify-center items-center flex max-w-xs mx-auto mt-2 relative">
        <input
          name="search"
          value={search}
          onChange={handleChange}
          autoComplete="off"
          type="text"
          className="h-9 px-3 w-full outline-none border border-gray-200 focus:border-purple-600 rounded-l"
        />
        <button
          onClick={handleSearch}
          disabled={search.length < 1 || search.length > 4}
          className="h-9 bg-purple-600 hover:bg-purple-600/90 transition-colors disabled:bg-gray-400 text-white px-4 rounded-r cursor-pointer"
        >
          Search
        </button>

        {loading == 0 && (
          <ul className="absolute top-full left-0 right-0  rounded shadow-lg overflow-hidden mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 text-[#0A3981] hover:bg-purple-600 hover:text-white cursor-pointer border-b border-b-gray-100 last:border-b-0"
                onClick={() => {
                  setSearch(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && (
        <p className="text-gray-500  ml-[35vw] mt-2">Loading suggestions...</p>
      )}
      <div className="flex items-center justify-center p-4 sm:p-8">
        {show == 1 && (
          <div>
            <div className="bg-white w-full max-w-4xl">
              <h1 className="text-2xl font-bold text-center py-4 border rounded-t">
                Class Schedule of {search}
              </h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="p-4 border border-purple-800">Day</th>
                      {classes.map((classNumber, index) => (
                        <th
                          key={index}
                          className="font-bold p-4 border border-purple-800"
                        >
                          {classNumber}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, dayIndex) => {
                      const scheduleForDay = generateDaySchedule(day);
                      if (dayIndex === 4 || dayIndex === 5) return;
                      return (
                        <tr
                          key={day}
                          className={`${
                            dayIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-purple-100`}
                        >
                          <td className="p-4 text-gray-700 capitalize font-bold border border-gray-200">
                            {day}
                          </td>
                          {scheduleForDay.map((item, index) => (
                            <td
                              key={index}
                              colSpan={item.colspan}
                              className="p-4 text-gray-600 border border-gray-200"
                            >
                              <div className="flex text-black text-[15px] justify-center items-center ">
                                {" "}
                                {item.subject}{" "}
                              </div>
                              <div className="flex text-black text-[10px] justify-center items-center ">
                                {" "}
                                {item.faculty}
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
