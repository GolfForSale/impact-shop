import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import styles from "./HomePage.module.css";
import { getCategories } from "./lib/api";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

export default async function Home() {
  const {categories, error} = await getCategories()
  .then((data) => ({categories: data, error: null}))
  .catch((err) => ({categories: [], error: err instanceof Error ? err.message : 'Failed to load categories'}))

  return (
    <div className={styles.homePage}>
    <Header />

      <main className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>
          Shop by Category
        </h1>
        {error ? (
          <ErrorMessage message={error} />
        ) : categories.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category} category={category} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
