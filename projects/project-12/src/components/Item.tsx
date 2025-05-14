import type { ItemID } from "../App";

const Item = ({id, text, handleClick}: {id: ItemID, text: string, handleClick: () => void}) => {
  return (
    <li key={id}>
      {text}
      <button onClick={handleClick}>Eliminar</button>
    </li>
  );
};

export default Item;
