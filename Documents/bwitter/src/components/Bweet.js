import React, { useState } from "react";
import { dbService } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Bweet = ({ bweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);
  const BweetTextRef = doc(dbService, "bweets", `${bweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure DELETE?");
    if (ok) {
      await deleteDoc(BweetTextRef);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(BweetTextRef, { text: newBweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewBweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your bweet"
              value={newBweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{bweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Bweet</button>
              <button onClick={toggleEditing}>Edit Bweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bweet;
