import React, { useEffect, useState } from 'react';

const ProductList=()=>{
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts=async ()=>{
        let result=await fetch('http://localhost:5000/products');
        result=await result.json();
        setProducts(result);
    }
    const deleteProduct=async (id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete'
        });
        result=await result.json();
        if(result){
            alert('Result is deleted');
            getProducts();
        }
    };
    return(
        <div>
            <h1>Product List</h1>
            <table border="1px" align="center">
            <thead>
                <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>company</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map((item,index)=>
                <tr key={item._id}>
                <th>{index+1}</th>
                <th>{item.name}</th>
                <th>{item.category}</th>
                <th>{item.price}</th>
                <th>{item.company}</th>
                <th><button onClick={()=>deleteProduct(item._id)}>Delete</button></th>
            </tr>
            )}
            </tbody>
            </table>
        </div>
    )
}

export default ProductList;