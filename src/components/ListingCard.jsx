/* eslint-disable jsx-a11y/img-redundant-alt */
// import { MdArrowBackIosNew, MdArrowForwardIos, MdFavorite } from "react-icons/md";
import { ArrowBackIosNew, ArrowForwardIos, Favorite } from "@mui/icons-material";
import "../styles/ListingCard.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../redux/state";

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
    const dispatch = useDispatch();

    /* ADD TO WISHLIST */
    const user = useSelector((state) => state.user);
    const wishList = user?.wishList || [];

    const isLiked = wishList.find((item) => item?._id === listingId);

    const patchWishList = async () => {
        if(user?._id !== creator._id){
            const response = await fetch(
                `http://localhost:3001/users/${user?._id}/${listingId}`,
                {
                  method: "PATCH",
                  header: {
                    "Content-Type": "application/json",
                  },
                }
            );
            const data = await response.json();
            dispatch(setWishList(data.wishList));
        } else {
            return;
        }

    };

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
                            <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                        </div>
                        <div
                            className="next-button"
                            onClick={(e) => {
                                e.stopPropagation()
                                goToNextSlide(e)
                            }}
                        >
                            <ArrowForwardIos sx={{ fontSize: "15px" }} />
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

        <button
            className="favorite"
            onClick={(e) => {
                e.stopPropagation();
                patchWishList()
                console.log("Clickado")
            }}
            disabled={!user}
        >
            {isLiked ? (
                <Favorite sx={{ color: "red" }} />
            ) : (
                <Favorite sx={{ color: "white" }} />
            )}
        </button>

    </div>
  );
};

export default ListingCard