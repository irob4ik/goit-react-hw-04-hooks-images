import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {

    const handleBackDropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    useEffect(() => {
        function handleKeyDown (e)  {
            if (e.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [onClose])

    return createPortal(
        <div className={styles.Overlay} onClick={handleBackDropClick}>
            <div className={styles.Modal}>                    
                {children}
            </div>
        </div>, modalRoot
    );
}