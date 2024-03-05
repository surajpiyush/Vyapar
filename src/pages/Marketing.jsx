import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Marketing.module.css";
const Marketing = () => {
   const whatsappNumber = "+918860464098"; // Replace with your actual WhatsApp number

   const openWhatsApp = () => {
      window.open(`https://wa.me/${whatsappNumber}`, "_blank");
   };

   return (
      <div>
         <div className={styles.picCtn}>
            <img src="https://picsum.photos/200/300?t=1" alt="" class="pic" />
            <img src="https://picsum.photos/200/300?t=2" alt="" class="pic" />
            <img src="https://picsum.photos/200/300?t=3" alt="" class="pic" />
            <img src="https://picsum.photos/200/300?t=4" alt="" class="pic" />
            <img src="https://picsum.photos/200/300?t=5" alt="" class="pic" />
         </div>

         <section className="container mt-4 text-center">
            <h2>Maximize Reach with WhatsApp Marketing</h2>
            <p>
               Seamlessly share greetings, offers, business cards, and
               announcements with your customers to grow your business
               relationships.
            </p>
         </section>

         <section className="container mt-4 text-center">
            <h2>Chat with Us on WhatsApp</h2>
            <p>
               Have a question or need assistance? Feel free to reach out to us
               on WhatsApp. Click the button below to start a conversation.
            </p>
            <button
               className={styles.button}
               variant="success"
               onClick={openWhatsApp}
            >
               <span>Chat on WhatsApp</span>
            </button>
         </section>
      </div>
   );
};

export default Marketing;
