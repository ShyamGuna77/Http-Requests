import Places from "./Places.jsx";
import { useEffect, useState } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching,setisFetching] = useState();

  useEffect(() => {
    async function fetchData() {
      setisFetching(true)
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setisFetching(false)
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //   .then((response) => {
  //    return response.json()
  //   })
  //   .then((resData) => {
  //    setAvailablePlaces( resData.places)
  //   })
  // },[])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading ={isFetching}
      LoadingText = "Fetching Places data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
