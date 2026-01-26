import styles from '../assets/styles/loader.module.css';
import panSVG from '../assets/img/pan.svg';

export function Loader() {
    return(
        <div className={styles.loading}>
            <div className={styles.panSVGBorder}>
                <img className={styles.panSVG} src={panSVG} />
            </div>
            <p className={styles.loaderText}>Loading Recipe...</p>
        </div>
    );
}