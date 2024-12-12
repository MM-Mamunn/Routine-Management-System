import axios from "axios";
import Nav1 from "./components/Nav1";
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [schedule, setSchedule] = useState([]);
  const [show,setshow]= useState(0);
  const [search,setSearch] = useState("")

  useEffect(() => {

}, []);


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



  ///function
  const handleChange = (e) => {
     setshow(0);
    setSearch(e.target.value)
  };

  const fetchRoutine = async()=>{
    let inp = search.toUpperCase()
    console.log(inp)
    axios
    .get(`http://127.0.0.1:3000/api/section/fullroutine/${inp}`)
    .then((res) => {
        setSchedule(res.data.rows);
        console.log(res.data.rows);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }
  const handleSearch = async (e) => {
    setshow(0);
    await fetchRoutine();
    setshow(1);
  }
  return (
    <div className="bg-[#D4EBF8]">
    <Nav1/>

    <div className="add justify-center mt-2  items-center flex mx-[250px]">
          <input 
            name={search}
            value={search}
            onChange={handleChange}
            type="text"
            className="mx-2 px-2 min-h-[70px] min-w-[400px] my-1 bg-[#fff5e1] text-[#0A3981]  rounded-2xl"
          />
          <button
            onClick={handleSearch}
            disabled={search.length < 3 || search.length > 4}
            className="bg-[#1F509A] text-white disabled:bg-green-950 hover:bg-green-800  rounded-2xl h-[60px] py-2 px-3 mt-[9px]"
          >
            Search
          </button>
        </div>


  <div className="min-h-screen  flex items-center justify-center p-4 sm:p-8">
   {show == 0 &&(
    <div className="font-bold flex justify-center text-slate-300 font-serif size-5 w-full opacity-45">
      Enter Section to Search
    </div>
   )}
   
    {show == 1 &&(
      <div> 

<div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl shadow-[#0A3981]">
        <h1 className="text-2xl font-bold text-center text-slate-200 font-serif bg-[#0A3981] py-4">
          Class Schedule of {search}
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
    )}
      
    </div>
    </div>
  );
  
};

export default Login;
