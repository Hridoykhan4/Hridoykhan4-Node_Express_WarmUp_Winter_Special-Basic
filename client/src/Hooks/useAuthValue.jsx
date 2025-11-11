import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuthValue = () => {
    return use(AuthContext)
};

export default useAuthValue;