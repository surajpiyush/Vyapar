import React from 'react'
import DataTable from 'react-data-table-component';

const Tab = () => {

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];

    const data = [
        {
            title: 'soaib',
            year: 2021
        },
        {
            title: 'sonu',
            year: 2020
        },
        {
            title: 'afroz',
            year: 2025
        },
        {
            title: 'jhon',
            year: 2019
        },
        {
            title: 'neyaz',
            year: 2026
        },
        {
            title: 'roni',
            year: 2021
        },
    ]

  return (
    <DataTable columns={columns} data={data}/>
  )
}

export default Tab