import { useState } from "react";
import useFetch from "../useFetch.jsx";

const Hotels = () => {
  const [message, setMessage] = useState("");
  const { data, error, loading } = useFetch("http://localhost:80/hotels");
  
  const hotels = data?.hotels;

  const deleteHotel = async (id) => {
    try {
      const res = await fetch(`http://localhost/hotels/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw "Failed to delete hotel.";
      }

      const data = await res.json();
      console.log(data)

      if (data) {
        setMessage("Hotel deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <h1>Hotels list </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error occurred.</p>
      ) : hotels ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              <h4>{hotel.name}</h4>
              <button onClick={() => deleteHotel(hotel._id)}>Delete</button>
            </li>
          ))}
          {message && <p>{message}</p>}
        </ul>
      ) : (
        <p>Hotels not found.</p>
      )}
    </>
  );
};

export default Hotels;
