import axios from "axios";

const APIKEY = "43744683-70462b6a1c14a36a278ebbb0d";

export const fetchImageWithQuery = async (query, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${APIKEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`,
  );

  return { images: response.data.hits, total: response.data.totalHits };
};

const api = { fetchImageWithQuery };

export default api;
