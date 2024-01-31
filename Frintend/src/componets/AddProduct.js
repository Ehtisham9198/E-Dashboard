import React from 'react';
import {  useRef, useEffect } from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const Company_input = useRef();
  const Category_input = useRef();
  const Name_input = useRef();
  const Price_input = useRef();
  const navigate = useNavigate();
 
const SubmitHandler = (event) => {
    if (Company_input.current.value.trim() === "" || Category_input.current.value.trim() === "" || Name_input.current.value.trim() === "" ||Price_input.current.value.trim() === "")  {
      return;
    }
    const Company = Company_input.current.value;
    const Category = Category_input.current.value;
    const Name = Name_input.current.value;
    const Price = Price_input.current.value;
  
    const AddProduct=async()=>{
    const USER_Id = await JSON.parse(localStorage.getItem('user'))._id;
    let result= await fetch('https://e-dashboard-two.vercel.app/Add',{
            method:"POST",
            body:JSON.stringify({Company,Category,Name,Price,USER_Id}),
            headers:{
                'Content-type':'application/json'
            }
    
        });
    
    }
    AddProduct();
    Company_input.current.value = "";
    Category_input.current.value = "";
    Name_input.current.value = "";
    Price_input.current.value = "";


  };

  return (
    <div>
        <div className="login_box flex justify-center items-center border rounded-xl">
          <div className="text-center p-5">
            <h3 className="text-4xl font-bold pt-3 pb-6">Add Product</h3>
            <input
              type="text"
              placeholder="Enter Company Name..."
              className="mt-4 p-2 h-8"
              ref={Company_input}
            />
            <br />
            <input
              type="text"
              placeholder="Enter your Category..."
              className="mt-4 p-2 h-8"
              ref={Category_input}
            />
            <br />
            <input
              type="text"
              placeholder="Enter the Name..."
              className="mt-4 p-2 h-8"
              ref={Name_input}
            />
            <br />
            <input
              type="number"
              placeholder="Enter the Price..."
              className="mt-4 p-2 h-8"
              ref={Price_input}
            />
            <br />
            <button
              className='login_button mt-8 h-8 font-bold'
              onClick={SubmitHandler}
            >Add
              </button>
 
          </div>
    </div>
    </div>
  );
};

export default AddProduct;
