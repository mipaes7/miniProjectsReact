import "./App.css";
import Item from "./components/Item";
import { useItems } from "./hooks/useItems";

export type ItemID = `${string}-${string}-${string}-${string}-${string}`;

export interface ItemType {
  id: ItemID;
  timestamp: number;
  text: string;
}

function App() {
  
  const { items, addItem, deleteItem } = useItems()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    addItem(input.value)

    input.value = "";
  };

  const createHandleDelete = (id: ItemID) => () => {
    deleteItem(id)
  };

  return (
    <main>
      <aside>
        <h1>Prueba técnica</h1>
        <form aria-label="add-elements" onSubmit={handleSubmit}>
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
          <ul>
            {items.map((item) => (
              <Item key={item.id} {...item} handleClick={createHandleDelete(item.id)} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
