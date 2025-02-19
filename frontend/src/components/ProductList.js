import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            alert('Result is deleted');
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    };

    return (
        <div>
            <h1>Product List</h1>
            <input type="text" placeholder='Search'
                onChange={searchHandle}
            />
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
                    {products.length > 0 ? products.map((item, index) =>
                        <tr key={item._id}>
                            <th>{index + 1}</th>
                            <th>{item.name}</th>
                            <th>{item.category}</th>
                            <th>{item.price}</th>
                            <th>{item.company}</th>
                            <th>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={'/update/' + item._id} >Update</Link>
                            </th>
                        </tr>
                    ) : <h1>No Result Found</h1>

                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;