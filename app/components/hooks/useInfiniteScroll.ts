import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void, isLoading: boolean) {
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !isLoading
      ) {
        callback();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback, isLoading]);
}