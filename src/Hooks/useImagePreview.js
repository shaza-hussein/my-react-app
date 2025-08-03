import { useState, useRef } from 'react';

const useImagePreview = (defaultImg) => {
    const [imagePreview, setImagePreview] = useState(defaultImg);
    const fileInputRef = useRef(null);

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

    // دالة لحذف الصورة (إرجاعها للصورة الافتراضية)
    const handleRemoveImage = () => {
        setImagePreview(defaultImg);
    };

    return {
        imagePreview,
        setImagePreview,
        fileInputRef,
        handleImageClick,
        handleImageChange,
        handleRemoveImage
    };
};

export default useImagePreview;