import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Nav1 from "./components/Nav1";

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [personalClass, setpersonalClass] = useState([]);
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });
  const [slot, setSlot] = useState(9); // Default slot as 7 (no slot)
  const [day, setDay] = useState(new Date().getDay()); // Current day (0 = Sunday)
  const navigate = useNavigate();

  useEffect( () => {
    const fetchProfile = async () => {
      const token = Cookies.get("jwtToken");
      console.log("came to fetch profile1");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }
      try {
        console.log("came to fetch profile2",token);
        
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/user/profile`,
          {
            headers: { jwtToken: token },
          }
        );
        console.log("profile is ",response.data[0]);
        setProfile(response.data[0]);
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        Cookies.remove("jwtToken"); // Remove invalid token
        navigate("/"); // Redirect to login
      }
    };

    const fetchRoutine = async () => {
      const token = Cookies.get("jwtToken");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/user/fullroutine`,
          {},
          {
            headers: { jwtToken: token },
          }
        );
        setSchedule(response.data.rows);
      } catch (error) {
        console.error("Failed to fetch routine:", error);
        navigate("/"); // Redirect to login
      }
    };
    const fetchCurrentClass = async () => {
      const token = Cookies.get("jwtToken");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }
      
      await calculateCurrentClass();
      try {
        console.log("came to fetch personal routinee and slot ",slot);
        
        const response = await  axios
        .get(`${import.meta.env.VITE_URL}/api/user/currentpersonalclass/${day}/${slot}`,{
          headers: { jwtToken: token },
        })
        .then((res) => {
          setpersonalClass(res.data.currentclass);
          console.log("all classes are ",res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      } catch (error) {
        console.error("Failed to fetch current:", error);
        navigate("/"); // Redirect to login
      }
    };
    const calculateCurrentClass = async() => {
      
          const determineSlot =async (hour, minute) => {
            const currentTime = hour * 60 + minute;
      
            if (currentTime >= 630 && currentTime <= 679) setSlot(1); // 10:30 AM - 11:19 AM
            if (currentTime >= 680 && currentTime <= 730) setSlot(2); // 11:20 AM - 12:10 PM
            if (currentTime >= 731 && currentTime <= 780) setSlot(3); // 12:11 PM - 1:00 PM
            if (currentTime >= 820 && currentTime <= 869) setSlot(4); // 1:40 PM - 2:29 PM
            if (currentTime >= 870 && currentTime <= 929) setSlot(5); // 2:30 PM - 3:19 PM
            if (currentTime >= 930 && currentTime <= 970) setSlot(6); // 3:20 PM - 4:10 PM
      
            setSlot(8);
          };

      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      setTime({
        hour: currentHour,
        minute: currentMinute,
      });
      determineSlot(currentHour, currentMinute);
      console.log("setting slot ",slot);
    
      setDay(now.getDay());
      
      console.log("slot",slot);
      
    };

    fetchProfile();
    fetchRoutine();
    // await calculateCurrentClass();
     fetchCurrentClass();
    const timer = setInterval(calculateCurrentClass, 600000); // Update every minute
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [navigate]);

  // Log updates to slot for debugging
  useEffect(() => {
    console.log("Updated slot:", slot);
  }, [slot]);

  const handleLogout = () => {
    Cookies.remove("jwtToken"); // Remove the JWT token
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
        i += classItem.count; // Skip spanned periods
      } else {
        mergedSchedule.push({ subject: "-", colspan: 1 });
        i++;
      }
    }
    return mergedSchedule;
  };

  return (
    <div>
      <Nav1 />
      <div className="m-2 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center bg-[#0A3981] p-2 rounded-lg">
          <h1 className="bg-[#E38E49] inline-block rounded-md p-2 m-2">
            Home Page
          </h1>
          
          {profile ? (
            <div className="flex flex-col justify-center items-center p-2 gap-2 bg-[#1F509A] m-2 w-[40vw] rounded-md">
              <div className="border-2 w-[30vw] border-black flex justify-center items-center p-1 rounded-sm bg-[#D4EBF8]">
                Welcome, {profile.name}
              </div>
              <div className="flex w-[30vw] justify-center items-center ">
                <div className="border-2 w-[30vw] border-black flex justify-center items-center p-1 rounded-sm bg-[#D4EBF8]">
                  ID: {profile.id}
                </div>
                <div className="border-2 w-[30vw] border-black flex justify-center items-center p-1 rounded-sm bg-[#D4EBF8]">
                  Section: {profile.sec}
                </div>
              </div>
              <button
                className="border-2 border-blue-950 px-2 py-1 rounded-lg bg-[#E38E49] m-[2px]"
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

        {slot === 7 ? <div>
            No Classes Now
            {slot}
            </div> 
          : <div>Not hi {slot}</div>}
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
{/* current class */}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl shadow-[#0A3981]">

          <h1 className="text-2xl font-bold text-center text-slate-200 font-serif bg-[#0A3981] py-4">
            Class Schedule
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-[#E38E49] text-white">
                <tr>
                  <th className="p-4 border border-black">Day</th>
                  {classes.map((classNumber, index) => (
                    <th
                      key={index}
                      className="font-bold p-4 border border-black"
                    >
                      {classNumber}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => {
                  const scheduleForDay = generateDaySchedule(day);
                  return (
                    <tr
                      key={day}
                      className={`${
                        dayIndex % 2 === 0
                          ? "bg-gradient-to-r from-[#D4EBF8] to-[#0A3981]"
                          : "bg-gray-200"
                      } hover:bg-blue-100`}
                    >
                      <td className="p-4 text-gray-700 capitalize font-bold border border-black">
                        {day}
                      </td>
                      {scheduleForDay.map((item, index) => (
                        <td
                          key={index}
                          colSpan={item.colspan}
                          className="p-4 text-gray-600 border border-black"
                        >
                          <div className="flex justify-center text-black text-[15px]">
                            {item.subject}
                          </div>
                          <div className="flex justify-center text-black text-[10px]">
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
    </div>
  );
};

export default HomePage;
