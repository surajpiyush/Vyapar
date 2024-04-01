import css from "./Loaders.module.css";

const Loader3 = ({ text = "" }) => {
  return (
    <div className={css.Loader3Outer}>
      <span className={css.loader3}></span>
      <h2>{text}</h2>
    </div>
  );
};

export default Loader3;
