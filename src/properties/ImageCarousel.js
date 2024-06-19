import { useState } from "react";
import "./Carousel.css";
import CarouselCard from "./CarouselCard";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
function ImageCarousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }

  //Decrements currCardIdx state by 1
  function goBackward() {
    setCurrCardIdx(currCardIdx - 1);
  }
  const isLast = currCardIdx === total - 1
  const isFirst = currCardIdx === 0
  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {!isFirst &&
          <i alt="arrow-left-circle"
            className="bi bi-arrow-left-circle"
            onClick={goBackward}
          />}
        <CarouselCard
          caption={currCard.accessibilityLabel}
          src={currCard.baseUrl}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {!isLast && <i alt="arrow-right-circle"
          className="bi bi-arrow-right-circle"
          onClick={goForward}
        />}
      </div>
    </div>
  );
}

export default ImageCarousel;
