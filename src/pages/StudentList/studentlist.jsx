import React, { useEffect, useState } from 'react'
import './studentlist.css'

function Studentlist() {
    const [studentList, setStudentList] = useState([])

    useEffect(() => {
        try {
            getStudentList()
        } catch (error) {
            console.error(error)
        }
    }, [])

    async function getStudentList() {
        const url = 'https://da4fcc987d5147209635170dad120c39.api.mockbin.io/'

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const result = await response.json()
            setStudentList(result.data.students)
        }
        else {
            console.log('Something went wrong')
        }

    }
    return (
        <div className='mainSt' >
            {studentList?.map(item => (
                

                <div className='studentInfo'>
                    <p className='id'>{item.id}</p>
                    <p className='name'>{item.name} </p>
                    <p className='mail'>{item.email}</p>
                    <img src={item?.profileImage}/>

                </div>
            
            ))
            }
        </div>
    )
}

export default Studentlist