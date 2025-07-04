// import React, { useState,useEffect } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//   <input
//     className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary tansition"
//     type={type}
//     placeholder={placeholder}
//     onChange={handleChange}
//     name={name}
//     value={address[name]}
//     required
//   />
// );

// function AddAddress() {
  
//   const{axios , user, navigate  } = AppContext();

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     ipcode: "",
//     country: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prevAddress) => ({
//       ...prevAddress,
//       [name]: value,
//     }));

//     setAddress;
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data} = await axios.post('/api/address/add',{address})
//        if(data.success){
//         navigate('/cart')
//         toast.success(data.message)
//       } else {
//         toast.error(data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message)
      
//     }
//   };

//   useEffect(() => {
//     if( !user) {
//       navigate('/cart')
//     }
//   }, []);

//   return (
//     <div className="mt-16 pb-16">
//       <p className="text-2xl md:text-3xl text-gary-500">
//         Add Shipping{" "}
//         <span className="font-semibold text-[#4fbf8b]">Address</span>
//       </p>
//       <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
//         <div className="flex-1 max-w-md">
//           <form onClick={onSubmitHandler} className="space-y-3 mt-6 text-sm">
//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="firstName"
//                 type="text"
//                 placeholder="First Name"
//               />
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="LastName"
//                 type="text"
//                 placeholder="Last Name"
//               />
//             </div>

//             <InputField
//               handleChange={handleChange}
//               address={address}
//               name="email"
//               type="text"
//               placeholder="Email address"
//             />

//             <InputField
//               handleChange={handleChange}
//               address={address}
//               name="Street"
//               type="text"
//               placeholder="Street"
//             />

            
//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="city"
//                 type="text"
//                 placeholder="city"
//               />

//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="state"
//                 type="text"
//                 placeholder="State"
//               />
//             </div>
             
//                <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="zipcode"
//                 type="number"
//                 placeholder="Zip code"
//               />

//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="country"
//                 type="text"
//                 placeholder="Country"
//               />
//             </div>
             
//              <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="phone"
//                 type="text"
//                 placeholder="Phone"
//               />

//               <button 
//               className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transtition cursor-pointer uppercase">Save address</button>

//           </form>
//         </div>
//         <img
//           className="md:mr-16 md-16 md;mt-0"
//           src={assets.add_address_iamge}
//           alt="Add Address"
//         />
//       </div>
//     </div>
//   );
// }

// export default AddAddress;


import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast"; 

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary tansition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);


function AddAddress() {
  const { axios, user, navigate } = React.useContext(AppContext);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "", // changed from ipcode to zipcode
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address,userId: user._id });
      if (data.success) {
        navigate('/cart');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]); // added dependencies

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gary-500">
        Add Shipping{" "}
        <span className="font-semibold text-[#4fbf8b]">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName" // changed from LastName to lastName
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="text"
              placeholder="Email address"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="street" // changed from Street to street
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="city"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
             
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode" // matches state key
                type="number"
                placeholder="Zip code"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
             
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button 
              type="submit" // added type submit
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transtition cursor-pointer uppercase"
            >
              Save address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 md-16 md;mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
}

export default AddAddress;
