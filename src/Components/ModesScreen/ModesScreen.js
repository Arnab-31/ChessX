import React from "react";
import { Link } from "react-router-dom";

import styles from  "./ModesScreen.module.css"

export default function ModesScreen (){

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

                <div className={styles.header}>
                    <h1> Choose your game mode! </h1>
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
               
            </div>


        </div>
    )
}