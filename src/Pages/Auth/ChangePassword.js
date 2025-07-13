import React, { useState } from 'react';
import { FaLock, FaSave } from 'react-icons/fa';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

const ChangePassword = () => {
    // حالات الحقول
    const [fields, setFields] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    // أخطاء الحقول (مستقبلاً)
    const [errors, setErrors] = useState({});

    // دالة لتغيير الحقول
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    // دالة إرسال النموذج (مستقبلاً)
    const handleSubmit = (e) => {
        e.preventDefault();
        // تحقق من صحة الحقول وأرسل الطلب هنا
    };

    return (
        <form className="space-y-5 font-tajawal" onSubmit={handleSubmit}>
            {/* حقل كلمة المرور القديمة */}
            <InputField
                name="old_password"
                placeholder="كلمة المرور الحالية"
                Icon={FaLock}
                type="password"
                value={fields.old_password}
                onChange={handleChange}
                error={errors.old_password}
            />
            {/* حقل كلمة المرور الجديدة */}
            <InputField
                name="new_password"
                placeholder="كلمة المرور الجديدة"
                Icon={FaLock}
                type="password"
                value={fields.new_password}
                onChange={handleChange}
                error={errors.new_password}
            />
            {/* تأكيد كلمة المرور الجديدة */}
            <InputField
                name="confirm_password"
                placeholder="تأكيد كلمة المرور الجديدة"
                Icon={FaLock}
                type="password"
                value={fields.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
            />
            {/* زر الحفظ */}
            <div className="flex justify-center mt-6">
                <Button type="submit" Icon={FaSave} className="w-auto px-8 py-2 text-lg font-normal">
                    حفظ كلمة المرور
                </Button>
            </div>
        </form>
    );
}

export default ChangePassword;
