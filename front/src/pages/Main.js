import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [users, setUsers] = useState();
  const nav = useNavigate();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    };
    fetch("http://localhost:4001/userdb", options)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  });
  function toUser(id) {
    nav(`/single/${id}`);
  }

  return (
    <div className="usersWrapper">
      {users &&
        users.message.map((x, i) => {
          return (
            <div key={i} onClick={() => toUser(x._id)} className="userWrap">
              <img src={x.image} alt="" style={{ width: "200px" }} />
              <h2>{x.username}</h2>
              <h5>
                {x.rating.length > 0
                  ? "Average rating: " +
                    x.rating.reduce((a, b) => a + b, 0) / x.rating.length
                  : "No ratings yet"}
              </h5>
            </div>
          );
        })}
    </div>
  );
};

export default Main;
