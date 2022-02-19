import { useState, useEffect } from "react";
import axios from "axios";
//https://api.github.com/search/users?q=type:user&per_page=20&page=2
export const useUserList = (pageNum = 1) => {
  const [state, setState] = useState({
    userData: [],
    totalCountisMore: false,
    isLoading: false,
  });
  console.log(pageNum, "pageNum");
  const { userData, totalCountisMore, isLoading } = state;
  useEffect(() => {
    setState((prevState) => {
      return { ...prevState, isLoading: true };
    });
    axios
      .get(
        `https://api.github.com/search/users?q=type:user&per_page=20&page=${pageNum}`
      )
      .then(({ data: { items, total_count } } = {}) => {
        setState((prevState) => {
          return {
            ...prevState,
            userData: [...prevState?.userData, ...items],
            isLoading: false,
            totalCountisMore: items.length > 0,
          };
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return false;
      });
  }, [pageNum]);

  return { userData, totalCountisMore, isLoading };
};
