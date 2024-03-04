// NotFoundPage.jsx

import React, { useEffect, useState } from 'react';
import '../Css/pageNotFound.css'; // Import your styles here



const PageNotFound = () => {
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
    <div className="center">
      <section className="error">
        <h1 className="error__title">404</h1>
        <h2 className="error__type">Page not found</h2>
        <p className="error__cta">
          We’re sorry, the page you have looked for does not exist in our database! Maybe go to our{' '}
          <a className="error__link error__link--purple" href="#" target="_blank">
            home page
          </a>{' '}
          or try to use a{' '}
          <a className="error__link error__link--blue" href="#" target="_blank">
            search?
          </a>
        </p>
      </section>

      <div className="astronaut">
        {stars.map((star, index) => (
          <div key={index} className="star" style={{ top: `${star.top}px`, right: `${star.right}px` }}></div>
        ))}
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className="src"
        />
      </div>

      <script src="script.js"></script>
    </div>
  );
};




export default PageNotFound;
