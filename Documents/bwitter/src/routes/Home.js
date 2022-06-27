import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Bweet from "../components/Bweet";
import BweetFactory from "../components/BweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div className="container">
      <BweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
