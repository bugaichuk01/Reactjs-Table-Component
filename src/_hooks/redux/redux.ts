import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../store/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;