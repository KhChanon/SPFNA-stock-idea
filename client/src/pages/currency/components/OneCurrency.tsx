import React from 'react'


interface CurrencyProps{
  currency: string;
  amount: number;
}

const OneCurrency:React.FC<CurrencyProps> = ({currency,amount}) => {
  return (
    <div className='ml-2 w-11/12 flex flex-row mt-6 rounded-2xl bg-slate-50 shadow-lg justify-between p-1'>
        <div className='flex flex-row'>
            <img className='self-center w-10 h-10 ml-4 mr-3' src='https://cdn-icons-png.flaticon.com/512/555/555526.png' alt='profile-pic'></img>
            <p className='self-center font-bold'>{currency}</p>
        </div>
        <div className='flex flex-row'>
            <p className='mr-3 self-center text-right'>{amount.toLocaleString()}</p>
            <p className='mr-4 self-center text-right font-medium'>{currency}</p>
        </div>
    </div>
  )
}

export default OneCurrency