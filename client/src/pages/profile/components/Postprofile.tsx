import React from 'react'
import { useNavigate } from 'react-router-dom';

interface PostProps{
    id: string;
    date: any;
    status: string;
    title: string;
    details: string;
}


const Postprofile : React.FC<PostProps>= ({id, date, status, title, details}) => {

    const navigate = useNavigate();
    const postDate = new Date(date);
 
    const handleButton = () => {
        if(status === 'publish'){
            navigate('/idea/post/' + id);
        } else {
            navigate( '/idea/post');
        }
    }


    return (
        <div className="w-4/5 m-5 px-4 py-5 rounded-lg bg-white shadow-lg">
            <div className="flex flex-row">
                <h3 className="self-center font-bold">{title}</h3>
                <h5 className="ml-2 self-center text-slate-600">{postDate.toLocaleString()}</h5>
            </div>
            <p className='self-center'>
                {details}
            </p>
            <div className="flex items-center">
                <h1 className="font-normal m-3">Status : {status}</h1>
                <div className={`rounded-full w-4 h-4 ${status === 'draft'?`bg-[#FA9C1B]` : `bg-[#008631]`}`}></div>
            </div>
            <button 
                className='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-9 w-36  rounded-3xl'
                onClick={handleButton}
            >
                {status === 'draft' ? `Edit` : `Read More`}
            </button>
        </div>
    )
}

export default Postprofile
