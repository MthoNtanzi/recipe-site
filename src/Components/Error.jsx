import styles from '../assets/styles/error.module.css';
import noFoodSVG from '../assets/img/no_food.png'

export function Error({error}) {
  return (
      <div className={styles.errorHandling}>
          <img className={styles.noFood} src={noFoodSVG} />
          <p className={styles.errorText}>{error}</p>

      </div>
  )
}

export default Error;