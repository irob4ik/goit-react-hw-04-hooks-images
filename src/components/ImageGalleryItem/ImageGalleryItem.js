import React, { useEffect } from 'react';

import styles from './imageGalleryItem.module.css';

export default function ImageGalleryItem({ hits, onClick }) {
    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }, [hits])

    return (
        hits.map(({ id, tags, webformatURL, largeImageURL }) => (
            <li className={styles.ImageGalleryItem} key={id} >
                <img
                    onClick={onClick}
                    src={webformatURL}
                    lowsrc={largeImageURL}
                    alt={tags}
                    className={styles.ImageGalleryItem_image} />
            </li>
        ))
    );
}