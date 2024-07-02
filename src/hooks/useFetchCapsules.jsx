import { useEffect, useState } from "react";
import { axiosReq } from '../api/axiosDefaults';
import { useLocation } from "react-router-dom";

const useFetchCapsules = () => {
    const { pathname } = useLocation();
    const [capsules, setCapsules] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const { data } = await axiosReq.get('/capsules/');
                setCapsules(data);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };
        setLoaded(false);
        fetchCapsules();
        // If the pathname changes, fetch the listings again.
    }
        , [pathname]);

    return { capsules, setCapsules, loaded, pathname };
}

export default useFetchCapsules