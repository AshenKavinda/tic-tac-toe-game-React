export default function GameBoard({onSelectSquire,gameBoard}) {
    return (
        <ol id="game-board">
            {
                gameBoard.map((row,rowIndex)=>(
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol,colIndex)=> (
                                <li key={colIndex}>
                                    <button className={gameBoard[rowIndex][colIndex] != null ? 'btn-disable': undefined}
                                            onClick={() => onSelectSquire(rowIndex,colIndex)}
                                            disabled={playerSymbol !== null}>
                                                {[playerSymbol]}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))
            }
        </ol>
    );
}