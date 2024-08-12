/* eslint-disable jsx-a11y/img-redundant-alt */
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "../styles/ListingCard.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
        listingId,
        creator,
        listingPhotoPaths,
        city,
        province,
        country,
        category,
        type,
        price,
        startDate,
        endDate,
        totalPrice,
        booking
    }) => {

    /* SLIDER FOR IMAGES */
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }

    const navigate = useNavigate();

  return (
    <div
        className="listing-card"
        onClick={() => {
            navigate(`/properties/${listingId}`);
        }}
    >
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
                            onClick={(e) => {
                                e.stopPropagation()
                                goToPrevSlide(e)
                            }}
                        >
                            <MdArrowBackIosNew sx={{ fontSize: "15px" }} />
                        </div>
                        <div
                            className="next-button"
                            onClick={(e) => {
                                e.stopPropagation()
                                goToNextSlide(e)
                            }}
                        >
                            <MdArrowForwardIos sx={{ fontSize: "15px" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <h3 className="">{city}, {province}, {country}</h3>
        <p>{category}</p>
        {!booking ? (
            <>
                <p>{type}</p>
                <p><span>${price} per night</span></p>
            </>
        ) : (
            <>
                <p>{startDate} - {endDate}</p>
                <p><span>${totalPrice} total</span></p>
            </>
        )}
        
    </div>
  );
};

export default ListingCard