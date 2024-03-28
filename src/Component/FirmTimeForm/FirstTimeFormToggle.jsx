import css from "./FirstTimeFormToggleCss.module.css";

const FirstTimeFormToggle = ({
  img,
  onClick,
  BtnText,
  MiddleText,
  BelowText,
}) => {
  return (
    <div className={css.emptyData}>
      <div>
        <div className={css.emptyDataImgDiv}>
          <img src={img} alt="" />
        </div>
        <p>{MiddleText}</p>
        <p>{BelowText}</p>
        <button onClick={onClick}>{BtnText}</button>
      </div>
    </div>
  );
};

export default FirstTimeFormToggle;
