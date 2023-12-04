import throttle from '@/lib/helpers/throttle';
import { useCallback, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query';


function useInfiniteFetch(key, url, fetchData, getNextPageParam,) {
    const observer = useRef(null);
    const [pageNumber, setPageNumber] = useState(0);

    const fetchQuery = (page, pageParam) => {
        setPageNumber(page)
        const query = pageParam.queryKey[1]
        return fetchData(page, query);
    }

    const query = useInfiniteQuery(
        [key, url],
        ({ pageParam = 1, ...params }) => {
            return fetchQuery(pageParam, params)
        },
        {
            enabled: url.length > 0,
            retry: 3,
            retryDelay: 1000,
            getNextPageParam: (pages) => {
                const has_next_page = getNextPageParam(pages);
                return has_next_page ? parseInt(pageNumber) + 1 : undefined
            }
        }
    )
    const updateFetchNextPage = useCallback(throttle(query.fetchNextPage, 2000), []);
    const observerRef = useCallback((node) => {
        if (!node) return null;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateFetchNextPage();
            }
        })

        if (node) observer.current.observe(node)
    }, [query.fetchNextPage, observer.current])

    return { query, observerRef };
}

export default useInfiniteFetch