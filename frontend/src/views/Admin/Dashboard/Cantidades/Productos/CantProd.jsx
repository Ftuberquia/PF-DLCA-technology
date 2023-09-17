import  axios  from 'axios';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import style from './CantProd.module.css'



const CantProd=()=>{
 const [data, setData] = useState([])

    useEffect(() => {
      const datos =async ()=>{
        try {
          const response = await axios.get("/prod")
          const categories = response.data.reduce((acc,item) =>{
            if(acc[item.category]){
              acc[item.category] ++
            }else{
              acc[item.category] = 1
            }
            return acc
          },{})
          const formattedData = Object.entries(categories).map(([name,value])=>({
            name,
            value
          }))
          setData(formattedData)
        } catch (error) {
          console.log(error)
        }
      }
      datos()
    },[])

    const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c']


    return(
        <div className={style.products}>
          <h1>Productos vs categorias</h1>
          <div className="chart">
            <ResponsiveContainer>
            <PieChart width = "99%" height={300}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    )
}

export default CantProd