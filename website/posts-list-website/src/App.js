import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PostsList from "./components/PostsList";
import faker from "faker";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        console.log("RES", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="title">{faker.random.words()}</h1>
      <div className="ui segment vin-card">
        <div className="ui card">
          <div className="image">
            <img src="https://static01.nyt.com/images/2017/04/07/fashion/07COVER/07COVER-articleLarge.jpg?quality=75&auto=webp&disable=upscale" />
          </div>
          <div className="content">
            <div className="header">
              {faker.name.firstName()} {faker.name.lastName()}
            </div>
            <div className="meta">
              <span className="date">Joined in 2015</span>
            </div>
            <div className="description">
              {`${faker.name.firstName()} is ${faker.random.word()}, living in ${faker.address.city()}.`}
            </div>
          </div>
          <div className="extra content">
            <a>
              <i aria-hidden="true" className="user icon"></i>
              22m Friends
            </a>
          </div>
        </div>
        <div class="card-words">
          <p>{faker.lorem.paragraphs()}</p>
          <p>{faker.lorem.paragraphs()}</p>
          <p>{faker.lorem.paragraphs()}</p>
          <p>{faker.lorem.paragraphs()}</p>
          <p>{faker.lorem.paragraphs()}</p>
          <p>{faker.lorem.paragraphs()}</p>
        </div>
      </div>
      <PostsList posts={posts} />
    </div>
  );
}

export default App;
