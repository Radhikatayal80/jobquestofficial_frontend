import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    const fetchAppliedJobs = useCallback(async () => {
        try {
            console.log("Fetching applied jobs...");
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });

            if (res.data.success) {
                dispatch(setAllAppliedJobs(res.data.application));
            } else {
                console.warn("API request was successful but returned false status.");
            }
        } catch (error) {
            console.error("Error fetching applied jobs:", error.response?.data || error.message);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchAppliedJobs();
    }, [fetchAppliedJobs]);
};

export default useGetAppliedJobs;
