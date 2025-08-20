import { useState, useEffect } from 'react';
import { getUsersList } from '../API/ProtectedAuth';
import { handleApiError } from '../Utils/errorHandler';

export default function useUsersList(queryParams = {}) {
  const [data, setData] = useState({ 
    users: [], 
    total: 0, 
    page: 1, 
    pageSize: 20,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { users, total, next, previous } = await getUsersList(queryParams);
        
        setData({
          users,
          total,
          page: queryParams.page ?? 1,
          pageSize: queryParams.pageSize ?? 20,
          next,
          previous,
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
  }, [queryParams]);

  return { 
    users: data.users, 
    total: data.total, 
    page: data.page, 
    pageSize: data.pageSize,
    next: data.next,
    previous: data.previous,
    loading, 
    error,
    refetch: () => {
      // إعادة جلب البيانات
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const { users, total, next, previous } = await getUsersList(queryParams);
          
          setData({
            users,
            total,
            page: queryParams.page ?? 1,
            pageSize: queryParams.pageSize ?? 20,
            next,
            previous,
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