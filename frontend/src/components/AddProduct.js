import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct=()=>{
    const [name,setName]= useState("");
    const [price,setPrice]= useState("");
    const [category,setCategory]= useState("");
    const [company,setCompany]= useState("");
    const [error,setError]=useState(false);
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const userId=JSON.parse(auth)._id;
    const addProductFun=async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name,price,category,company,userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.name) {
            navigate('/');
            alert("product added");
        } else {
            alert("Please enter correct details");
        }
    }
    return(
        <div>
            <h1>
                Add product
            </h1>
            <input type='text' placeholder='Product Name' value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
            {error && !name && <span>Enter a valid name</span>}<br/>
            <input type='text' placeholder='Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/><br/>
            {error && !price && <span>Enter a valid Price</span>}<br/>
            <input type='text' placeholder='Product Category' value={category} onChange={(e)=>{setCategory(e.target.value)}}/><br/>
            {error && !category && <span>Enter a valid Category</span>}<br/>
            <input type='text' placeholder='Product Company' value={company} onChange={(e)=>{setCompany(e.target.value)}}/><br/>
            {error && !company && <span>Enter a valid Company</span>}<br/>
            <button onClick={addProductFun}>Save</button>
        </div>
    )
}

export default AddProduct;