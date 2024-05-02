import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment/min/moment-with-locales';
import { initFlowbite } from 'flowbite';
import Modale from './components/Modal';
import { Button } from 'flowbite-react';
import Dropdowns from './components/Dropdown';

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
      weeks: getWeeks().map(week => week.map(date => ({ date, start: "", startBreak: "", endBreak: "", end: "", dayHours: "", riposo: false, ferie: false, festivita: false })))
    }
    setEmployeesList([...employeesList, newEmployee]);
    setEmployeeSelected("");
  }

  const renderThead = (week) => {
    return (
      <thead>
        <tr>
          <th className=''></th>
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

  const deleteEmployee = (employeeIndex) => {
    setEmployeesList(employeesList.filter((employee, index) => index !== employeeIndex));
  }

  function renderWeekHours() {

  }

  const renderTbody = (weekIndex) => {
    return (
      <tbody>
        {employeesList.map((employee, employeeIndex) => {
          return <tr key={employee.id + weekIndex} >
            <td className='px-4 '>
              <Modale employee={employee} onSubmit={() => deleteEmployee(employeeIndex)}></Modale>
            </td>
            <td className='border px-4'>{employee.name}</td>
            {employee?.weeks[weekIndex]?.map((day, dayIndex) => {
              return <td className={`border align-text-top p-4 ${day.ferie || day.festivita || day.riposo ? 'bg-green-200/35' : ''}`} key={employee.name + dayIndex}>
                <TimeOptions day={day} setEmployeesList={setEmployeesList} employeeIndex={employeeIndex} dayIndex={dayIndex} weekIndex={weekIndex} ></TimeOptions>
              </td>
            }
            )}
            <td className='border'>
              <div className='text-center'>

                {totalWeekHours(employee.weeks[weekIndex])}
              </div>
            </td>
          </tr>
        }
        )}
        <tr>
          <td>aaa</td>
          {renderWeekHours(employeesList, weekIndex)}
        </tr>
      </tbody>
    )
  }
  const handleNew = () => {
    localStorage.removeItem("employeesStorage");
    localStorage.removeItem("datesStorage");
    setEmployeesList([]);
    setDates({ startDate: "", endDate: "" });
  }
  const totalWeekHours = (data) => {
    let totalHours = 0;
    let totalMinutes = 0;

    data?.forEach(item => {
      if (item.dayHours) {
        const [hours, minutes] = item.dayHours.split(':').map(Number);
        totalHours += hours;
        totalMinutes += minutes;
      }
    });

    // Converti i minuti in ore se necessario
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    return `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
  };
  return (
    <div className='w-4/5 mx-auto'>
      <h1 className="text-3xl font-bold underline text-center text-red-800">Turni</h1>
      <div className='mb-12 gap-12 flex justify-between items-end'>
        <div>
          <div className='flex gap-4'>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dal</label>
              <input disabled={employeesList.length} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Dal' value={dates.startDate} onChange={(e) => setDates({ ...dates, startDate: e.target.value })} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Al</label>
              <input disabled={employeesList.length} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Al' value={dates.endDate} onChange={(e) => setDates({ ...dates, endDate: e.target.value })} />
            </div>
          </div>
        </div>
        <div className='flex gap-4'>

          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={employeeSelected} onChange={(event) => setEmployeeSelected(event.target.value)} name="worker" >
            <option value="">Seleziona dipendente</option>
            {employees.filter((e) => {
              let employeeFound = employeesList.find(employee => {
                return employee.id == e.id
              })
              return !employeeFound ? true : false

            }).map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
          </select>
          <Button color="blue" disabled={employeeSelected == ""} onClick={() => handleAddEmployee()} type="button" >Aggiungi dipendente</Button>
        </div>
        <div>
          <Button color="blue" onClick={() => handleNew()} type="button" >Nuovo piano</Button>

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
      let current = newState[employeeIndex].weeks[weekIndex][dayIndex]
      newState[employeeIndex].weeks[weekIndex][dayIndex] = { ...current, end: end, dayHours: getHours(current.start, end) }
      return newState
    })
  }


  const getHours = (start, end) => {
    if (start && end) {
      const format = 'HH:mm';
      const startTime = moment(start, format);
      const endTime = moment(end, format);

      if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
      }

      const duration = moment.duration(endTime.diff(startTime)).subtract(30, 'minutes');
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      return (`${hours}:${minutes.toString().padStart(2, '0')}`);
    }

  }


  const handleChangeOptions = (option) => {
    let normalize = { riposo: false, ferie: false, festivita: false, start: "", startBreak: "", endBreak: "", end: "", dayHours: "" }

    setEmployeesList((state) => {
      let newState = [...state]
      let current = newState[employeeIndex].weeks[weekIndex][dayIndex]
      normalize[option] = !current[option]
      newState[employeeIndex].weeks[weekIndex][dayIndex] = { ...current, ...normalize }
      return newState
    })
  }


  const renderOptions = (day) => {

    if (day.riposo) {
      return <div className='text-3xl font-semibold text-center mb-4'>Riposo</div>
    }
    else if (day.ferie) {
      return <div className='text-3xl font-semibold text-center mb-4'>Ferie</div>
    }
    else if (day.festivita) {
      return <div className='text-3xl font-semibold text-center mb-4'>Festività non lavorata</div>
    }
    else {
      return <>
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
      </>
    }

  }

  return (
    <div className="flex flex-col">
      <div className='flex justify-between  mb-4'>
        <Dropdowns day={day} id={weekIndex} week={weekIndex} handleChangeOptions={handleChangeOptions}></Dropdowns>
        {!day.riposo && !day.ferie && !day.festivita && <div className='text-center font-semibold'>{day.dayHours && `${day.dayHours} ore`}</div>}
      </div>
      <div className='flex-grow'>

        {renderOptions(day)}
      </div>

    </div>
  )
}
