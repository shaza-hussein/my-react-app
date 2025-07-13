import React, { useRef, useState, useEffect } from 'react';
import { FaUser, FaCamera, FaSave, FaTimes } from 'react-icons/fa';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import Alert from '../../Components/Alert';
import { useUpdateProfile, useProfile } from '../../Hooks';
import { validateRegisterForm } from '../../Utils/validateForm';

const defaultImg = require('../../Assets/images/user.png');

const UpdateProfile = () => {
    // مرجع لحقل رفع الصورة
    const fileInputRef = useRef(null);
    // جلب بيانات البروفايل الحالية
    const { profile, loading: loadingProfile, error: errorProfile, refreshProfile } = useProfile();
    // حالة لتخزين الصورة المختارة مؤقتاً
    const [imagePreview, setImagePreview] = useState(defaultImg);
    // حالات الحقول
    const [fields, setFields] = useState({
        first_name: '',
        father_name: '',
        last_name: ''
    });
    // أخطاء الحقول
    const [errors, setErrors] = useState({});

    // هوك تحديث البروفايل
    const {
        updateProfile,
        loading,
        error,
        success,
        clearError,
        clearSuccess
    } = useUpdateProfile();

    // عند تحميل بيانات البروفايل، املأ الحقول تلقائياً
    useEffect(() => {
        if (profile) {
            setFields({
                first_name: profile.first_name || '',
                father_name: profile.father_name || '',
                last_name: profile.last_name || ''
            });
            // إذا أردت جلب صورة من البروفايل مستقبلاً أضفها هنا
        }
    }, [profile]);

    // دالة لفتح نافذة اختيار الصورة
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // دالة عند اختيار صورة جديدة
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // دالة لتغيير الحقول
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
        // مسح الخطأ عند التغيير
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    // دالة لحذف الصورة (إرجاعها للصورة الافتراضية)
    const handleRemoveImage = () => {
        setImagePreview(defaultImg);
    };

    // دالة إرسال النموذج
    const handleSubmit = async (e) => {
        e.preventDefault();
        // تحقق من صحة الحقول
        const validationErrors = validateRegisterForm(fields);
        // نريد فقط التحقق من الاسم الأول واسم الأب والكنية
        delete validationErrors.phone_number;
        delete validationErrors.password;
        delete validationErrors.password_confirmation;
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        // إرسال فقط الحقول النصية (الصورة غير مدعومة من الباكند)
        await updateProfile(fields);
    };

    // معالجة حالات التحميل أو الخطأ في جلب البروفايل
    if (loadingProfile) {
        return <div className="text-center py-10 text-main1 font-tajawal">جاري تحميل البيانات...</div>;
    }
    if (errorProfile) {
        return <Alert type="error" onRetry={refreshProfile}>{errorProfile}</Alert>;
    }

    return (
        <div className="direction-rtl bg-light rounded-2xl p-6 max-w-lg mx-auto font-tajawal">
            {/* رسائل الخطأ */}
            {error && <Alert type="error" onClose={clearError}>{error}</Alert>}
            {/* رسائل النجاح */}
            {success && <Alert type="success" onClose={clearSuccess}>{success}</Alert>}

            {/* نموذج تحديث البيانات */}
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* رفع صورة شخصية */}
                <div className="flex flex-col items-center mb-4">
                    <div className="relative w-24 h-24 mb-2">
                        <img
                            src={imagePreview}
                            alt="صورة المستخدم"
                            className="w-24 h-24 rounded-full object-cover border-2 border-main1 shadow"
                        />
                        {/* زر تغيير الصورة */}
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="absolute bottom-1 left-1 bg-main1 text-light p-2 rounded-full shadow  transition"
                            aria-label="تغيير الصورة الشخصية"
                        >
                            <FaCamera size={16} />
                        </button>
                        {/* زر حذف الصورة - يظهر فقط إذا كانت الصورة ليست الافتراضية */}
                        {imagePreview !== defaultImg && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-1 right-1 bg-red-500 text-light p-1 rounded-full shadow hover:bg-red-700 transition"
                                aria-label="حذف الصورة"
                            >
                                <FaTimes size={10} />
                            </button>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* حقول البيانات */}
                <div className="flex flex-col gap-4">
                    <InputField
                        name="first_name"
                        placeholder="الاسم الأول"
                        Icon={FaUser}
                        value={fields.first_name}
                        onChange={handleChange}
                        error={errors.first_name}
                    />
                    <InputField
                        name="father_name"
                        placeholder="اسم الأب"
                        Icon={FaUser}
                        value={fields.father_name}
                        onChange={handleChange}
                        error={errors.father_name}
                    />
                    <InputField
                        name="last_name"
                        placeholder="الكنية"
                        Icon={FaUser}
                        value={fields.last_name}
                        onChange={handleChange}
                        error={errors.last_name}
                    />
                </div>

                {/* زر الحفظ */}
                <div className="flex justify-center mt-6">
                    <Button type="submit" Icon={FaSave} className="w-auto px-8 py-2 text-lg font-normal" disabled={loading}>
                        {loading ? '...جاري التحديث' : 'تحديث'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;