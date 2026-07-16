import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>Starsoft &copy; todos os direitos reservados {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
