import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                console.log('Fetching companies...');
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,  // ✅ Ensures cookies are sent
                });

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Error fetching companies:", error.response?.data || error);
            }
        };

        fetchCompanies();
    }, [dispatch]);  // ✅ Ensures correct dependency management
};

export default useGetAllCompanies;
