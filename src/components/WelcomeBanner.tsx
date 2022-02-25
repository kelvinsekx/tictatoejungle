import * as React from 'react'
import styles from "./WelcomeBanner.module.css"


type TypeClose = {
    close: () => void;
}
const WelcomeBanner = ({ close }: TypeClose) => {
    return (
        <div className={styles.body}>
            <div className={`${styles.main} ${styles.flexDiv}`}>
                <h1>Hello World!!, welcome first timer</h1>
                <div className={styles.flexDiv}>
                    <p className={styles.p}>This is an x and y jungle web game. If you have no idea how to play this awesome game, see the get started video below.</p>
                    <p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Zk0TtOJTA4Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </p>
                </div>
                <div>
                    <button
                        className={styles.button} 
                        onClick={() => close()}>Start Game</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBanner;