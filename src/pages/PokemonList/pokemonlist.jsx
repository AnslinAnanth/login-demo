import React, { useEffect, useState } from 'react'

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([])

    useEffect(() => {
        try {
            getPokemonList()
        } catch (error) {
            console.error(error)
        }
    }, [])

    async function getPokemonList() {
        const url = 'https://1321271030ed4eaaa0894e3978712373.api.mockbin.io/'

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const result = await response.json()
            setPokemonList(result.pokemon)
        } else {
            console.log("Something went wrong")
        }
    }

    return (
        <div>
            {pokemonList?.map(item => (
                <div>
                    <p>{item?.name}</p>
                    <img src={item?.img} />
                </div>
            ))}
        </div>
    )
}

export default PokemonList