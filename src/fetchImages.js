import axios from "axios";

async function fetchImages(searchQuery, page = 1, imgPerPage = 40) {

const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32979410-6576ce951400b06dd5e7c6a2c';
  
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${imgPerPage}`);
    console.log(response.data)
    return response.data;
}

export { fetchImages };
