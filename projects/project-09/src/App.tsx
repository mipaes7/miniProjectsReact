import { useMemo, useState } from "react";
import UsersList from "./components/UsersList";
import { SortBy, type User } from "./types.d";
import "./App.css";
import { useUsers } from "./hooks/useUsers";


function App() {

  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    users.filter((user) => user.email !== email);
  };

  const handleResetList = async () => {
    await refetch();
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const sortUsers = (users: User[]) => {
    switch (sorting) {
      case SortBy.NONE:
        return users;
      case SortBy.NAME:
        return users.toSorted((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
      case SortBy.LAST:
        return users.toSorted((a, b) => a.name.last.localeCompare(b.name.last));
      case SortBy.COUNTRY:
        return users.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        );
    }
  };

  const filterUsers = (usersToFilter: User[]) => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? usersToFilter.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : usersToFilter;
  };

  const filteredUsers = useMemo(() => {
    return filterUsers(users);
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers);
  }, [filteredUsers, sorting]);

  return (
    <>
      <h1>Prueba técnica</h1>
      <hr />
      <header
        style={{
          display: "flex",
          margin: "6px 0 6px 0",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>Ordenar por país</button>
        <button onClick={handleResetList}>Reset Lista</button>
        <input
          placeholder="Filtra por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
          style={{ height: "30px", alignSelf: "center" }}
        />
      </header>
      <main>
        {!isLoading && !isError && users.length > 0 && (
          <UsersList
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        {!isLoading && isError && <p>Error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && (
          <button onClick={async () => await fetchNextPage()}>
            Cargar más resultados
          </button>
        )}
      </main>
    </>
  );
}

export default App;
