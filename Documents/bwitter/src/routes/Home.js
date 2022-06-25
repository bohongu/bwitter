import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);
  const getBweets = async () => {
    const dbBweets = await getDocs(collection(dbService, "bweets"));
    dbBweets.forEach((document) => {
      const bweetObject = {
        ...document.data(),
        id: document.id,
      };
      setBweets((prev) => [bweetObject, ...prev]);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "bweets"), {
        bweet,
        createdAt: Date.now(),
      });
      setBweet("");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setBweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={bweet}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Bweet" />
      </form>
    </div>
  );
};

export default Home;
