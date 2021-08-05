import React, { useEffect, useState, useRef } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import SearchApi from './services/SearchApi';

import styles from './app.module.css'

export default function App() {
  const [search, setSearch] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState('init');
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  const handleInputSubmit = (input) => {
    setSearch(input);
    setLoaderStatus('init');
    setPage(1);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setLoaderStatus('loadMore');
  }

  const toggleModal = (e) => {
    if (e) {
      setLargeImg(e.target.lowsrc);
    }
    
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);

    if (page === 1) {
      setGallery([]);      
    }

    SearchApi(search,page)
      .then(data => {
        if (page !== 1) {
          setGallery(prevState => {
            const newData = [...prevState, ...data.hits]
            return newData;
          });
        }

        if (page === 1) {
          if (data.hits.length === 0) {
            setGallery(data.hits);
            setLoaderStatus('nothingFound');
            return;
          }

          setGallery(data.hits);
          setLoaderStatus('init');
        }          
      })
      .catch(newError => {
        setError(newError);

        if (error) {
          console.log(error);
        }
      })
      .finally(() => setLoading(false))

  }, [search, page, error]);

  return (
    <div className={styles.App}>

      <Searchbar inputSubmit={handleInputSubmit} />

      {loading && loaderStatus === 'init' && <Loader />}
      
      {gallery.length > 1 && <ImageGallery
        gallery = {gallery}
        loadMore = {handleLoadMore}
        showModal={toggleModal} />}
      
      {loaderStatus === 'nothingFound' && search !== null &&
        <h1>Nothing found.... Try again</h1>}
      
      {showModal && <Modal onClose={toggleModal}>
        <img src={largeImg} alt="" />
      </Modal>}
      
    </div>
  );
}