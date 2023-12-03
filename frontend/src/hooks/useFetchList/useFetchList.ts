import { useState, useEffect, useCallback } from "react";

interface Props {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: BodyInit;
    headers?: HeadersInit; 
}

const useFetchList = <T>({url, method, body, headers}: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);

    const fetchData = useCallback(
        async () => {
            setLoading(true);
            const requestHeaders: HeadersInit = {
                ...(headers || {}),
            };

            const request = {
                method: method,
                headers: requestHeaders, 
                ...(body && {body: body}),
            };
            
            try {
                const fetching = await fetch(url, request);
    
                if (!fetching.ok) {
                    throw new Error(`HTTP Error! Status: ${fetching.status}`);
                }

                const response = await fetching.json();
                setData(response.data);
                setLoading(false);
    
                return response;
            } catch (error) {

                console.error('Error fetching data:', error);
                setLoading(false);
                throw error;
            }
        },
        [body, method, url, headers] 
    );

    useEffect(
        () => {
            fetchData();
        },
        [fetchData]
    );

    return {
        isLoading,
        data
    };
}

export default useFetchList;
