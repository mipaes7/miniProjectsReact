import React, { useState } from "react";
import "./App.css";

type ItemID = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemID;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
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

function App() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => [...prevItems, newItem]);

    input.value = "";
  };

  const createHandleDelete = (id: ItemID) => () => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  return (
    <main>
      <aside>
        <h1>Prueba técnica</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir
            <input type="text" name="item" required placeholder="Juegos" />
          </label>
          <button type="submit">Añadir elemento</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        {items.length === 0 ? (
          <strong>No hay elementos</strong>
        ) : (
          items.map((item) => (
            <ul>
              <li key={item.id}>
                {item.text}
                <button onClick={createHandleDelete(item.id)}>Eliminar</button>
              </li>
            </ul>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
