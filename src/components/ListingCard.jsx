/* eslint-disable jsx-a11y/img-redundant-alt */
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "../styles/ListingCard.scss";
import { useState } from "react";

const ListingCard = ({
        listingId,
        creator,
        listingPhotoPaths,
        city,
        province,
        country,
        category,
        type,
        price
    }) => {

    /* SLIDER FOR IMAGES */
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }

  return (
    <div className="listing-card">
        <div className="slider-container">
            <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
                {listingPhotoPaths?.map((photo, index) => (
                    <div key={index} className="slide">
                        <img
                            src={`http://localhost:3001/${photo.replace("public", "")}`}
                            alt={`photo ${index + 1}`}
                        />
                        <div
                            className="prev-button"
                            onClick={(e) => (goToPrevSlide(e))}
                        >
                            <MdArrowBackIosNew sx={{ fontSize: "15px" }} />
                        </div>
                        <div
                            className="next-button"
                            onClick={(e) => (goToNextSlide(e))}
                        >
                            <MdArrowForwardIos sx={{ fontSize: "15px" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <h3 className="">{city}, {province}, {country}</h3>
        <p>{category}</p>
        <p>{type}</p>
        <p><span>${price} per night</span></p>
    </div>
  );
};

export default ListingCard