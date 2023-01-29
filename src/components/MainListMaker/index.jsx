import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./index.css";
function MainListMaker() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
      )
      .then((res) => setChampions(Object.values(res.data.data)));
  }, []);

  return (
    <DragDropContext>
      <Droppable droppableId="champion-list">
        {(provided) => (
          <div ref={provided.innerRef}>
            {champions.map((champion) => (
              <div key={champion.id}>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${champion.id}.png`}
                  alt={champion.name}
                />
                <span>{champion.name}</span>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default MainListMaker;
