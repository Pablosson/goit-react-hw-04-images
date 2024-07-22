import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import api from "../services/api";
import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import Button from "./button/Button";
import Loader from "./loader/Loader";
import Modal from "./modal/Modal";
import OnError from "./onError/OnError";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [actualPage, setActualPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    modalPhotoURL: null,
    modalAlt: null,
  });

  const updateQuery = useCallback(({ query }) => {
    setQuery(query);
  }, []);

  const mapNewImages = (fetchedImages) => {
    return fetchedImages.map((image) => ({
      id: image.id,
      small: image.webformatURL,
      large: image.largeImageURL,
      alt: image.tags,
    }));
  };

  const goToNextPage = () => {
    setActualPage((prevPage) => prevPage + 1);
  };

  const openModal = (e) => {
    setModalInfo({
      modalPhotoURL: e.target.dataset["source"],
      modalAlt: e.target.alt,
    });
    setModalIsOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.nodeName !== "IMG") {
      setModalIsOpen(false);
    }
  };

  const closeModalWithButton = useCallback((e) => {
    if (e.key === "Escape") {
      setModalIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await api.fetchImageWithQuery(query, 1);
        const mapedImages = mapNewImages(fetchedData.images);
        const lastPage = Math.ceil(fetchedData.total / 12);
        setImages(mapedImages);
        setActualPage(1);
        setLastPage(lastPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await api.fetchImageWithQuery(query, actualPage);
        const mapedImages = mapNewImages(fetchedData.images);
        setImages((prevImages) => [...prevImages, ...mapedImages]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (actualPage > 1) {
      fetchData();
    }
  }, [actualPage, query]);

  useEffect(() => {
    window.addEventListener("keydown", closeModalWithButton);
    return () => {
      window.removeEventListener("keydown", closeModalWithButton);
    };
  }, [closeModalWithButton]);

  return (
    <>
      {modalIsOpen && (
        <Modal
          imgSrc={modalInfo.modalPhotoURL}
          imgAlt={modalInfo.modalAlt}
          closeHandler={closeModal}
          escHandler={closeModalWithButton}
        />
      )}
      <Searchbar onSubmit={updateQuery} />
      <ImageGallery
        images={images}
        page={actualPage}
        clickHandler={openModal}
      />
      {actualPage !== lastPage && images.length > 0 && !isLoading ? (
        <Button onClick={goToNextPage} />
      ) : null}
      {isLoading && <Loader />}
      {images.length === 0 && query && !isLoading && (
        <OnError>Nothing found! Try again</OnError>
      )}
    </>
  );
};

export default App;
