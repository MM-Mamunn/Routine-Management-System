import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const HomePage = () => {
  const [profile, setProfile] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [toggle,setToggle] = useState(0)
    const [tkn,setTkn] = useState("");
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
        
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: { jwtToken: token },
        });
        setProfile(response.data.rows[0]); // Set profile data
        console.log("data are ",response.data.rows[0]);
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        Cookies.remove("jwtToken"); // Remove invalid token
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


  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const classes = ['10.30-11.20', '11.20-12.10', '12.10-1.00', '1.40-2.30', '2.30-3.20', '3.20-4.10'];

  const generateDaySchedule = (day) => {
    const daySchedule = schedule.filter((item) => item.day === days.indexOf(day));
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
        mergedSchedule.push({ subject: '-', colspan: 1 });
        i++;
      }
    }
    return mergedSchedule;
  };

  const fetchRoutine = async(token)=>{
    const token2 = Cookies.get("jwtToken");
    
    if (!token2) {
        navigate("/"); // Redirect to login if no token
        return;
    }
    
    try {
          console.log("fetchroutine called now2",token2);
          const response = await axios.post("http://localhost:3000/api/user/fullroutine", {},
            {
                headers: { jwtToken: token2 },
            }
        );
            console.log("fetchroutine called no",token2);

        setSchedule(response.data.rows); // Set profile data
        console.log("classes are ",response.data.rows[0]);
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Cookies.remove("jwtToken"); // Remove invalid token
        navigate("/"); // Redirect to login
      }
  }
  return (
    <div>
      <h1>Home Page</h1>
      {profile ? (
        <div>
          <h2>Welcome, {profile.name}</h2>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

<button onClick={handleLogout}>Logout</button>

<p>-----------------</p>


<div className="min-h-screen  flex items-center justify-center p-4 sm:p-8">

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
                  <th key={index} className="font-bold p-4 border border-black">
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
                        ? 'bg-gradient-to-r from-[#D4EBF8] via-gray-[#1F509A] to-[#0A3981]'
                        : 'bg-gradient-to-r to-gray-400 via-gray-300 from-gray-50'
                    } hover:bg-blue-100`}
                  >
                    <td className="p-4 text-gray-700 capitalize font-bold border border-black">{day}</td>
                    {scheduleForDay.map((item, index) => (
                      <td
                        key={index}
                        colSpan={item.colspan}
                        className="p-4 text-gray-600 border border-black"
                      >
                      <div className="flex text-black text-[15px] justify-center items-center ">  {item.subject} </div>
                      <div className="flex text-black text-[10px] justify-center items-center ">  {item.faculty}</div>
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
