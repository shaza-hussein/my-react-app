import React from 'react';
import { FaLock } from 'react-icons/fa';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import Alert from '../../Components/Alert';
import { useChangePassword } from '../../Hooks';
import Loading from '../../Components/Loading';

const ChangePassword = () => {
    const {
        fields,
        errors,
        loading,
        success,
        error,
        handleChange,
        handleSubmit,
        clearError,
        clearSuccess
    } = useChangePassword();

    return (
        <form className="space-y-5 font-tajawal" onSubmit={handleSubmit}>
            {error && <Alert type="error" onClose={clearError}>{error}</Alert>}
            {success && <Alert type="success" onClose={clearSuccess}>{success}</Alert>}
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
                <Button type="submit"  className="w-auto px-8 py-2 text-lg font-normal" disabled={loading}>
                    {loading ? <Loading type="dots" size="sm" text="جاري الحفظ..." color="light" /> : 'حفظ كلمة المرور'}
                </Button>
            </div>
        </form>
    );
}

export default ChangePassword;
