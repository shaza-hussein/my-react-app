import { useState, useEffect } from 'react';
import { getUserProfile } from '../API/ProtectedAuth';
import { handleApiError } from '../Utils/errorHandler';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 جاري جلب بيانات الملف الشخصي...');
      const data = await getUserProfile();
      
      console.log('✅ تم جلب بيانات الملف الشخصي بنجاح:', data);
      setProfile(data);
    } catch (err) {
      console.log('❌ خطأ في جلب بيانات الملف الشخصي:', err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = () => {
    fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    refreshProfile
  };
};

export default useProfile; 