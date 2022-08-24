import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../utils/randomCodeGenerator'
import './Homepage.component.scss';

import NamePage from './Name.component';

window.onbeforeunload = null;

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')
    const [playerName, setPlayerName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(2);
    const [hasName, setHasName] = useState(false);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleMaxPlayerChange = (event) => {
        setMaxPlayers(event.target.value);
    }

    const handlFormButtonClick = (event) => {
        console.log(event);
    }

    const handleSevenNameChange = (name) => {
        if (name) {
            setHasName(true);
        } else {
            setHasName(false);
        }
        setPlayerName(name);
    }

    const numPlayersSelection = (event) => {
        console.log(event);
    }

    return (
        <div className='Homepage'>
            <NamePage nameChange={handleSevenNameChange} />
            { hasName ? 
            <div className='homepage-menu'>
                <img src={require('../assets/logo.png').default} width='200px' />
                <div className='homepage-form'>
                    <div className='homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`/play?roomCode=${roomCode}&name=${playerName}`}><button className="game-button green">JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <div>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=2`}><button className="game-button orange">2</button></Link>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=3`}><button className="game-button orange">3</button></Link>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=4`}><button className="game-button orange">4</button></Link>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=5`}><button className="game-button orange">5</button></Link>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=6`}><button className="game-button orange">6</button></Link>
                            <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}&numPlayers=7`}><button className="game-button orange">7</button></Link>
                        </div>
                        {/* <input type='number' placeholder='number of players' onChange={handleMaxPlayerChange} value={maxPlayers} /> */}
                        <Link to={`/play?roomCode=${randomCodeGenerator(5)}&name=${playerName}`}><button className="game-button orange">CREATE GAME</button></Link>
                    </div>
                </div>
            </div>
            : <div></div> 
            }
        </div>
    )
}

export default Homepage
