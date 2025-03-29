import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ${token}` },  // ✅ Include Token
                    }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.response?.data || error);
            }
        };

        if (token) fetchAllJobs();  // ✅ Ensure request is only made if token exists
    }, [searchedQuery, dispatch, token]); // ✅ Depend on token as well

    return null;
};

export default useGetAllJobs;
