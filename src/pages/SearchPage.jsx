import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const SearchPage = () => {
    const [loading, setLoading] = useState(true)
    const { search } = useParams();
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    const getSearchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
                method: "GET"
            })

            const data = await response.json()
            dispatch(setListings({ listings: data }))
            setLoading(false)

        } catch (err) {
            console.log("Fetch Search List failed!", err.message)
        }
    }

    useEffect(() => {
        getSearchListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    
    return loading ? <Loader /> : (
        <>
            <Navbar />
            <h1 className="title-list">{search}</h1>
            <div className="list">
                {listings.length <= 0 && (
                    <div>
                        <p>You don't have any place liked yet!</p>
                    </div>
                )}
                {listings?.map(({_id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false}) => (
                    <ListingCard
                        listingId={_id}
                        creator={creator}
                        listingPhotoPaths={listingPhotoPaths}
                        city={city}
                        province={province}
                        country={country}
                        category={category}
                        type={type}
                        price={price}
                        booking={booking}              
                    />
                ))}
            </div>
            <Footer />
        </>
    )
}

export default SearchPage