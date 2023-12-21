import { combineReducers } from "redux";
import LangSlice from "./LangSlice";
const rootReducer = combineReducers({
  lang: LangSlice,
});

export default rootReducer;
