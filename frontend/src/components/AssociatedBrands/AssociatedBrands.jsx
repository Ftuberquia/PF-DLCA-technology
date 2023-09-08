import React from 'react';
import asociado1 from '../../img/depcoll-logo.png';
import asociado2 from '../../img/argom-tech-logo.png';
import asociado3 from '../../img/HH-Gears-logo.png';
import asociado4 from '../../img/mars-gaming-logo.png';
import style from './AssociatedBrands.module.css';


const AssociatedBrands = () => {


return (
  <div className={style.asociados}>
  <h1 className={style.titulo}>Distribuidores Exclusivos</h1>

  <div className={style.flex} >
    <div className={style.card1}  >
      <img src={asociado1} alt="Depcoll Logo" />
    </div>

    <div className={style.card1}  >
      <img src={asociado2} alt="Argom Tech Logo" />
    </div>

    <div className={style.card1}  >
      <img src={asociado3} alt="HH Gears Logo" />
    </div>

    <div className={style.card1}  >
      <img src={asociado4} alt="Mars Gaming Logo" />
    </div>
  </div>
</div>
  )
};

export default AssociatedBrands;