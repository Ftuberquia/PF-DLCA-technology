import style from "./loader.module.css";

const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
    </div>
  );
};

export default Loader;