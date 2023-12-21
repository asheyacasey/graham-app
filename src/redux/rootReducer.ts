import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth";
import add from './slices/add'
import category from './slices/categories'
import cart from './slices/cart'
import app from './slices/app'
import seller_account_flow from './slices/seller-account-flow'
import notifications from "./slices/notifications";
import buyer from './slices/buyerslice'
import date from './slices/dateslice'
// slices

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    blacklist: ['add', 'app', "seller_account_flow","notifications", 'buyer', 'date']
};

const rootReducer = combineReducers({
    auth,
    add,
    category,
    cart,
    app,
    seller_account_flow,
    notifications,
    buyer,
    date
});
export { rootReducer, rootPersistConfig };