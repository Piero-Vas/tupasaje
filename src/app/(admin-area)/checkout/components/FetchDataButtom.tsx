// components/FetchDataButton.js
import { useDispatch } from 'react-redux';
// import { fetchApiData } from '@/redux/services/checkout/boxDetailApi';

const FetchDataButton = () => {
  const dispatch = useDispatch();

  const handleApiCall = () => {
    // dispatch(fetchApiData);;
  };

  return (
    <button onClick={handleApiCall}>Llamar a la API</button>
  );
};

export default FetchDataButton;
