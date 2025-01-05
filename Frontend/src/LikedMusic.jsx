import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "./Context";
import "./LikedMusic.css";

function LikedMusic() {
  const { likedMusic, setLikedMusic } = useContext(MusicContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    if (localLikedMusic) {
      setLikedMusic(localLikedMusic);
    }
  }, [setLikedMusic]);

  return (
    <div className="liked-music-container">
      {likedMusic.length === 0 ? (
        <div className="liked-music-empty">
          <h3>You don't have any liked music yet!</h3>
          <i className="bi bi-emoji-frown"></i>
        </div>
      ) : (
        <div className="liked-music-content">
          <h1 className="text-danger text-center py-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger"></i>
          </h1>
          <div className="container">
            <div className="row">
              {likedMusic.map((element) => (
                <Card key={element.id} element={element} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LikedMusic;