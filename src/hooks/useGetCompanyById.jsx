import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    const fetchSingleCompany = useCallback(async () => {
        if (!companyId) return; // ✅ Prevents API call if companyId is missing

        try {
            console.log(`Fetching company with ID: ${companyId}`);
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
            } else {
                console.warn("API request was successful but returned false status.");
            }
        } catch (error) {
            console.error("Error fetching company:", error.response?.data || error.message);
        }
    }, [companyId, dispatch]);

    useEffect(() => {
        fetchSingleCompany();
    }, [fetchSingleCompany]);
};

export default useGetCompanyById;
