import { Marker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentPosts } from "../store/currentPostsReducer";

function Markers() {
  const dispatch = useDispatch();
  const currentPosts = useSelector((state) => state.currentPosts.currentPosts);
  const getShow = (pos) => {
    currentPosts.map((post) => {
      if (post.id !== pos.id) {
        post.showed = false;
      } else {
        pos.showed = !pos.showed;
      }
    });
    dispatch(addCurrentPosts([...currentPosts]));
  };
  return (
    <>
      {currentPosts.map((pos) => (
        <Marker
          key={pos.id}
          position={pos.coord}
          eventHandlers={{
            click: () => getShow(pos),
          }}
        >
          {pos.showed && (
            <div className="my-pop">
              <h2>Актуальне</h2>
              <img src={pos.img} />
              <h3>{pos.price} грн</h3>
              <p>{pos.disc}</p>
              <input type="button" value="Зв'язатися" />
            </div>
          )}
        </Marker>
      ))}
    </>
  );
}

export default Markers;
