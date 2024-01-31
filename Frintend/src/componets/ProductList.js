import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {

    let result = await fetch('/products');
    result = await result.json();
    setProducts(result);
  }


  const DeleteHandler = async (id) => {
    let result = await fetch(`/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();

    }
  }

  const SearchHandler = async (event) => {
    let key = event.target.value;
    if(key){
    let result = await fetch(`/search/${key}`);
    result = await result.json();
    if (result) {
      setProducts(result);
    }}
    else
    {
      getProducts();
    }
  }


return (
  <div className='products_list'>
    <h2 className='mb-5 text-2xl font-bold'>Product List</h2>
    <input
      type="text"
      placeholder="Search Product..."
      className="mt-4 p-2 h-8 mb-4 border rounded-sm  w-64  "
      onChange={SearchHandler}

    />
    <ul>
      <li>Name</li>
      <li>Price</li>
      <li>Company</li>
      <li>Opeartions</li>

    </ul>
    {products.map((e) => (
      <ul key={e._id}>
        <li>{e.Name}</li>
        <li>{e.Price}</li>
        <li>{e.Company}</li>
        <li><button className='but' onClick={() => DeleteHandler(e._id)}>Delete</button>
          <Link to={'/update/' + e._id} className='update' >Update</Link></li>
      </ul>

    ))}
  </div>
);
};

export default ProductList;
