import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const Single = ({ currentUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([]);
  const content = useRef();
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  useEffect(() => {
    setData();
  }, []);
  function setData() {
    const user = {
      id: id,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch("http://localhost:4001/user", options)
      .then((r) => r.json())
      .then((data) => {
        setUser(data.message);
        setReviews(data.reviews);
        console.log(data);
      });
  }
  function subReview() {
    if(user.username === currentUser) return
    const review = {
      reciever: user._id,
      rating: rating,
      content: content.current.value,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(review),
    };

    fetch("http://localhost:4001/addReview", options)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setData();
        setRating(0);
        content.current.value = "";
      });
  }
  return (
    user && (
      <div className="singleWrapper">
      <div className="topWrapper">
        <div className="recieverWrapper">
          <img src={user.image} alt="" style={{ width: "300px" }} />
          <h2>{user.username}</h2>
          <h4>
            {user.rating.length > 0
              ? "Average rating: " +
                user.rating.reduce((a, b) => a + b, 0) / user.rating.length
              : "No ratings yet"}
          </h4>
        </div>
        <div className="reviewInput">
        <h2>Leave a review:</h2>
          <Rating onClick={handleRating} ratingValue={rating} allowHalfIcon  />
          <textarea cols="70" rows="10" ref={content}></textarea>
          <button onClick={subReview} className="submit">Submit</button>
        </div>
      </div>
        <div className="reviewsWrapper">
          {reviews.length > 0 ? (
            reviews.map((x, i) => (
              <div key={i} className="review">
                <h3>{x.by}</h3>
                <p>{x.content}</p>
                <Rating ratingValue={x.rating} allowHalfIcon readonly size="25px" />
              </div>
            ))
          ) : (
            <h3>No reviews yet</h3>
          )}
        </div>
      </div>
    )
  );
};

export default Single;
