import styles from '../CartDrawer.module.scss';

type CartSuccessStepProps = {
  onClose: () => void;
};

export function CartSuccessStep({ onClose }: CartSuccessStepProps) {
  return (
    <div className={styles.successState}>
      <p className={styles.successTitle}>Compra finalizada com sucesso</p>
      <p className={styles.successDescription}>
        Seu pedido foi concluído e os itens do carrinho foram processados.
      </p>
      <button type="button" className={styles.finishButton} onClick={onClose}>
        Compra Finalizada!
      </button>
    </div>
  );
}
