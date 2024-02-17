import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const race = ['Azure Female', 'Iron Dwarf', 'Highborn Human', 'Lowland Human', 'Mountain Dwarf', 'Scythian Elf', 'Woodland Elf'];

const DropdownBox = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Dropdown
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          Submenu
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-4">Submenu Action 1</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Submenu Action 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownBox;
