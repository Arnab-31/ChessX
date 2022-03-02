import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import styles from  "./ModesScreen.module.css"
import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import context from "../../Context/context";


export default function ModesScreen (){

    const history = useNavigate()
    const [mode, setMode] = useState("computer");
    const [pieceColor, setPieceColor] = useState("b");
    const [userName, setUsername] = useState(" ");
    const contextValue = useContext(context);

    var pieceColors = [
        "w",
        "b"
    ];
   

    async function startOnlineGame() {
        const { currentUser } = auth
     
        
     
        const member = {
            uid: currentUser.uid,
            piece: pieceColor,
            name: userName, 
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
        }
    
        console.log("username ", userName)
        const docRef = await addDoc(collection(db, "games"), {
           boardData: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
           game
        });

        const gameId = docRef.id;
        contextValue.setUsername(userName);
        contextValue.setGameId(gameId);
        contextValue.setPieceColor(pieceColor);
        contextValue.setMultiplayerMode(true);
        
        history(`/onlinegame/` + gameId)
    }


    return (
        <div>
            <div className={styles.nav}>

                <div className={styles.leftNav}>
                    <img src="/logo.png" className={styles.logo}/>
                    <h3 className={styles.title}>ChessX</h3>
                </div>
                <div className={styles.rightNav}>
                    <div className={styles.navLinks}>
                        <p>About Us</p>
                    </div>
                </div>

            </div>


            <div className={styles.mainContainer}>

                    <div>
                        <h3>Choose a game mode</h3>
                        <input type="radio" id="html" name="fav_language" value="HTML" defaultChecked onChange={() => setMode("computer")}/>
                        <label for="html">Against Computer</label><br/>
                        <input type="radio" id="css" name="fav_language" value="CSS" onChange={() => setMode("multiplayer")} />
                        <label for="css">Mutiplayer</label><br/>
                    </div>

                {mode === "computer" && 
                <React.Fragment>
                    <div className={styles.header}>
                        <h1> Choose difficulty level! </h1>
                    </div>
                

                    <div  className={styles.modesContainer}>

                        <div>
                            <Link to="/game?level=1" className = {styles.Link}>
                                <div className = {`${styles.mode} ${styles.bg1}`}>
                                    <h2>Novice</h2>    
                                </div>
                            </Link>
                        </div>

                        <div>
                            <Link to="/game?level=2" className = {styles.Link}>
                                <div className = {`${styles.mode} ${styles.bg2}`}>
                                    <h2>Begineer</h2>  
                                </div>
                            </Link>
                        </div>

                        <div>
                            <Link to="/game?level=3" className = {styles.Link}>
                                <div className = {`${styles.mode} ${styles.bg3}`}>
                                    <h2>Experienced</h2>  
                                </div>
                            </Link>
                        </div>
                    

                        <div>
                            <Link to="/game?level=4" className = {styles.Link}>
                                <div className = {`${styles.mode} ${styles.bg4}`}>
                                    <h2>Expert</h2>  
                                </div>
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
                }

                {mode === "multiplayer" && 
                <div>
                    <div>
                        <br />
                        <label>Enter username</label>
                        <br />
                        <input  type="text"  onChange={event => setUsername(event.target.value)} />
                    </div>
                    <div>
                        <h3>Choose piece color</h3>
                        <input type="radio" id="html" name="piece_colors" value="HTML" defaultChecked onChange={() => setPieceColor("b")}/>
                        <label for="html">Black</label><br/>
                        <input type="radio" id="css" name="piece_colors" value="CSS" onChange={() => setPieceColor("w")} />
                        <label for="css">White</label><br/>
                        <input type="radio" id="css" name="piece_colors" value="CSS" onChange={() => setPieceColor(pieceColors[Math.floor(Math.random()*pieceColors.length)])} />
                        <label for="css">Random</label><br/>
                    </div>

                    <div>
                        <button onClick={startOnlineGame}>Play</button>
                    </div>
                </div>
                }
               
            </div>


        </div>
    )
}