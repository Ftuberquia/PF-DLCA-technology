import { useState } from "react";
import QrGenerator from "./QrGenerator";

function  QRCode() {
  const [text, setText] = useState("");
  
const handleInputChange = (event) => {
  setText(event.target.value);
};

  return (
    <div className='qrcode'>
      {/* Input para ingresar el texto */}
      <input
        type="text"
        value={text}
        onChange={handleInputChange} // Escucha cambios en el input
        placeholder="https://www.instagram.com/dlcatecnology/?igshid=MzRlODBiNWFlZA%3D%3D"
      />
      
      {/* Llama al componente QrGenerator y pasa el "text" como prop */}
      <QrGenerator text={text} />
    </div>
  );
}

export default QRCode; 







// import React, { useState } from 'react';
// import QRCode  from 'qrcode.react';

// function QRCode () {
//   const [result, setResult] = useState('');

//   const handleScan = (data) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const handleError = (error) => {
//     console.error('Error al escanear el código QR', error);
//   };

//   return (
//     <div>
//       <QRCode 
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: '100%' }}
//       />
//       {result && <p>Contenido del código QR: {result}</p>}
//     </div>
//   );
// }

// export default QRCode ;
