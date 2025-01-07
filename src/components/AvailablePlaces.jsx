import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching,setisFetching] = useState();
  const [error,SetError] = useState()

  useEffect(() => {
    async function fetchData() {
      setisFetching(true)
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
  try {
    if (!response.ok){
      throw new Error('Failed to fetch places')
  
    }
    navigator.geolocation.getCurrentPosition((position)=>{
       const sortedPlaces = sortPlacesByDistance(resData.places , position.coords.latitude,position.coords.longitude)
      setAvailablePlaces(sortedPlaces);
      
      setisFetching(false);
    })
    
  } catch (error) {
    SetError({message: error.message ||  'Could not fetch places please try again'})
    
      setisFetching(false);
  }

    
    }
    fetchData();
  }, []);


  if (error){
    return <Error  title = "Error Occured"  message= {error.message} />
  }

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
