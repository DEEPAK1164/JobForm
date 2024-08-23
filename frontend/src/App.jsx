import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    contact: ""
  });

  const[msg,setMsg]=useState("");

  const postUserDetail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/userdata", userDetail);
      setMsg(response.data);
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

//......................................

const getUserDetail=async()=>{
  try{
    const response=await axios.get("http://localhost:5000/getuserdata");
    console.log(response.data);
  }
  catch{
       console.log(err);
  }
 
}

useEffect(()=>{

getUserDetail();

},[])

//...........................................
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserDetail();
  };



  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md bg-gray-800 p-8 border border-gray-700 rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <p className='bg-red-500'>{msg}</p>
          <input
            type="text"
            placeholder='Enter Name'
            className='w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'
            value={userDetail.name}
            name='name'
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder='Email Id'
            className='w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'
            value={userDetail.email}
            name='email'
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder='Enter Contact'
            className='w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'
            value={userDetail.contact}
            name='contact'
            onChange={handleChange}
          />
          <button onClick={handleSubmit}
            type="submit"
            className='w-full p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
