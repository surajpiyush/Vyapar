import css from "./Loaders.module.css";

const Loader1 = () => {
  return (
    <div className={css.loaderOuter}>
      <span className={css.loader}></span>
    </div>
  );
};

export default Loader1;
