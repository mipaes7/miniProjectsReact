import { useState } from 'react';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './helpers/board';
import { WinnerModal } from './components/WinnerModal';

function App() {

  const [board, setBoard] = useState( () => {
    const boardFromLocalStorage = localStorage.getItem('board');
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = localStorage.getItem('turn');
    return turnFromLocalStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // no actualizamos si hay algo en esa posición del tablero
    if (board[index] || winner) return;
    // actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar partida
    localStorage.setItem('board', JSON.stringify(newBoard));
    localStorage.setItem('turn', newTurn);
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    localStorage.clear();
  };

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset juego</button>
        <section className='game'>
          {
            board.map((square, index) => (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            ))
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
          <WinnerModal winner={winner} resetGame={resetGame}/>
      </main>
    </>
  )
}

export default App
