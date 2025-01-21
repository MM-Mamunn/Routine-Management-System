import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "./components/Header";

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [tkn, setTkn] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("jwtToken");
      //   alert(token);
      console.log("fetch profile called");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }

      try {
        setTkn(token);

        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/user/profile`,
          {
            headers: { jwtToken: token },
          }
        );
        setProfile(response.data.rows[0]); // Set profile data
        console.log("data are ", response.data.rows[0]);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Cookies.remove("jwtToken"); // Remove invalid token
        navigate("/"); // Redirect to login
      }
    };

    fetchProfile();
    fetchRoutine();
    // if(toggle == 0)
    //     setToggle(1)
    // else setToggle(0);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwtToken"); // Remove the JWT token from cookies
    navigate("/"); // Redirect to login page
  };

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

  const fetchRoutine = async (token) => {
    const token2 = Cookies.get("jwtToken");

    if (!token2) {
      navigate("/"); // Redirect to login if no token
      return;
    }

    try {
      console.log("fetchroutine called now2", token2);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/fullroutine`,
        {},
        {
          headers: { jwtToken: token2 },
        }
      );
      console.log("fetchroutine called no", token2);

      setSchedule(response.data.rows); // Set profile data
      console.log("classes are ", response.data.rows[0]);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      // Cookies.remove("jwtToken"); // Remove invalid token
      navigate("/"); // Redirect to login
    }
  };
  return (
    <div>
      <Header />
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="flex  flex-col items-center bg-purple-50 p-2 rounded-lg">
          <h1 className="font-bold text-2xl">Profile</h1>
          {profile ? (
            <div className="flex flex-col justify-center items-center p-2 gap-2 m-2 w-[40vw] rounded-md">
              <div className="px-6 border flex justify-center items-center p-1 rounded-sm bg-white">
                Welcome, {profile.name}
              </div>
              <div className="flex justify-center items-center min-w-64 text-center">
                <div className="border border-r-0 flex-1 justify-center items-center p-1 rounded-sm bg-white">
                  ID: {profile.id}
                </div>
                <div className="border flex-1 justify-center items-center p-1 rounded-sm bg-white">
                  Section: {profile.sec}
                </div>
              </div>
              <button
                className="h-8 border border-purple-600 hover:border-purple-500 text-purple-600 hover:bg-purple-500 transition-colors disabled:bg-gray-400 hover:text-white px-4 rounded cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="min-h-screen  flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center py-4 border rounded-t">
            Class Schedule
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-4 border border-purple-800">Day</th>
                  {classes.map((classNumber, index) => (
                    <th
                      key={index}
                      className="font-bold p-4 border border-purple-800 whitespace-nowrap text-center"
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
                          className="p-4 text-gray-600 border border-gray-200 text-center"
                        >
                          <p className="text-sm"> {item.subject} </p>
                          <p className="text-xs mt-1"> {item.faculty}</p>
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
    </div>
  );
};

export default HomePage;
