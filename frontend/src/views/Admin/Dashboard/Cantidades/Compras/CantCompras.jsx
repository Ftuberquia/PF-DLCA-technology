import { Link } from "react-router-dom"
import { LineChart, Line, ResponsiveContainer } from 'recharts';

import style from './CantCompras.module.css'

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

const CantCompras=()=>{
    return(
        <div className={style.compras}>
            <div className={style.info}>
                <div className={style.title}>
                    <span>Total Compras</span>
                </div>
                <h1 className={style.total}>Num</h1>
                <Link to='/admin/compras'>Más Info</Link>
            </div>
            <div className={style.grafData}>
                <div className={style.grafico}>
                 <ResponsiveContainer width="99%" height="100%">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false}/>
                    </LineChart>
                 </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CantCompras