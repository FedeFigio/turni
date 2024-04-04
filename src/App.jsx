import { useState } from 'react';
import './App.css';
import data from './data.json';
import moment from 'moment';

function App() {
  const [workers, setWorkers] = useState([]);
  const [workerSelected, setWorkerSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addWorker = () => {
    const findWorker = data.find(worker => worker.id === +workerSelected);
    const days = calculateDays(startDate, endDate);
    const dates = getDates(startDate, days);
    const workerWithDates = { ...findWorker, dates };
    setWorkers([...workers, workerWithDates]);
  }

  const calculateDays = (start, end) => {
    const diff = moment(end).diff(moment(start), 'days');
    return diff + 1;
  }

  const getDates = (start, days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      dates.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-red-800">Turni</h1>
      <div className='mb-12 gap-4 flex'>
        <div>
          <div>
            <input type="date" placeholder='Dal' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" placeholder='Al' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <select value={workerSelected} onChange={(event) => setWorkerSelected(event.target.value)} name="worker" >
          <option value="">Seleziona dipendente</option>
          {data.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
        </select>
        <button className='bg-red-800' onClick={() => addWorker()}>Seleziona dipendente</button>
      </div>
      <hr />
      <div className="table-container">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500"></th>
              {workers.length > 0 && workers[0].dates.map((date, index) => (
                <th key={index} className="border border-gray-500">{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={index}>
                <td className="border border-gray-500">{worker.name}</td>
                {worker.dates.map(date => (
                  <td key={date} className="border border-gray-500">{date}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;
