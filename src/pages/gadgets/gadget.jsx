import React, { useEffect, useState } from 'react'

function Gadget() {
  const[gadgetList,setGadgetList]=useState([])
  useEffect(() => {
    try {
        getGadgetList()
    } catch (error) {
        console.error(error)
    }
}, [])

    async function getGadgetList() {
        const url='https://20635e268a374fb791053ca9e5b61021.api.mockbin.io/'
        const response= await fetch(url,{
            methods:'GET',
            header:{
                'Content-Type': 'application/json'
            }
    })
    if (response.ok) {
      const result = await response.json()
      setGadgetList(result.products)
  }
  else {
      console.log('Something went wrong')
  }
        
    }
  return (
    <div className='mainPro' >
    {gadgetList?.map(item => (
        

        <div className='productInfo'>
            <p className='id'>{item.id}</p>
            <p className='name'>{item.name} </p>
            <p className='mail'>{item.description}</p>
            <p>{item.price}</p>
            <img src={item?.imageUrl}/>
            <p>{item.category}</p>

        </div>
    
    ))
    }
</div>
  )
}

export default Gadget