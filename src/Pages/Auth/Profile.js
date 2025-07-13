import React, { useState } from 'react';
import { FaCamera, FaEdit, FaUser, FaUserFriends, FaUserTag, FaRegCalendarAlt, FaPhone, FaCrown, FaCalendarPlus, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import useProfile from '../../Hooks/useProfile';
import Alert from '../../Components/Alert';
import Modal from '../../Components/Modal';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import { translateRole, formatDate, formatValue, formatFullName } from '../../Utils';
import userImg from '../../Assets/images/user.png';

const Profile = () => {
  const { profile, loading, error, refreshProfile } = useProfile();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  // صف معلومة شخصية مع أيقونة واسم الحقل بجانب بعض والقيمة أسفلهم (أصغر)
  const InfoRow = ({ icon, label, value }) => (
    <div className="flex flex-col items-center justify-center bg-grayish rounded-lg px-1 py-0.5 mb-1 shadow-sm min-h-[50px]">
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-main1 text-xs">{icon}</span>
        <span className="text-main1 text-[12px] font-bold font-tajawal text-center">{label}</span>
      </div>
      <span className="font-bold text-gray-500 text-xs break-all font-tajawal text-center">{formatValue(value)}</span>
    </div>
  );

  // صف معلومة العنوان مع أيقونة واسم الحقل بجانب بعض والقيمة أسفلهم
  const AddressInfoRow = ({ icon, label, value }) => (
    <div className="flex flex-col items-center justify-center bg-grayish rounded-lg px-1 py-0.5 mb-1 shadow-sm min-h-[50px]">
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-main1 text-xs">{icon}</span>
        <span className="text-main1 text-[12px] font-bold font-tajawal text-center">{label}</span>
      </div>
      <span className="font-bold text-gray-500 text-xs break-all font-tajawal text-center">{formatValue(value)}</span>
    </div>
  );

  // حالة التحميل
  if (loading) {
    return (
      <div className="p-2 md:p-4 bg-light min-h-screen direction-rtl flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-main1 text-2xl mx-auto mb-4" />
          <p className="text-main1 font-tajawal">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="p-2 md:p-4 bg-light min-h-screen direction-rtl">
        <Alert 
          type="error" 
          message={error}
          onRetry={refreshProfile}
        />
      </div>
    );
  }

  // إذا لم توجد بيانات الملف الشخصي
  if (!profile) {
    return (
      <div className="p-2 md:p-4 bg-light min-h-screen direction-rtl">
        <Alert 
          type="warning" 
          message="لم يتم العثور على بيانات الملف الشخصي"
          onRetry={refreshProfile}
        />
      </div>
    );
  }

  // طباعة بيانات الملف الشخصي للتشخيص
  console.log('📊 بيانات الملف الشخصي:', profile);
  console.log('📊 father_name:', profile.father_name, 'نوع:', typeof profile.father_name);

  return (
    <div className="p-2 md:p-4 bg-light min-h-screen direction-rtl">
      {/* رأس الصفحة */}
      <h1 className="text-lg font-bold text-main1 mb-4 font-tajawal">الملف الشخصي</h1>

      {/* بطاقة الملف الشخصي */}
      <div className="bg-light rounded-2xl shadow flex flex-col md:flex-row items-center gap-4 p-4 mb-6">
        {/* صورة المستخدم */}
        <div className="relative w-20 h-20 min-w-[5rem]">
          <img
            src={profile.profile_image || userImg}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-2 border-main1 shadow"
          />
          <button className="absolute bottom-1 left-1 bg-main1 text-light p-1.5 rounded-full shadow transition">
            <FaCamera size={13} />
          </button>
        </div>
        {/* بيانات المستخدم */}
        <div className="flex-1 text-center md:text-right">
          <div className="text-base font-bold text-main1 font-tajawal">
            {formatFullName(profile.first_name, profile.last_name)}
          </div>
          <div className="text-gray-500 font-tajawal mt-0.5 text-sm">{translateRole(profile.role)}</div>
        </div>
      </div>

      {/* معلومات شخصية */}
      <div className="bg-light rounded-2xl shadow p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-main1 font-tajawal">المعلومات الشخصية</h2>
          <button 
            onClick={() => setIsUpdateModalOpen(true)}
            className="flex items-center gap-2 bg-main1 text-light px-2 py-2 rounded-lg text-sm hover:bg-main1/90 transition"
          >
            <FaEdit size={12} />
            تعديل
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 font-tajawal">
          <InfoRow icon={<FaUser />} label="الاسم الأول" value={profile.first_name} />
          <InfoRow icon={<FaUserFriends />} label="اسم الأب" value={profile.father_name} />
          <InfoRow icon={<FaUserTag />} label="الكنية" value={profile.last_name} />
          <InfoRow icon={<FaPhone />} label="رقم الموبايل" value={profile.phone_number} />
          <InfoRow icon={<FaCrown />} label="الدور" value={translateRole(profile.role)} />
          <InfoRow icon={<FaRegCalendarAlt />} label="معرف المستخدم " value={profile.id} />
        </div>
      </div>

      {/* العنوان */}
      <div className="bg-light rounded-2xl shadow p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-main1 font-tajawal">معلومات الحساب</h2>
          <button 
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="flex items-center gap-2 bg-main1 text-light px-2 py-2 rounded-lg text-sm hover:bg-main1/90 transition">
            <FaEdit size={12} />
            اعدادات كلمة المرور
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 font-tajawal">
          <AddressInfoRow icon={<FaCalendarPlus />} label="تاريخ الانشاء" value={formatDate(profile.created_at)} />
          <AddressInfoRow 
            icon={<FaCheckCircle />} 
            label="حالة الحساب" 
            value={
              <span className={profile.is_active ? 'text-green-600' : 'text-red-600'}>
                {profile.is_active ? 'نشط' : 'معطل'}
              </span>
            } 
          />
        </div>
      </div>

      {/* نافذة تحديث الملف الشخصي */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="تحديث الملف الشخصي"
        size="md"
      >
        <UpdateProfile />
      </Modal>
      {/* نافذة تغيير كلمة المرور */}
      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        title="تغيير كلمة المرور"
        size="sm"
      >
        <ChangePassword />
      </Modal>
    </div>
  );
};

export default Profile;