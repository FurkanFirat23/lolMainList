import MainListMaker from "../MainListMaker";
import { useState } from "react";

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
    hatesMost: "",
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
      hatesMost: "",
      lovesMost: "",
    });
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
      <h2>Champion Pool</h2>
      <div className="mainlistmaker">
        <MainListMaker handleChampionPool={handleChampionPool} />
      </div>
      <div className="champion-pool">
        <div className="top">
          <h3>Top</h3>
          {profile.championPool.top.map((champion) => (
            <div key={champion.id}>{champion.name}</div>
          ))}
        </div>
        <div className="jun">
          <h3>Jungle</h3>
          {profile.championPool.jun.map((champion) => (
            <div key={champion.id}>{champion.name}</div>
          ))}
        </div>
        <div className="mid">
          <h3>Mid</h3>
          {profile.championPool.mid.map((champion) => (
            <div key={champion.id}>{champion.name}</div>
          ))}
        </div>
        <div className="adc">
          <h3>Support</h3>
          {profile.championPool.sup.map((champion) => (
            <div key={champion.id}>{champion.name}</div>
          ))}
        </div>
        <div className="sup">
          <h3>Adc</h3>
          {profile.championPool.adc.map((champion) => (
            <div key={champion.id}>{champion.name}</div>
          ))}
        </div>
      </div>
      <div className="mains">
        <h2>Mains</h2>
        {profile.mains.map((champion) => (
          <div key={champion.id}>{champion.name}</div>
        ))}
      </div>
      <div className="hates-most">
        <h2>hatesMost</h2>
        {profile.hatesMost && <div>{profile.hatesMost}</div>}
      </div>
      <div className="loves-most">
        <h2>lovesMost</h2>
        {profile.lovesMost && <div>{profile.lovesMost}</div>}
      </div>
    </div>
  );
};

export default Profile;
