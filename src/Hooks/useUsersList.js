import { useState, useEffect } from 'react';
import { getUsersList } from '../API/ProtectedAuth';
import { handleApiError } from '../Utils/errorHandler';

export default function useUsersList(queryParams = {}) {
  const [data, setData] = useState({ 
    users: [], 
    total: 0, 
    page: 1, 
    pageSize: 20 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getUsersList(queryParams);
        
        setData({
          users: response.results || response.users || [],
          total: response.count || response.total || 0,
          page: response.page || queryParams.page || 1,
          pageSize: response.page_size || response.pageSize || 20
        });
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error('❌ خطأ في جلب قائمة المستخدمين:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [JSON.stringify(queryParams)]);

  return { 
    users: data.users, 
    total: data.total, 
    page: data.page, 
    pageSize: data.pageSize,
    loading, 
    error,
    refetch: () => {
      // إعادة جلب البيانات
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await getUsersList(queryParams);
          
          setData({
            users: response.results || response.users || [],
            total: response.count || response.total || 0,
            page: response.page || queryParams.page || 1,
            pageSize: response.page_size || response.pageSize || 20
          });
        } catch (err) {
          const errorMessage = handleApiError(err);
          setError(errorMessage);
          console.error('❌ خطأ في إعادة جلب قائمة المستخدمين:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUsers();
    }
  };
} 