import  axios  from 'axios';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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
          return setData(formattedData)
        } catch (error) {
          console.log(error)
        }
      }
      datos()
    },[])
    
    const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c']

    return(
        <div className={style.products}>
          <h1 className={style.titulo}>Productos en categorias</h1>
            <ResponsiveContainer width='99%'>
            <PieChart width = "99%" height='100%'>
              <Tooltip
                contentStyle={{background:'white', borderRadious:'20px'}}
              />          
              <Pie
                dataKey="value"
                data={data}
                cx='50%'
                cy='50%'
                innerRadius='50%'
                outerRadius='90%'
                paddingAngle={5} 
              >      
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}

              </Pie>
            </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CantProd