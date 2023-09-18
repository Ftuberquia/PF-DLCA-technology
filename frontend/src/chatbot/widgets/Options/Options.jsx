import style from "./Options.module.css";

const Options = ({ options, title }) => {
  return (
    <div className={style.containerOpt}>
      <p>{title}</p>
      {options.map((opt) => (
        <button className={style.option} onClick={opt.handler} key={opt.id}>
          {opt.name}
        </button>
      ))}
    </div>
  );
};

export default Options;
