import "./App.css";
import Map from "./components/Map";
import Menu from "./components/Menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentPosts } from "./store/currentPostsReducer";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(addCurrentPosts(posts));
  }, [posts]);

  return (
    <div className="main-container">
      <Menu />
      <Map />
    </div>
  );
}

export default App;
