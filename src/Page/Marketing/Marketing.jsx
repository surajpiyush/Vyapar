import css from "./Marketing.module.css";
import MarketingImg1 from "../../assets/Images/MarketingImgs/MarketingImg1.webp";
import MarketingImg2 from "../../assets/Images/MarketingImgs/MarketingImg2.jpeg";
import MarketingImg3 from "../../assets/Images/MarketingImgs/MarketingImg3.jpeg";
import MarketingImg4 from "../../assets/Images/MarketingImgs/MarketingImg4.jpeg";
import MarketingImg5 from "../../assets/Images/MarketingImgs/MarketingImg5.jpeg";
import { WhatsAppOutlineIcon } from "../../assets/Icons/ReactIcons";

const Marketing = () => {
  const whatsappNumber = "+918860464098"; // Replace with your actual WhatsApp number

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };
  return (
    <div className={css.Outer}>
      <div className={css.InnerDiv}>
        <div className={css.ImgContDiv}>
          <img src={MarketingImg1} alt="Asaanly" />
          <img src={MarketingImg2} alt="Asaanly" />
          <img src={MarketingImg3} alt="Asaanly" />
          <img src={MarketingImg4} alt="Asaanly" />
          <img src={MarketingImg5} alt="Asaanly" />
        </div>

        <div className={css.TextDivs}>
          <h2>Maximize Reach with WhatsApp Marketing</h2>
          <p>
            Seamlessly share greetings, offers, business cards, and
            announcements with your customers to grow your business
            relationships.
          </p>
        </div>

        <button type="button" onClick={openWhatsApp} className={css.ChatBtnCss}>
          Chat on WhatsApp <WhatsAppOutlineIcon />
        </button>

        <div className={css.TextDivs}>
          <h2>Chat with Us on WhatsApp</h2>
          <p>
            Have a question or need assistance? Feel free to reach out to us on
            WhatsApp. Click the button above to start a conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
