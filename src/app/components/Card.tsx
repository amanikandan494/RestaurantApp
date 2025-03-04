import * as React from "react";
import "./Card.css";
import { Button } from "react-bootstrap";
import Image from "next/image";

const Card = (props: any): React.JSX.Element => {
  console.log("Props in card:", props);
  const { cardTitle, cardDescription, cardPath, handleModalShow } = props;
  return (
    <div className="card-container">
      <div className="card-flip">
        {/* Front Side */}
        <div className="card front">
          <div className="card-body text-center">
            <h5 className="card-title">{cardTitle}</h5>
            <Image
              src={cardPath} // Path to the image
              alt={cardTitle} // Alternative text for accessibility
              width={180} // Width of the image in pixels
              height={180} // Height of the image in pixels
            />
          </div>
        </div>

        {/* Back Side */}
        <div className="card back">
          <div className="card-body text-center">
            <p className="card-description">{cardDescription}</p>
            <Button onClick={handleModalShow}>Expand</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
