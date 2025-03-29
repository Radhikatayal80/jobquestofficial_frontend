import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/getadminjobs`,
                    { withCredentials: true }  // ✅ Ensures cookies are sent
                );
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching admin jobs:", error.response?.data || error);
            }
        };

        fetchAllAdminJobs();
    }, []);  // ✅ Runs only once

    return null; // ✅ Explicit return (optional, ensures consistency)
};

export default useGetAllAdminJobs;
