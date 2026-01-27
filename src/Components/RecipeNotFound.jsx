import styles from '../assets/styles/notFound.module.css';
import noFoodSVG from '../assets/img/no_food.png'

export function RecipeNotFound({recipe}) {
  return (
      <div className={styles.errorHandling}>
          <img className={styles.noFood} src={noFoodSVG} />
          <p className={styles.recipeNotFoundText}>"{recipe}" not found...</p>
          <p className={styles.tryAgain}>Try something else</p>
      </div>
  )
}

export default RecipeNotFound;