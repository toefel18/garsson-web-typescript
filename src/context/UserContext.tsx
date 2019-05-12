import {createContext} from "react";
import {User} from "../model/User";

const UserContext = createContext<User | undefined>(undefined)

export default UserContext