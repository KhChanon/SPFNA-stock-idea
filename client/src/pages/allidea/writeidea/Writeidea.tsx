/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../../globalcomponents/Layout'
import axios from 'axios'; 

const Writeidea = () => {
  const navigate = useNavigate();
  const [postidea, setPostidea] = useState({ 
    title: '', 
    details: '',
  });

  const handlePost = async (status : string) => {
    if (postidea.title === '' || postidea.details === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/idea/add', {
          title: postidea.title,
          details: postidea.details,
          status:  status
        }, { withCredentials: true });
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: `You have successfully ${status} Idea`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          }).then(() => {
            navigate('/idea');
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch(err){
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }

  const handleCancel = () => {
    navigate('/idea', { replace: true });
  }

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Write Your Idea</p>
        <form className='w-full rounded-lg border h-auto shadow-md p-6'>
          <input 
            className='w-[50%] h-10 rounded-lg border shadow-md p-4 border-black'
            placeholder='What is your Topic'
            required
            onChange={(e) => setPostidea({ ...postidea, title: e.target.value })}
          />
          <textarea 
            className='w-full h-96 rounded-lg border shadow-md p-4 mt-4 resize-none border-black'
            placeholder='Say something...'
            required
            onChange={(e) => setPostidea({ ...postidea, details: e.target.value })}
          />
        </form>
        <div className='mt-5 flex justify-between mb-16'>
          <div>
            <button 
              className='bg-cyan-800 hover:bg-cyan-900 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={() => handlePost('publish')}
            >
              Post
            </button>
            <button 
              className='bg-sky-600 hover:bg-sky-700 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={() => handlePost('draft')}
            >
              Draft
            </button>
          </div>
          <button 
            className='bg-red-400 hover:bg-red-500 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div> 
    </Layout>
  )
}

export default Writeidea