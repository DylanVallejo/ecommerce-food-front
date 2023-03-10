import axios from 'axios';
import React, { useState } from 'react'

function CategoryForm() {
    
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const createCategory = ( e ) => {
        
        
        e.preventDefault();
        const category = {
            "name": name,
            "description": description
        }
        
        axios.post("http://localhost:8082/api/category",category )
        .then(res =>{
            console.log(res)
            alert(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    
    
    
    ///traer las categorias para mostrarlas
    
    return (
        <form onSubmit={createCategory}>
            <lable for="name" />
            <input type="text" name="name"  className='nameInput' onChange={e => setName(e.target.value)} />
            
            <lable for="description" />
            <input type="text" name="description" className='descriptionInput' onChange={e => setDescription(e.target.value)} />
            <button type='submit'>Crear</button>
        </form>
    )
}

export default CategoryForm