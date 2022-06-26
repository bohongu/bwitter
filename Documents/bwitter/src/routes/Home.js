import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Bweet from "../components/Bweet";

const Home = ({ userObj }) => {
  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "bweets"));
    onSnapshot(q, (snapshot) => {
      const bweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBweets(bweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "bweets"), {
        text: bweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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
      <div>
        {bweets.map((bweet) => (
          <Bweet
            key={bweet.id}
            bweetObj={bweet}
            isOwner={bweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
