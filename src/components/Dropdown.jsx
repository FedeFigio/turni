import { Dropdown } from 'flowbite-react';

const Dropdowns = ({ handleChangeOptions }) => {
    return (
        <Dropdown color="blue" label="Opzioni" dismissOnClick={false} size="sm">
            <Dropdown.Item onClick={() => handleChangeOptions()}>Orario</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeOptions("riposo")}>Riposo</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeOptions("ferie")}>Ferie</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeOptions("festivita")}>Festività non lavorata</Dropdown.Item>
        </Dropdown>
    );
}

export default Dropdowns