import React, { useState } from "react";
import { BsHouse } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentPosts } from "../store/currentPostsReducer";
import { add_Post } from "../store/postsReducer";
import Category from "./Category";

function Menu() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const coords = useSelector((state) => state.coords.coords);
  const [newPostStatus, setNewPostStatus] = useState(false);
  const [postName, setPostName] = useState("");
  const [postPrice, setPostPrice] = useState(0);
  const [postImage, setPostImage] = useState("");
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(1);
  const [estateType, setEstateType] = useState("");

  const createNewPost = (e) => {
    e.preventDefault();
    setNewPostStatus(true);
    setPostName(" ");
    setPostPrice(0);
    setPostImage(" ");
  };

  const handleStartPrice = (e) => {
    setStartPrice(e.target.value);
  };
  const handleEndPrice = (e) => {
    setEndPrice(e.target.value);
  };
  const handlePostName = (e) => {
    setPostName(e.target.value);
  };
  const handlePostPrice = (e) => {
    setPostPrice(+e.target.value);
  };
  const handlePostImage = (e) => {
    setPostImage(e.target.value);
  };
  const handleChangeType = (e) => {
    setEstateType(e.target.value);
  };

  const handleChoice = (category) => {
    if (category === "all") {
      dispatch(addCurrentPosts(posts));
    } else {
      dispatch(
        addCurrentPosts(posts.filter((el) => el.category === category))
      );
    }
  };
  const handleSortByPrice = (e) => {
    dispatch(
      addCurrentPosts(
        posts.filter((el) => el.price >= startPrice && el.price <= endPrice)
      )
    );
    setEndPrice(0);
    setStartPrice(0);
  };
  const handleCreateNewMarker = (e) => {
    if (coords.length > 1) {
      const newPost = {
        id: Date.now(),
        disc: postName,
        category: estateType,
        price: postPrice,
        img: postImage,
        coord: coords,
      };
      dispatch(add_Post(newPost));
      setNewPostStatus(false);
    } else {
      alert("?????????????? ?????????? ???? ??????????");
    }
  };

  return (
    <>
      {!newPostStatus ? (
        <div className="menu-container">
          <div className="logo">
            <BsHouse />
            <h3>The Real Estate</h3>
          </div>
          <div className="category-container">
            <h3>??????????????????</h3>
            <ul>
              <Category handleChoice={handleChoice} />
              <h4>???????? ????????????</h4>
              <div className="price-range-container">
                <input
                  type="text"
                  placeholder="??????"
                  onChange={handleStartPrice}
                  value={startPrice}
                />
                <input
                  type="text"
                  placeholder="????"
                  onChange={handleEndPrice}
                  value={endPrice}
                />
                <input
                  type="submit"
                  value="??????????"
                  onClick={handleSortByPrice}
                />
              </div>
            </ul>
          </div>
          <div className="post-container">
            <input
              type="button"
              value="???????????? ????????????????????"
              onClick={(e) => createNewPost(e)}
            />
          </div>
        </div>
      ) : (
        <div className="menu-container">
          <div className="logo">
            <BsHouse />
            <h3>The Real Estate</h3>
          </div>
          <div className="new-post-form">
            <form>
              <input
                type="text"
                placeholder="?????????? ????????????"
                onChange={handlePostName}
              />
              <input
                type="text"
                placeholder="?????????????? ????????????????"
                onChange={handlePostPrice}
              />
              <input
                type="text"
                placeholder="?????????????????? ???? ????????"
                onChange={handlePostImage}
              />
              <span>?????????????? ?????? ??????????????????????</span>
              <select onChange={handleChangeType}>
                <option value="flat" label="????????????????" />
                <option value="house" label="??????????????" />
                <option value="room" label="??????????????" />
                <option value="apartment" label="??????????????????????" />
                <option value="commercial" label="???????????????????? ??????????????????????" />
              </select>

              <p>
                ???????????????????? ???? ?????????? ?????? ?????????????? ?????????? ???????????????????????? ?? ??????????
                ???????????? ????????????????
              </p>
            </form>
          </div>
          <div className="post-container">
            <input
              type="button"
              value="????????????????"
              onClick={(e) => handleCreateNewMarker(e)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
