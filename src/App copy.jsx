import React, {  useState } from 'react';
import './App.css';
import moment from 'moment/min/moment-with-locales';
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
  }
]


function App() {
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState("");
  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  });

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
  }, [dates])




  const handleAddEmployee = () => {
    const newEmployee = {
      ...employees.find(employee => employee.id == employeeSelected),
      days: datesSelected.map(date => ({ date, start: "", end: "" }))
    }

    setEmployeesList([...employeesList, newEmployee]);
  }

  

  const renderThead = () => {
    return (
      <thead>
        <tr>
          <th className='border'>Dipendente</th>
          {datesSelected.map(date => <th className='p-2 border' key={date}>
            <div className='flex flex-col'>
              <span>
                {moment(date).format('dddd')}
              </span>
              <span>
                {moment(date).format('DD/MM/YYYY')}
              </span>
            </div>
          </th>)}
        </tr>
      </thead>
    )
  }

  const handleChangeHour = (employeeIndex, dayIndex, startOrEnd) => {
    const employee = employeesList[employeeIndex];
    const day = employee.days[dayIndex];
    employee.days[dayIndex] = {
      ...day,
      [startOrEnd]: "10:00",
    }

    setEmployeesList([...employeesList]);
  }

  const renderTbody = () => {
    return (
      <tbody>
        {employeesList.map((employee, employeeIndex) => (
          <tr key={employee.id}>
            <td className='border'>{employee.name}</td>
            {employee.days.map((day, dayIndex) => (
              <td className='p-2 border' key={employee.name + day.date}>
                <div className='flex'>
                  <div onClick={() => handleChangeHour(employeeIndex, dayIndex, 'start')} className='border border-red-400 p-2'>
                    {day.start}
                  </div>
                  <div onClick={() => handleChangeHour(employeeIndex, dayIndex, 'end')} className='border border-red-400 p-2'>
                    {day.end}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <div className=''>

      <h1 className="text-3xl font-bold underline text-center text-red-800">Turni</h1>
      <div className='mb-12 gap-4 flex'>
        <div>
          <div>
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dal</label>

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Dal' value={dates.startDate} onChange={(e) => setDates({ ...dates, startDate: e.target.value })} />
            </div>
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Al</label>

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" placeholder='Al' value={dates.endDate} onChange={(e) => setDates({ ...dates, endDate: e.target.value })} />
            </div>
          </div>
        </div>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={employeeSelected} onChange={(event) => setEmployeeSelected(event.target.value)} name="worker" >
          <option value="">Seleziona dipendente</option>
          {employees.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
        </select>
        {/* <button className='bg-red-800' onClick={() => handleAddEmployee()}>Aggiungi dipendente</button> */}

        <button onClick={() => handleAddEmployee()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aggiungi dipendente</button>

      </div>
      <hr />

      <div>
        {!!employeesList.length && <table className='border border-collapse'>
          {renderThead()}
          {renderTbody()}
        </table>}
        <hr />

      </div>
    </div>
  )
}

export default App;
