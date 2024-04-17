import moment from "moment";

const TimeOptions = ({ day }) => {
    var dataCorrente = moment().format("YYYY-MM-DD");
    var data = moment(dataCorrente + " "+"12:31").format('HH:mm')


    return (
    

        <div>
            <div className='flex'>
                <div className='border border-red-600'><input value={data} onChange={(e) => console.log(e)} type="time" /></div>-
                <div className='border border-red-600'><input disabled value={day.startBreak} onChange={(e) => console.log(e)} type="time" /></div>
            </div>
            <div className='flex'>
                <div className='border border-red-600'><input disabled value={day.endBreak} onChange={(e) => console.log(e)} type="time" /></div>-
                <div className='border border-red-600'><input value={day.end} onChange={(e) => console.log(e)} type="time" /></div>
            </div>
        </div>
    )
}

export default TimeOptions