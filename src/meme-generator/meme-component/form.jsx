import React, { useState } from "react";
export default function Form() {
  const [meme, setMeme] = React.useState({
    topText: "",
    randomImg: "https:// i.imgflip.com/ibij.jpg",
    bottomText: "",
  });
  const [allMeme, setAllMemeImage] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImage(data.data.memes));
  });
  function renderImg() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: url,
    }));
  }
  function handlechange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }
  return (
    <>
      <main>
        <div className="inputs">
          <input
            type="text"
            placeholder="Top text"
            name="topText"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            onChange={handlechange}
          />
        </div>
        <div className="buttons">
          <button onClick={renderImg} className="button">
            Get a new meme image 🖼
          </button>
        </div>
        <div className="image">
          <img className="meme-image" src={meme.randomImg} alt="" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </main>
    </>
  );
}
