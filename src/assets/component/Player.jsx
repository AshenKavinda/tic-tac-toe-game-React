import { useState } from "react";

export default function Player({name,cymbol,isActive,onChangeName}) {
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(name);

    function onSelectEdit() {
        setIsEditing((editing)=>!editing);
        if (isEditing) { 
            onChangeName(cymbol,playerName);
        }
    }

    function changePlayerName(event) {
        setPlayerName(event.target.value);
    }

    let lameLabal = <span className="player-name">{playerName}</span> ;

    if (isEditing) {
        lameLabal = <input type="text" value={playerName} onChange={changePlayerName} /> ;
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {lameLabal}
                <span className="player-cymbol">{cymbol}</span>
            </span>
                <button onClick={onSelectEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}