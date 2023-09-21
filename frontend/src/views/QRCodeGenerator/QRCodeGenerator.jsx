import { useState } from "react";

import QRCode from "qrcode.react";
import QRCodeLink from "qrcode";

import style from "./QRCodeGenerator.module.css";
//import imagen from "./imagen/qrcode.png"

 // https://pf-dlca-technology-3davhwpi3-ftuberquia.vercel.app/productos
//  https://www.instagram.com/dlcatecnology/?igshid=MzRlODBiNWFlZA%3D%3D
  

function  QRCodeGenerator() {
  const [link, setLink] = useState('');
  const [qrcodeLink, setQrcodeLink] = useState(''); 
 

function handleGenerate(link_url){
  QRCodeLink.toDataURL(link_url,{
    width: 600,
    margin: 3,
  }, function(err, url){
    setQrcodeLink(url);
  })
}


  function  handleQrcode(event){
  setLink(event.target.value);
  handleGenerate(event.target.value);
};

  return (
    <div className={style.container}>
     
      <QRCode 
       value={link}
      
      />

      <input
      className={style.input}
      placeholder="Digite su Link..."
      value={link}
      onChange={ (event) => handleQrcode(event)} // Escucha cambios en el input

      />
      
      <a href={qrcodeLink} download={`qrcode.png`}>Descargar QrCode</a>
      <div>

      {/* <img src={imagen} alt="qrcode" /> */}
      </div>

    </div>
  );
}

export default  QRCodeGenerator; 






