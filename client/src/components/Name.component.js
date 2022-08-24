import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../utils/randomCodeGenerator'
import './Homepage.component.scss';

window.onbeforeunload = null;

const NamePage = ({nameChange}) => {
    const [playerName, setPlayerName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(2);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
        nameChange(event.target.value);
        let component = document.getElementById('name-component')
        if (event.target.value) {
            component.classList.remove('name-component-center');
            component.classList.add('name-component-top');
        } else {
            component.classList.add('name-component-center');
            component.classList.remove('name-component-top');
        }
    };

    return (
        <div class='name-component-center' id='name-component'>
            <h1>Name</h1>
            <input type='text' onChange={handleNameChange} value={playerName} />
        </div>
    )
}

export default NamePage
