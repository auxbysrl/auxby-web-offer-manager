import { useDispatch, useSelector } from "react-redux";
import appReducers from './redux/reducers';

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: appReducers,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;
