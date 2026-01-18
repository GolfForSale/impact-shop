import Image from "next/image";
import styles from "./page.module.css";
import { getCategories } from "./lib/api";

export default async function Home() {
  const {categories, error} = await getCategories()
  .then((data) => ({categories: data, error: null}))
  .catch((err) => ({categories: [], error: err instanceof Error ? err.message : 'Failed to load categories'}))

  return (
    <div className={styles.page}>
  
    </div>
  );
}
