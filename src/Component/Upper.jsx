import React, { useState, useEffect } from "react";
import Lower from "./Lower";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { StudentRef } from "./firebase";
import { addDoc, getDocs } from "firebase/firestore";

const Upper = () => {
  const [data, setData]= useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    citizenship: "",
    addresses: [{ addressType: "permanent" }, { addressType: "temporary" }],
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedAddresses = prevData.addresses.map((address) =>
        address.addressType === addressType
          ? { ...address, [name]: value }
          : address
      );

      return {
        ...prevData,
        addresses: updatedAddresses,
      };
    });
  };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(StudentRef, formData);
  
    
        toast.success("Form submitted", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
  
        setFormData({
          name: '',
          email: '',
          phone: '',
          citizenship: '',
          addresses: [],
        });
       
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
   
  }
  
  const ViewDetails = async() =>{
    const data = await getDocs(StudentRef);
    
      data.forEach((doc) => {
        setData((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });
  
  }
  console.log(data)
  return (
    <>
    <ToastContainer/>
      <div className="h-auto w-[45%] border-2 border-black ml-[20%] ">
        <div className="flex justify-between m-4">
          <h2>Students Record</h2>
          <div className="flex gap-4">
            <p>Add Record</p>
            <p>View Record</p>
          </div>
        </div>
        <form >
          <div className="grid grid-cols-2 gap-4 m-10">
            <label className="border-2 border-black rounded p-1">
              <input
                className="w-22 text-center focus:outline-none"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="border-2 border-black rounded p-1">
              <input
                className="w-22 text-center focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="border-2 border-black rounded p-1">
              <input
                className="w-22 text-center focus:outline-none"
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label className="border-2 border-black rounded p-1">
              <input
                className="w-22 text-center focus:outline-none"
                type="text"
                name="citizenship"
                placeholder="Citizenship"
                value={formData.citizenship}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Permanent Address */}
          <Lower
            formData={formData.addresses.find(
              (address) => address.addressType === "permanent"
            )}
            handleAddressChange={(e) => handleAddressChange(e, "permanent")}
            AddressType={"Permanent Address"}
          />

          {/* Temporary Address */}
          <Lower
            formData={formData.addresses.find(
              (address) => address.addressType === "temporary"
            )}
            handleAddressChange={(e) => handleAddressChange(e, "temporary")}
            AddressType={"Temporary Address"}
          />

          {/* Submit button */}
          <button 
            className="ml-[38rem] border-2 border-black  rounded-xl p-2 mb-2 bg-pink-500" onClick={handleSubmit}
            type="submit"
          >
            Submit
          </button>

          <button
            className="ml-[32rem] border-2 border-black rounded-xl p-1 mb-2 bg-pink-500 w-32" type="submit"
            onClick={ViewDetails}
          >
            View Details
          </button>
          
        </form>
         {data.map((item, id) =>(
          <div key={id}>

          <table className="border-2 border-black w-[100%] p-2">
               <tr className="border-2 border-black">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Citizenship</th>
                <th>Address</th>
              </tr>
              <tr className="border-2 border-black">
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.citizenship}</td>
                <td><p>Address: {item.addresses[0].addressType}</p>
                <p>Province: {item.addresses[0].province}</p>
                <p>District: {item.addresses[0].district}</p>
                <p>Municipality: {item.addresses[0].municipality}</p>
                <p>Ward: {item.addresses[0].ward}</p>
                <p>Tole: {item.addresses[0].tole}</p>
                <p>Address: {item.addresses[1].addressType}</p>
                <p>Province: {item.addresses[1].province}</p>
                <p>District: {item.addresses[1].district}</p>
                <p>Municipality: {item.addresses[1].municipality}</p>
                <p>Ward: {item.addresses[1].ward}</p>
                <p>Tole: {item.addresses[1].tole}</p></td>
              </tr>
             
          </table>
          </div>
         )
         )}
      </div>
    </>
  );
};

export default Upper;