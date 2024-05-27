import './CaroucelComponent.scss';
import React, { useState, useEffect } from 'react';

function Caroucel() {

  const [activeIndex, setActiveIndex] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex => {
        if (activeIndex === 1) {
          return 2;
        } else if (activeIndex === 2) {
          return 3;
        } else {
          return 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="caroucel">
    <div className={`image__container ${activeIndex === 2 ? 'second-active' : activeIndex === 3 ? 'third-active' : 'first-active'}`}>
      <div className="image">
        <div className="caption">
          <h2>Caută</h2>
          <p>Înregistrează-te, caută și găsește tot ce ai nevoie</p>
        </div>
      </div>
      <div className="image">
        <div className="caption">
          <h2>Licitează sau Cumpără</h2>
          <p>Găsiți cea mai bună ofertă și cumpărați-o sau plasați o ofertă</p>
        </div>
      </div>
      <div className="image">
        <div className="caption">
          <h2>Câștigă</h2>
          <p>Câștigă licitația și bucură-te de ea</p>
        </div>
      </div>
    </div>
    <div className={`nav__dots ${activeIndex === 2 ? 'second-current' : activeIndex === 3 ? 'third-current' : 'first-current'}`}>
      <div id="dot1" className="dot"></div>
      <div id="dot2" className="dot"></div>
      <div id="dot3" className="dot"></div>
    </div>
  </div>
  );
}

export default Caroucel;
