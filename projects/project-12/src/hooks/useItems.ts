import { useState } from "react";
import type { ItemID, ItemType } from "../App";

const INITIAL_ITEMS: ItemType[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Libros",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Videojuegos",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Sandías",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Discos",
  },
];

export const useItems = () => {
    const [items, setItems] = useState<ItemType[]>(INITIAL_ITEMS);

    const addItem = (text: string) => {
        const newItem: ItemType = {
              id: crypto.randomUUID(),
              text: text,
              timestamp: Date.now(),
            };
        
            setItems((prevItems) => [...prevItems, newItem]);
    }

    const deleteItem = (id: ItemID) => {
        setItems((prevItems) => prevItems.filter((i) => i.id !== id));
    }

    return {
        items,
        addItem,
        deleteItem
    }
}