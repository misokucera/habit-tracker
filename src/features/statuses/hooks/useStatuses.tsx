import { useContext } from "react";
import { StatusesContext } from "../contexts/StatusesContexts";

export const useStatuses = () => useContext(StatusesContext);
