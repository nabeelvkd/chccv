import React,{useState} from 'react'

export const useForm=(initialValue)=>{
    const [value,setvalue]=useState(initialValue)

    return[
        value,
        (event)=>{
            setvalue({
                ...value,
                [event.target.name]:event.target.value,
            })
        }
    ]
}