import React, { useState } from "react";
import { dbService, storageSerivce } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Bweet = ({ bweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);
  const BweetTextRef = doc(dbService, "bweets", `${bweetObj.id}`);
  const BweetFileRef = ref(storageSerivce, bweetObj.attachmentUrl);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure DELETE?");
    if (ok) {
      await deleteDoc(BweetTextRef);
    }
    if (bweetObj.attachmentUrl) {
      await deleteObject(ref(BweetFileRef));
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your bweet"
              value={newBweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Bweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{bweetObj.text}</h4>
          {bweetObj.attachmentUrl && <img src={bweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bweet;
