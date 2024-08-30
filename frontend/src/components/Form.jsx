import axios from 'axios';
import { useEffect, useState } from 'react';

function Form() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    contact: ""
  });

  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!userDetail.name) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!userDetail.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetail.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Contact validation
    if (!userDetail.contact) {
      newErrors.contact = "Contact is required";
    } else if (userDetail.contact.length < 10) {
      newErrors.contact = "Contact number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const postUserDetail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/userdata", userDetail);
      setMsg(response.data);
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const getUserDetail = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getuserdata");
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      postUserDetail();
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-lg bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Application Form</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <p className='text-green-600'>{msg}</p>
          <div className='flex flex-col'>
            <label htmlFor="name" className='text-gray-700 font-medium mb-2'>Name</label>
            <input
              type="text"
              placeholder='Enter Name'
              className={`w-full p-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={userDetail.name}
              name='name'
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-gray-700 font-medium mb-2'>Email</label>
            <input
              type="email"
              placeholder='Email Id'
              className={`w-full p-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={userDetail.email}
              name='email'
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="contact" className='text-gray-700 font-medium mb-2'>Contact</label>
            <input
              type="number"
              placeholder='Enter Contact'
              className={`w-full p-4 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={userDetail.contact}
              name='contact'
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>
          <button
            type="submit"
            className='w-full p-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
