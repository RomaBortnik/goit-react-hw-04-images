import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'services/pixabay-api';
import Button from './Button';
import Loader from './Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    getImages(query, pageNumber);
  }, [query, pageNumber]);

  const getImages = async (query, pageNumber) => {
    try {
      setIsLoading(true);
      const data = await fetchImages(query, pageNumber);
      if (data.hits.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setImages(prevValue => [...prevValue, ...data.hits]);
        setImagesPerPage(data.hits.length);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      if (pageNumber !== 1) {
        setTimeout(() => {
          window.scrollBy({
            top: window.innerHeight - 158,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  };

  const handleSubmit = value => {
    if (value.trim() === query.trim()) {
      toast.error('Sorry, you entered a previous query. Please try again.');
    } else {
      setQuery(value);
      setImages([]);
      setImagesPerPage(0);
      setPageNumber(1);
      setIsLoading(false);
      setError(null);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader></Loader>}
      {images.length !== 0 && <ImageGallery images={images}></ImageGallery>}
      {imagesPerPage === 12 ? (
        <Button onClick={() => setPageNumber(prevValue => prevValue + 1)} />
      ) : null}
      {error && <p>{error}</p>}
      <ToastContainer autoClose={2000} theme="dark"></ToastContainer>
    </>
  );
};
