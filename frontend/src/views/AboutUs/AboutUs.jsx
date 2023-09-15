import React, { useEffect, useState } from "react";
import style from "./AboutUs.module.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Frank from "../../img/Team/team-frank.jpg";
import Carlos from "../../img/Team/team-carlos.jpg";
import Andres from "../../img/Team/team-andres.png";
import Agus from "../../img/Team/team-agus.jpg";
import Orli from "../../img/Team/team-orli.jpg";
import Hector from "../../img/Team/team-hector.jpg";
import Claudia from "../../img/Team/team-claudia.jpg";
import Loading from "../../components/Loading/Loading";

const integrantes = [
  {
    nombre: "Frank Tuberquia",
    especializacion: "Full Stack Web Developer",
    github: "https://github.com/Ftuberquia",
    linkedin: "https://www.linkedin.com/in/franktuberquia",
  },
  {
    nombre: "Carlos Maya",
    especializacion: "Full Stack Web Developer",
    github: "https://github.com/carlosmayadev",
    linkedin: "https://www.linkedin.com/in/carlosmaya dev",
  },
  {
    nombre: "Andres Lopez",
    especializacion: "Full Stack Web Developer",
    github: "https://github.com/AFLopezLagomarsino",
    linkedin:
      "https://www.linkedin.com/in/andres-francisco-lopez-lagomarsino-a5812a269/",
  },
  {
    nombre: "Agustina Varela",
    especializacion: "Full Stack web developer",
    github: "https://github.com/AgustinaVarelaArtieda",
    linkedin: "https://www.linkedin.com/in/agustina-varelaa/",
  },
  {
    nombre: "Orlibet Dun",
    especializacion: "Full Stack Web Developer",
    github: "https://github.com/Orliluq",
    linkedin: "https://www.linkedin.com/in/orlibetdungonzalez",
  },
  {
    nombre: "Héctor Gomez",
    especializacion: "Full Stack Web Developer",
    github: " https://github.com/hdgomez8",
    linkedin: "https://www.linkedin.com/in/programadorhd",
  },
  {
    nombre: "Claudia Torres",
    especializacion: "Full Stack Web Developer",
    github: "https://github.com/kayitaC2024",
    linkedin: "https://www.linkedin.com/in/claudia torres",
  },
];

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={style.bodyContainer}>
            <h2 className={style.title}>Nosotros</h2>
            <p className={style.introParagraph}>
            Somos un equipo de desarrolladores web que trabajamos con el 
            stack PERN, (PostgreSQL, Express, React y Node.js). Nuestro 
            objetivo es proporcionar a DLCA Technology una plataforma digital 
            que amplíe su alcance y mejore su servicio al cliente. Al combinar 
            estas tecnologías, podemos crear una aplicación web completa con 
            operaciones CRUD. Nuestro equipo ha desarrollado experiencia en 
            la construcción de rutas con consultas PostgreSQL y la configuración 
            del lado del cliente con React. Como equipo buscamos crear soluciones 
            innovadoras y efectivas para nuestro cliente.
            </p>

            <h3 className={style.title2}>Team #12</h3>
            <div className={style.integrantesContainer}>
              {integrantes.map((integrante, index) => (
                <div className={style.cardMargin} key={index}>
                  <div className={style.integranteCard}>
                    <h4 className={style.name}>{integrante.nombre}</h4>
                    <img
                      src={getImagen(integrante.nombre)}
                      alt={`Foto de ${integrante.nombre}`}
                    />
                    <div className={style.cardContent}>
                      <p className={style.especializacion}>
                        {integrante.especializacion}
                      </p>
                      <p>
                        <a
                          href={integrante.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={style.githubLink}
                        >
                          <AiFillGithub className={style.icon} />
                          GitHub
                        </a>
                      </p>
                      <p>
                        <a
                          href={integrante.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={style.linkedinLink}
                        >
                          <AiFillLinkedin className={style.icon} />
                          LinkedIn
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AboutUs;

function getImagen(nombre) {
  switch (nombre) {
    case "Frank Tuberquia":
      return Frank;
    case "Carlos Maya":
      return Carlos;
    case "Andres Lopez":
      return Andres;
    case "Agustina Varela":
      return Agus;
    case "Orlibet Dun":
      return Orli;
    case "Héctor Gomez":
      return Hector;
    case "Claudia Torres":
      return Claudia;
    default:
      return ""; // Devuelve una cadena vacía o la ruta de una imagen por defecto
  }
}
