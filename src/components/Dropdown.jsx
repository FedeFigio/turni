import React, { useState } from 'react'

const Dropdown = ({ id, week,handleChangeRiposo }) => {
    const [isOpen, setIsOpen] = useState(false)
    // funzione che genera un numero random
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }
    return (<>
        <div className='relative'>

            <button onClick={() => setIsOpen(!isOpen)} id={getRandomInt(1, 1000) + week + id} data-dropdown-toggle={"dropdown" + id + week} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>

            <div id={"dropdown" + id + week} className={`${isOpen ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={"dropdown" + id + week}>
                    <li>
                        <button onClick={() => handleChangeRiposo()} href="#" className=" text-left w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Riposo</button>
                    </li>
                    <li>
                        <button onClick={() => setIsOpen(!isOpen)} href="#" className=" text-left w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ferie</button>
                    </li>
                    <li>
                        <button onClick={() => setIsOpen(!isOpen)} href="#" className=" text-left w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Festività non lavorata</button>
                    </li>
             
                </ul>
            </div>

        </div>
    </>
    )
}

export default Dropdown