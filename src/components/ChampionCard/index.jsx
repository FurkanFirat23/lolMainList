import { Draggable } from "react-beautiful-dnd";
function ChampionCard({ champion, index }) {
  return (
    <Draggable key={champion.id} draggableId={champion.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="champion-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img
            className="img"
            src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${champion.image.full}`}
            alt={champion}
          />
        </div>
      )}
    </Draggable>
  );
}
export default ChampionCard;
