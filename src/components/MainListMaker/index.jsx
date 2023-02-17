import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  const onDragEnd = (result) => {
    // handle the end of a drag and drop event
    // and update the state accordingly
    const { source, destination } = result;
    if (!destination) return;

    const newChampions = Array.from(champions);
    const [removed] = newChampions.splice(source.index, 1);
    newChampions.splice(destination.index, 0, removed);
    setChampions(newChampions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="champion-list">
        {(provided) => (
          <div ref={provided.innerRef} className="champion-list">
            {champions.map((champion, index) => (
              <Draggable
                key={champion.id}
                draggableId={champion.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="champion"
                  >
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${champion.id}.png`}
                      alt={champion.name}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default MainListMaker;
