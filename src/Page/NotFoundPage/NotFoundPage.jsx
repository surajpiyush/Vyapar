import css from "./NotFoundPage.module.css";

import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(createStar, 100);

    function createStar() {
      const newStars = [...stars];
      const right = Math.random() * 500;
      const top = Math.random() * window.screen.height;
      const star = { right, top };

      newStars.push(star);
      setStars(newStars);

      setTimeout(() => runStar(star), 10);
    }

    function runStar(star) {
      const newStars = [...stars];
      const starIndex = newStars.indexOf(star);

      if (star.right >= window.screen.width) {
        newStars.splice(starIndex, 1);
        setStars(newStars);
        return;
      }

      star.right += 3;
      setStars(newStars);

      setTimeout(() => runStar(star), 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [stars]);

  return (
    <div className={css.center}>
      <section className={css.error}>
        <h1 className={css.error__title}>404</h1>
        <h2 className={css.error__type}>Page not found</h2>
        <p className={css.error__cta}>
          We’re sorry, the page you have looked for does not exist in our
          database! Maybe go to our{" "}
          <a className={css.errorLinkPurple} href="/">
            home page
          </a>{" "}
          or try to use a{" "}
          <a className={css.errorLinkBlue} href="/">
            search?
          </a>
        </p>
      </section>

      <div className={css.astronaut}>
        {stars.map((star, index) => (
          <div
            key={index}
            className={css.star}
            style={{ top: `${star.top}px`, right: `${star.right}px` }}
          ></div>
        ))}
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className={css.src}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
