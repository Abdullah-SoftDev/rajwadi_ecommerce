'use client'
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceForm = () => {
  const [pincode, setPincode] = useState('');

  const handleCheckServiceability = async (e: FormEvent) => {
    e.preventDefault()
    if (!pincode) return;

    try {
    //   const response = await fetch('https://abdsidd-ecommerce.vercel.app/pincodes');
    //   const pinjson = await response.json();
    //   if (pinjson.includes(pincode)) {
    //     toast?.success("Sevice availbale.");
    //   }
    //   else {
    //     toast?.error("Sevice not availbale.");
    //   }
    console.log("pincode")
    } catch (error) {
      console.log(error)
    } finally {
      setPincode("")
    }
  };
  return (
    <div className="pt-8">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Check service availability in your region
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500"></div>
      <form
        onSubmit={handleCheckServiceability}
        className="mt-5 sm:flex sm:items-center">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="text" className="sr-only">
            Pincode
          </label>
          <input
            name="search"
            className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter pincode..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Check
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;