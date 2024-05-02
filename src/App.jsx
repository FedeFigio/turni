import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import moment from 'moment/min/moment-with-locales';
import Dropdown from './components/Dropdown';
import { initFlowbite } from 'flowbite';

moment.locale('it');

const employees = [
  {
    "id": 1,
    "name": "MASTRONA",
    "surname": "COGNOME",
    "hours": 40
  },
  {
    "id": 2,
    "name": "GIAGIAGIAMBRO",
    "surname": "COGNOME",
    "hours": 40
  },
  {
    "id": 3,
    "name": "MARIO",
    "surname": "COGNOME",
    "hours": 38
  },
  {
    "id": 4,
    "name": "PINO",
    "surname": "COGNOME",
    "hours": 38
  },
  {
    "id": 5,
    "name": "SFRECCIASFRANCI",
    "surname": "COGNOME",
    "hours": 38
  }
]

function App() {
  useEffect(() => {
    initFlowbite()
  }, [])

  const [employeesList, setEmployeesList] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState("");
  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (employeesList.length) {
      localStorage.setItem("employeesStorage", JSON.stringify(employeesList));
      localStorage.setItem("datesStorage", JSON.stringify(dates));
    }
  }, [employeesList])

  useEffect(() => {
    if (localStorage.getItem("employeesStorage")) {
      const employeesStorage = localStorage.getItem("employeesStorage");
      const datesStorage = localStorage.getItem("datesStorage");

      setDates(JSON.parse(datesStorage));
      setEmployeesList(JSON.parse(employeesStorage));
    }
  }, [])

  console.log(employeesList);
  const datesSelected = React.useMemo(() => {
    const start = moment(dates.startDate);
    const end = moment(dates.endDate);
    const diffDays = end.diff(start, 'days');
    const generatedDates = [];
    for (let i = 0; i <= diffDays; i++) {
      const currentDate = start.clone().add(i, 'days');
      generatedDates.push(currentDate);
    }
    return generatedDates;
  }, [dates]);

  const getWeeks = () => {
    const weeks = datesSelected.reduce((acc, date, index) => {
      if (index % 7 === 0) {
        acc.push([]);
      }
      const weekIndex = Math.floor(index / 7);
      acc[weekIndex].push(date);
      return acc;
    }, []);
    return weeks;
  }
  const handleAddEmployee = () => {
    const newEmployee = {
      ...employees.find(employee => employee.id == employeeSelected),
      weeks: getWeeks().map(week => week.map(date => ({ date, start: "", startBreak: "", endBreak: "", end: "", hours: "0:00", riposo: false })))
    }
    setEmployeesList([...employeesList, newEmployee]);
  }

  const renderThead = (week) => {
    return (
      <thead>
        <tr>
          <th className='border'>Dipendente</th>
          {week.map(date => <th className='p-2 border' key={date}>
            <div className='flex flex-col'>
              <span>
                {moment(date).format('dddd')}
              </span>
              <span>
                {moment(date).format('DD/MM/YYYY')}
              </span>
            </div>
          </th>)}
          <th className='border'>Ore settimanali</th>
        </tr>
      </thead>
    )
  }


  const renderTbody = (weekIndex) => {
    return (
      <tbody>
        {employeesList.map((employee, employeeIndex) => {
          return <tr key={employee.id + weekIndex} >
            <td className='border h-60'>{employee.name}</td>
            {employee.weeks[weekIndex].map((day, dayIndex) => {

              return <td className='p-2 border' key={employee.name + dayIndex}>
                <TimeOptions day={day} setEmployeesList={setEmployeesList} employeeIndex={employeeIndex} dayIndex={dayIndex} weekIndex={weekIndex} ></TimeOptions>

              </td>
            }

            )}
            <td>


            </td>
          </tr>
        }
        )}
      </tbody>
    )
  }
  const handleNew = () => {
    localStorage.removeItem("employeesStorage");
    localStorage.removeItem("datesStorage");
    setEmployeesList([]);
    setDates({ startDate: "", endDate: "" });

  }

  return (
    <div className='w-4/5 mx-auto'>
      <h1 className="text-3xl font-bold underline text-center text-red-800">Turni</h1>
      <div className='mb-12 gap-12 flex items-end'>
        <div>
          <div className='flex gap-4'>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dal</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Dal' value={dates.startDate} onChange={(e) => setDates({ ...dates, startDate: e.target.value })} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Al</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Al' value={dates.endDate} onChange={(e) => setDates({ ...dates, endDate: e.target.value })} />
            </div>
          </div>
        </div>
        <div className='flex gap-4'>

          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={employeeSelected} onChange={(event) => setEmployeeSelected(event.target.value)} name="worker" >
            <option value="">Seleziona dipendente</option>
            {employees.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
          </select>
          <button onClick={() => handleAddEmployee()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aggiungi dipendente</button>
          <button onClick={() => handleNew()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nuovo piano</button>
        </div>
      </div>
      <hr className='mb-12' />
      {!!employeesList.length && <div >

        {getWeeks().map((week, weekIndex) => {
          return <div className='mb-8' key={weekIndex}>
            <h6 className='font-bold text-2xl mb-2'>Settimana dal {moment(week[0]).format('DD/MM/YYYY')} al {moment(week[week.length - 1]).format('DD/MM/YYYY')}</h6>
            <div className='overflow-x-auto'>
              <div className='flex items-center'>

                <table key={weekIndex + Math.random()}>
                  {renderThead(week)}
                  {renderTbody(weekIndex)}
                </table>
              </div>
            </div>
          </div>
        }
        )}
      </div>}










    </div>
  )
}

export default App;



const TimeOptions = ({ day, setEmployeesList, employeeIndex, dayIndex, weekIndex }) => {

  var dataCorrente = moment().format("YYYY-MM-DD");

  const handleChangeStart = (e) => {
    const value = moment(dataCorrente + " " + e.target.value)
    const start = value.format('HH:mm')
    const startBreak = value.add(4.5, 'hours').format('HH:mm')
    const endBreak = value.add(.5, 'hours').format('HH:mm')

    setEmployeesList((state) => {
      let newState = [...state]
      newState[employeeIndex].weeks[weekIndex][dayIndex] = { ...newState[employeeIndex].weeks[weekIndex][dayIndex], start: start, startBreak: startBreak, endBreak: endBreak }
      return newState
    })
  }

  const handleChangeEnd = (e) => {
    const value = moment(dataCorrente + " " + e.target.value)
    const end = value.format('HH:mm')

    setEmployeesList((state) => {
      let newState = [...state]
      newState[employeeIndex].weeks[weekIndex][dayIndex] = { ...newState[employeeIndex].weeks[weekIndex][dayIndex], end: end }
      return newState
    })
  }
  const totalDayHours = useMemo(() => {
    const start = moment(day.date + " " + day.start);
    const end = moment(day.date + " " + day.end);
    end.subtract(30, 'minutes');
    const diffMinutes = end.diff(start, 'minutes');
    if (diffMinutes <= 0) {
      return '0:00';
    }
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }, [day]);

  const handleChangeRiposo = (e) => {
    setEmployeesList((state) => {
      let newState = [...state]
      newState[employeeIndex].weeks[weekIndex][dayIndex] = { ...newState[employeeIndex].weeks[weekIndex][dayIndex], riposo: true }
      return newState
    })
  }

  return (
    <div>
      <div className='flex justify-between  mb-2'>
        <Dropdown id={weekIndex} week={weekIndex} handleChangeRiposo={handleChangeRiposo}></Dropdown>
        <div className='text-center'>{totalDayHours}</div>
      </div>
      {!day.riposo ? <>

        <div className='flex '>
          <input className='w-1/2 bg-blue-500/15' placeholder="Ora inizio" onFocus={(e) => e.target.type = 'time'} value={day.start} onChange={handleChangeStart} type={day.start === "" ? "text" : "time"} />
          <input className='w-1/2' disabled value={day.startBreak} type="time" />
        </div>
        <div className='flex'>
          <input className='w-1/2' disabled value={day.startBreak} type="time" />
          <input className='w-1/2' disabled value={day.endBreak} type="time" />
        </div>
        <div className='flex'>
          <input className='w-1/2' disabled value={day.endBreak} type="time" />
          <input className='w-1/2 bg-blue-500/15' placeholder="Ora fine" onFocus={(e) => e.target.type = 'time'} value={day.end} onChange={handleChangeEnd} type={day.end === "" ? "text" : "time"} />
        </div>
      </> : "riposo"
      }

    </div>
  )
}
