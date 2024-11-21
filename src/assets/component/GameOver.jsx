export default function GameOver({name,restart}) {
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{name ? `${name} Won!` : `Game Drow!`}</p>
            <p>
                <button onClick={restart}>Rematch!</button>
            </p>
        </div>
    );
}