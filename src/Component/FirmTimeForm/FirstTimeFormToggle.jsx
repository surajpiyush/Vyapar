import css from "./FirstTimeFormToggleCss.module.css";

const FirstTimeFormToggle = ({
  img,
  onClick,
  BtnText,
  MiddleText,
  BelowText,
  marginTop = "0px",
  height = "72vh",
}) => {
  return (
    <div
      style={{
        marginTop,
        height: height,
      }}
      className={css.OuterDiv}
    >
      <div>
        <div className={css.ImgDiv}>
          <img src={img} alt={BtnText} />
        </div>
        <p>{MiddleText}</p>
        <p>{BelowText}</p>
        <button onClick={onClick}>{BtnText}</button>
      </div>
    </div>
  );
};

export default FirstTimeFormToggle;
