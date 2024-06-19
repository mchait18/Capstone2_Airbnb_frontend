import React from "react";
// import "./Card.css";
import Card from 'react-bootstrap/Card';

/** Card: displays image.
 * 
 * Props:
 * - caption: string describing the image
 * - src: string for the image link
 * - currNum: integer for what image we're on
 * - totalNum: integer for how many images are in the collection
 * 
 * State:
 * - none
 * 
 * App --> Carousel --> Card
 */

function CarouselCard({ caption, src, currNum, totalNum }) {

  return (
    <div className="Card">
      <Card border="white" style={{ width: '22rem', height: '22rem' }} >
        <Card.Img style={{ width: '22rem', height: '22rem' }} src={src} alt={caption}></Card.Img>
        <Card.Title><h5 >{caption}</h5></Card.Title>
        <Card.Text><h6>Image {currNum} of {totalNum}.</h6>
        </Card.Text>
      </Card>
    </div>
  );
}

export default CarouselCard;
