import React, { useEffect, useRef } from "react";
import  QRCode  from "qrcode";
//import QRCode from 'qrcode.react';
import image from "./image/qr.png";

export default  function QrGenerator({text}) {
  
  const canvasRef = useRef()
  
  useEffect(()=> {
    QRCode.toCanvas(canvasRef.current, text, { errorCorrectionLevel: 'H'}, (error) =>{
      if (error ){
        console.error("Error al generar el codigo QR:", error);
        
      }else {
        console.log("Código QR generado correctamente.");
      }
    })
  },[text])
  
  return (
    <div className="qrgenerator">
      <canvas  ref={canvasRef} id="canvas"></canvas>
      <img src={image} alt="codigo QR." />
    </div>
  );

}






// import { useState } from 'react';
// import QRCode from 'qrcode.react';
// import QRCodeLink from 'qrcode';



// function QrGenerator() {
//   const [ link, setLink ] = useState('')
//   const [ qrcodeLink, setQrcodeLink ] = useState('')
  
  
//   function handleGenerate(Link_url){
//     QRCodeLink.toDataURL(Link_url,{
//       width: 600,
//       margin: 3,
//     }, function (err, url){
//       setQrcodeLink(url);
//     })
//   }


//   function handleQrcode(event){
//     setLink(event.target.value);
//     handleGenerate(event.target.value)
//   }

//   return (
//     <div className="generator">

//     <QRCode
//       value={link}
   
//    />

//     <input
//     className="code"
//     placeholder="Digite Su Link..."
//     value={link}
//     onChange={ (event) => handleQrcode(event)}
    
//     />

//     <a href={qrcodeLink} download={`Qr-Code-PNG-Transparent.png`} >Bajar QrCode</a>

//   </div>
//   );
// }

// export default QrGenerator;