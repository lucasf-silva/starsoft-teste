'use client';

import { Drawer } from '../drawer';
import styles from './LoginDrawer.module.scss';
import { useLoginDrawer } from './hooks/useLoginDrawer';

export function LoginDrawer() {
  const {
    isOpen,
    isAuthenticated,
    user,
    formValues,
    fieldErrors,
    handleCloseDrawer,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleLogout,
  } = useLoginDrawer();

  return (
    <Drawer
      isOpen={isOpen}
      title="Entrar na conta"
      onClose={handleCloseDrawer}
      ariaLabel="Login lateral"
    >
      {isAuthenticated ? (
        <div className={styles.wrapper}>
          <div className={styles.loggedState}>
            <div className={styles.loggedCard}>
              <p className={styles.loggedTitle}>Voce ja esta conectado</p>
              <p className={styles.loggedEmail}>{user?.email}</p>
            </div>

            <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
              Sair da conta
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div>
            <p className={styles.description}>
              Faca login para adicionar itens ao carrinho e finalizar sua compra.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-email">
                E-mail
              </label>
              <input
                id="login-email"
                className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`.trim()}
                type="email"
                value={formValues.email}
                onChange={handleEmailChange}
                placeholder="voce@exemplo.com"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
              />
              {fieldErrors.email ? (
                <p id="login-email-error" className={styles.errorMessage}>
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-password">
                Senha
              </label>
              <input
                id="login-password"
                className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`.trim()}
                type="password"
                value={formValues.password}
                onChange={handlePasswordChange}
                placeholder="Minimo de 6 caracteres"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
              />
              {fieldErrors.password ? (
                <p id="login-password-error" className={styles.errorMessage}>
                  {fieldErrors.password}
                </p>
              ) : null}
            </div>

            <button type="submit" className={styles.primaryButton}>
              Entrar
            </button>
          </form>
        </div>
      )}
    </Drawer>
  );
}
