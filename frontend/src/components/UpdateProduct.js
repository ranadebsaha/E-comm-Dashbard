import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async ()=>{
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateProductFun = async () => {
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'content-type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        navigate('/');
    }
    return (
        <div>
            <h1>
                Update product
            </h1>
            <input type="text" placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            {error && !name && <span>Enter a valid name</span>}<br />
            <input type="text" placeholder='Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} /><br />
            {error && !price && <span>Enter a valid Price</span>}<br />
            <input type='text' placeholder='Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} /><br />
            {error && !category && <span>Enter a valid Category</span>}<br />
            <input type='text' placeholder='Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }} /><br />
            {error && !company && <span>Enter a valid Company</span>}<br />
            <button onClick={updateProductFun}>Save</button>
        </div>
    )
}

export default UpdateProduct;