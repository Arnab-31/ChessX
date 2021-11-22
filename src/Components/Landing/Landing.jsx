import React from "react";

import styles from  "./Landing.module.css"

export default function Landing (){

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
                <div className={styles.leftContainer}>
                    <div className={styles.textBox}>

                        <div>
                            <h1>Let's Play <br/> Chess</h1>
                            <p>Welcome to the Gentleman's Game!</p>

                            <button className={styles.btn}> Play </button>
                        </div>
                       
                    </div>

                </div>

                
                <div className={styles.rightContainer}>
                    <img src="/chesslanding.png" className={styles.mainImage} />
                </div>
            </div>


        </div>
    )
}