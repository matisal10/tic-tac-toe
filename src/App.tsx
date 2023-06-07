import React, { useState, useEffect } from 'react';

const GRID = Array.from(Array(9).keys());
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Fila superior
  [3, 4, 5], // Fila media
  [6, 7, 8], // Fila inferior
  [0, 3, 6], // Columna izquierda
  [1, 4, 7], // Columna media
  [2, 5, 8], // Columna derecha
  [0, 4, 8], // Diagonal izquierda a derecha
  [2, 4, 6]  // Diagonal derecha a izquierda
];

const App: React.FC = () => {
  const [grid, setGrid] = useState<string[]>(GRID.map(() => ''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameDraw, setIsGameDraw] = useState(false);
  const [turn, setTurn] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleClick = (index: number) => {
    if (!isGameOver && grid[index] === '') {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = isXTurn ? 'X' : 'O';
        return newGrid;
      });
      setIsXTurn((prevIsXTurn) => !prevIsXTurn);
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (player: string) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => grid[index] === player);
    });
  };

  const checkDraw = () => {
    return !grid.some((value) => value === '');
  };

  const reset = () => {
    setIsXTurn(true)
    setWinner(null)
    setIsGameDraw(false)
    setIsGameOver(false)
    setGrid(GRID.map(() => ''))
  }

  useEffect(() => {
    if (checkWinner('X')) {
      setIsGameOver(true);
      setWinner('X');
      setScores((prevScores) => ({
        ...prevScores,
        X: prevScores.X + 1,
      }));
    } else if (checkWinner('O')) {
      setIsGameOver(true);
      setWinner('O');
      setScores((prevScores) => ({
        ...prevScores,
        O: prevScores.O + 1,
      }));
    } else if (checkDraw()) {
      setIsGameOver(true);
      setIsGameDraw(true);
    }
  }, [grid]);

  return (
    <main>
      {grid.map((value, index) => (
        <div key={index} className="square" onClick={() => handleClick(index)}>
          {value}
        </div>
      ))}
      <article className="result-container">
        {
          !isGameOver ?
            turn === 'X' ? <h2 className='turn'>Turno X</h2> : <h2 className='turn'>Turno O</h2>
            :
            <></>
        }
        {winner && <h2 >¡El jugador <span className="winner">{winner}</span> ha ganado!</h2>}
        {isGameDraw && <h2>¡El juego ha terminado en empate!</h2>}
      </article>
      {
        winner || isGameDraw ? <button onClick={reset}>Reiniciar</button> : <></>
      }
      <article className="scoreboard">
        {/* <h2>Tabla de puntajes</h2> */}
        <table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores).map(([player, score]) => (
              <tr key={player}>
                <td>{player}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </main>
  );
};

export default App;