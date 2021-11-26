import React, { useRef, useState } from "react";
import axios from "axios";

import "./App.scss";

import Post from "./Components/Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postsQuantity, setPostsQuantity] = useState(0);
  const [endOfPosts, setEndOfPosts] = useState(false);

  const btn = useRef(null);

  const handleClick = async () => {
    try {
      if (!endOfPosts) {
        var res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_start=${postsQuantity}&_limit=${10}`
        );
        console.log(res);
        if (res.data.length !== 0) {
          setPostsQuantity(postsQuantity + 10);
          setPosts([...posts, ...res.data]);
          btn.current.classList.remove("upLoadBtn");
          btn.current.classList.add("downLoadBtn");
        } else {
          setEndOfPosts(true);
        }
      }
    } catch (err) {
      alert(`something went wrong: ${err}`);
    }
  };

  const displayEnd = () => {
    if (endOfPosts) {
      return <div id="end">Nothing to load</div>;
    } else {
      return (
        <button
          ref={btn}
          className="upLoadBtn loadBtn"
          onClick={() => handleClick()}
        >
          {posts.length ? "Load more" : "Load posts"}
        </button>
      );
    }
  };

  return (
    <main>
      <div>
        {posts.map(({ id, title, body }) => (
          <Post key={id} title={title} body={body} />
        ))}
      </div>
      {displayEnd()}
    </main>
  );
};

export default App;
