
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";




import React from 'react'

const Modale = ({ onSubmit, employee }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button color="failure" outline onClick={() => setOpenModal(true)}>
                <HiOutlineTrash className="h-6 w-6" />
            </Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Sei sicuro di voler eliminare {employee.name}? <br />
                            L'eliminazione verra effettuata per tutto il mese.
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { setOpenModal(false); onSubmit() }}>
                                {"Si elimina"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Annulla
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Modale