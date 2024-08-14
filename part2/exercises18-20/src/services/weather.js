import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const getAll = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=en`
  );
  return request.then((response) => response.data);
};

export default { getAll };
