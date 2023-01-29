import MainListMaker from "../MainListMaker";
import { useState } from "react";
import { firestore } from "../../firebaseConfig";

import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    championPool: {
      top: [],
      jun: [],
      mid: [],
      sup: [],
      adc: [],
    },
    mains: [],
    consumesMost: "",
    lovesMost: "",
  });

  const handleCreateProfile = (event) => {
    event.preventDefault();
    setProfile({
      name: event.target.name.value,
      championPool: {
        top: [],
        jun: [],
        mid: [],
        sup: [],
        adc: [],
      },
      mains: [],
      consumesMost: "",
      lovesMost: "",
    });
    firestore.collection("profiles").add({ profile });
  };

  const handleChampionPool = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const champion = MainListMaker.champions[source.index];
    const newChampionPool = { ...profile.championPool };
    newChampionPool[destination.droppableId].push(champion);
    setProfile({
      ...profile,
      championPool: newChampionPool,
    });
  };

  return (
    <div className="profile-page">
      <h1>{profile.name}'s Profile</h1>
      <form onSubmit={handleCreateProfile}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Create Profile</button>
      </form>
      <MainListMaker handleChampionPool={handleChampionPool} />
    </div>
  );
};

export default Profile;
