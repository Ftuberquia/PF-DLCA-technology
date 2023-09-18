import { Link } from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import style from './CantUsuarios.module.css'
const CantUsuarios=()=>{
  const [data, setData] = useState()
  const [totalUsuarios, setTotalUsuarios]= useState(0)

  useEffect(()=>{
    const datos = async () =>{
      try {
        const response = await axios.get("/users")
        const formattedData = response.data.map(user =>({
          ...user,
          createdAt: new Date(user.createdAt)
        }))
        const sortedData = formattedData.sort((a,b) => a.createdAt - b.createdAt)
        const userCountByDate = sortedData.reduce ((count, user) =>{
          const date = user.createdAt.toISOString().split("T")[0]
          count[date] = (count[date] || 0) + 1
          return count

        },{})
        const chartData = Object.entries(userCountByDate).map(([date,usuarios])=>({
          date,
          usuarios
        }))
        setData(chartData)
        const userCount = Object.values(userCountByDate).reduce((acc,count)=> acc + count, 0)
        setTotalUsuarios(userCount)
      } catch (error) {
        console.log(error)
      }
    }
    datos()
  },[])



    return(
        <div className={style.users}>
            <div className={style.info}>
                <div className={style.title}>
                    <span>Usuarios totales</span>
                </div>
                <h1 className={style.total}>{totalUsuarios}</h1>
                <Link to='/admin/usuarios'>Más Info</Link>
            </div>
            <div className={style.grafData}>
                <div className={style.grafico}>
                 <ResponsiveContainer width="99%" height="100%">
                    <LineChart data={data}>                  
                      <Tooltip
                      contentStyle={{background:"transparent", border:"none"}}
                      labelFormatter ={() =>""}
                      formatter={(value, name, props) => {
                        const { payload } = props;
                        const date = payload?.date;
                        const usuarios = payload?.usuarios;
                        return [`${date}: ${usuarios} Usuarios`];
                      }}
                      />
                        <Line type="monotone" dataKey="usuarios" stroke="#8884d8" strokeWidth={2} dot={true}/>
                    </LineChart>
                 </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CantUsuarios