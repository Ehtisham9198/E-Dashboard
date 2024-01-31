import React from 'react';
import {  useState, useEffect } from 'react';
import "./SignUp.css";
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
 const [Name,setName]=useState("");
 const [Company,setCompany]=useState("");
 const [Category,setCategory]=useState("");
 const [Price,setPrice]=useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{ 
    getProductDetails();
  },[]);

    const getProductDetails=async()=>{
    let result= await fetch(`/product/${params.id}`);
    result = await result.json();
    setName(result.Name);
    setCategory(result.Category);
    setCompany(result.Company);
    setPrice(result.Price);
    }
    
const UpdateHandler = async(event) => {
    let result = await fetch(`/product/${params.id}`,{
    method:"Put",
    body:JSON.stringify({Company,Category,Name,Price}),
    headers:{
        'Content-type':"Application/json"
    }

  });
  result = await result.json();
  if(result){
    navigate('/')}


    setName("");
    setCategory("");
    setCompany("");
    setPrice("")
  };

  return (
    <div>
        <div className="login_box flex justify-center items-center border rounded-xl">
          <div className="text-center p-5">
            <h3 className="text-3xl font-bold pt-3 pb-6">Update Product</h3>
            <input
              type="text"
              placeholder="Enter Company Name..."
              className="mt-4 p-2 h-8"
              value={Company}
              onChange={(e)=>{setCompany(e.target.value)}}
            />
            <br />
            <input
              type="text"
              placeholder="Enter your Category..."
              className="mt-4 p-2 h-8"
              value={Category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <input
              type="text"
              placeholder="Enter the Name..."
              className="mt-4 p-2 h-8"
              value={Name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <input
              type="number"
              placeholder="Enter the Price..."
              className="mt-4 p-2 h-8"
              value={Price}
              onChange={(e)=>{setPrice(e.target.value)}}
            />
            <br />
            <button
              className='login_button mt-8 h-8 font-bold'
              onClick={UpdateHandler}
            >Update
              </button>
 
          </div>
    </div>
    </div>
  );
};

export default UpdateProduct;
