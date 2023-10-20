import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState("")
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0])

  const [toasts, setToasts] = React.useState([]);

  const addToast = (event) => {
    event.preventDefault();

    const newToast = {
      message,
      variant,
      id: Math.random(),
    };

    const newToasts = [...toasts, newToast];

    setToasts(newToasts);


    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  };

  const closeToast = (id) => {
    const updatedToasts = toasts.filter((toast) => {
      return toast.id !== id
    })

    setToasts(updatedToasts)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} closeToast={closeToast} />

      <form className={styles.controlsWrapper} onSubmit={(e) => addToast(e)}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(variantType => {
              return (
                  <label htmlFor={`variant-${variantType}`} key={variantType}>
                    <input
                        id={`variant-${variantType}`}
                        type="radio"
                        name="variant"
                        value={variantType}
                        checked={variantType === variant}
                        onChange={(e) => setVariant(e.target.value)}
                    />
                    {variantType}
                </label>
              )})}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
