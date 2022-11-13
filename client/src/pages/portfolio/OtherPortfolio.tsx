import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Tableport from './components/Tableport'
import Layout from '../../globalcomponents/Layout'
import Chartport from './components/Chartport'

import axios from 'axios';

import chartFunction from '../../function/chartfunction'
import backgroundColor from '../../config/chartconfig'
import profileImage from '../../function/profileImage'

import { StockProperties } from '../../interface/StockProps'

import config from '../../config/config.json'

const OtherPortfolio : React.FC = () => {

  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const [stockList, setStockList] = useState<StockProperties[]>([]);

  const [balance, setBalance] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [pl, setPl] = useState<number>(0);
  const [plPercent, setPlPercent] = useState<number>(0);

  const [datachart , setDatachart] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const getPortfolio = () => {
    axios.get(config.API_URL + `/port/${id}`, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      console.log(res.data.stocklist);
      setUser(res.data.user);
      setStockList(res.data.stocklist);
      setBalance(res.data.balance);
      setTotalValue(res.data.totalvalue);
      setPl(res.data.pl);
      setPlPercent(res.data.plpercent);
      const { labels, data } = chartFunction(res.data.stocklist,res.data.totalvalue);
      setLabels(labels);
      setDatachart(data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    getPortfolio();
  },[]);

  return (
    <Layout>
      <div className="flex items-center h-56">
        <div className="w-60 m-7">
          <img className="rounded-full" src={profileImage(user?.image)} alt='myphoto' width="150" height="200"></img>
        </div>
        <div className="m-14">
          <h1 className="mt-3 font-semibold text-3xl">@{user?.username}</h1>
          <h3 className="mt-3 font-normal text-xl">Rank #30</h3>
          <h3 className="mt-3 font-nomral text-xl">Total Balance: 3000 USD</h3>
          <div className="flex">
          </div>
        </div>
        <div className="ml-36 h-56 w-56">
          <Chartport labels={labels} data ={datachart} backgroundColor={backgroundColor}/>
        </div>
		  </div>

      <div className="ml-16">
        <div className="flex items-center">
          <h3 className="font-semibold text-2xl">Holding</h3>
        </div>
        <Tableport data={stockList} totalvalue={totalValue} pl={pl} plpercent={plPercent} />
      </div>
    </Layout>
  )
}

export default OtherPortfolio
