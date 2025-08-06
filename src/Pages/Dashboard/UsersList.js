import React, { useState } from 'react';
import Button from '../../Components/Button';
import { FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import userImg from '../../Assets/images/user.png';
import { translateRole } from '../../Utils/roleTranslator';

const statusStyles = {
  active: 'bg-green-100 text-main1',
  inactive: 'bg-red-100 text-accent',
};

const filters = [
  { label: 'الكل', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'غير نشط', value: 'inactive' },
  { label: 'مدير عام', value: 'super_admin' },
  { label: 'تاجر', value: 'merchant' },
];

const dummyUsers = [
  {
    firstName: 'محمد',
    lastName: 'العلي',
    phone: '0599123456',
    status: 'active',
    createdAt: '2024-06-01',
    role: 'super_admin',
    referrer: 'أحمد يوسف',
    img: userImg,
  },
  {
    firstName: 'سارة',
    lastName: 'خالد',
    phone: '0599988776',
    status: 'inactive',
    createdAt: '2024-05-20',
    role: 'merchant',
    referrer: 'محمد العلي',
    img: userImg,
  },
  {
    firstName: 'أحمد',
    lastName: 'يوسف',
    phone: '0599112233',
    status: 'active',
    createdAt: '2024-04-15',
    role: 'admin',
    referrer: '-',
    img: userImg,
  },
  {
    firstName: 'ليلى',
    lastName: 'سالم',
    phone: '0599001122',
    status: 'inactive',
    createdAt: '2024-03-10',
    role: 'merchant',
    referrer: 'سارة خالد',
    img: userImg,
  },
  {
    firstName: 'خالد',
    lastName: 'سعيد',
    phone: '0599345678',
    status: 'active',
    createdAt: '2024-02-28',
    role: 'super_admin',
    referrer: '-',
    img: userImg,
  },
];

const UsersList = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nameFilter, setNameFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // تصفية البيانات حسب الفلاتر والبحث
  const filteredUsers = dummyUsers.filter(user => {
    // فلترة حسب الفلتر الرئيسي
    let matchesMainFilter = true;
    if (selectedFilter === 'active' || selectedFilter === 'inactive') {
      matchesMainFilter = user.status === selectedFilter;
    } else if (selectedFilter === 'super_admin' || selectedFilter === 'merchant') {
      matchesMainFilter = user.role === selectedFilter;
    }
    // فلترة حسب الاسم
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesName = nameFilter.trim() === '' || fullName.includes(nameFilter.trim().toLowerCase());
    // فلترة حسب رقم الهاتف
    const matchesPhone = phoneFilter.trim() === '' || user.phone.includes(phoneFilter.trim());
    // فلترة حسب البحث العام
    const searchVal = search.trim().toLowerCase();
    const matchesSearch =
      searchVal === '' ||
      fullName.includes(searchVal) ||
      user.phone.includes(searchVal) ||
      (user.role && translateRole(user.role).includes(searchVal)) ||
      (user.referrer && user.referrer.toLowerCase().includes(searchVal));
    return matchesMainFilter && matchesName && matchesPhone && matchesSearch;
  });

  return (
    <div className="p-6 bg-light min-h-screen font-tajawal">
      {/* العنوان وعدد المستخدمين */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-main1">المستخدمون</h2>
          <span className="text-gray-500 text-sm">إجمالي المستخدمين <b className="text-main2">{dummyUsers.length}</b></span>
        </div>
        {/* حقل البحث العام */}
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عام..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main1 font-tajawal"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-main1" />
          </div>
        </div>
      </div>

      {/* الفلاتر وحقول الفلترة */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-150
                ${selectedFilter === f.value ? 'bg-main1 text-light border-main1' : 'bg-grayish text-main1 border-gray-200 hover:bg-main1/10'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <input
              type="text"
              placeholder="فلترة بالاسم..."
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main2 font-tajawal"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-main2" />
          </div>
          <div className="relative w-full md:w-48">
            <input
              type="text"
              placeholder="فلترة برقم الهاتف..."
              value={phoneFilter}
              onChange={e => setPhoneFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main2 font-tajawal"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-main2" />
          </div>
        </div>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto rounded-2xl shadow-md bg-transparent">
        <table className="min-w-full text-sm text-main1 font-tajawal">
          <thead>
            <tr className="bg-grayish text-main1">
              <th className="p-4 text-center text"><input type="checkbox" /></th>
              <th className="p-4 text-right">الاسم</th>
              <th className="p-4 text-right">الكنية</th>
              <th className="p-4 text-center">رقم الهاتف</th>
              <th className="p-4 text-center">حالة الحساب</th>
              <th className="p-4 text-center">تاريخ الإنشاء</th>
              <th className="p-4 text-center">الدور</th>
              <th className="p-4 text-center">المحيل</th>
              <th className="p-4 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-400">لا يوجد مستخدمون مطابقون</td>
              </tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-b last:border-b-0 hover:bg-grayish/60 transition">
                  <td className="p-4 text-center"><input type="checkbox" /></td>
                  <td className="p-4 flex items-center gap-3">
                    <img src={user.img} alt={user.firstName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                    <span className="font-bold text-main1">{user.firstName}</span>
                  </td>
                  <td className="p-4 text-main1">{user.lastName}</td>
                  <td className="p-4 text-center">{user.phone}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[user.status] || 'bg-gray-100 text-gray-500'}`}>{
                      user.status === 'active' ? 'نشط' :
                      user.status === 'inactive' ? 'غير نشط' : user.status
                    }</span>
                  </td>
                  <td className="p-4 text-center">{user.createdAt}</td>
                  <td className="p-4 text-center">{translateRole(user.role)}</td>
                  <td className="p-4 text-center">{user.referrer}</td>
                  <td className="p-4 text-center flex items-center gap-2 justify-center">
                    <button className="p-2 rounded-lg hover:bg-main2/10 text-main2 transition"><FaEdit /></button>
                    <button className="p-2 rounded-lg hover:bg-accent/10 text-accent transition"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* التصفح */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">عرض {filteredUsers.length} من {dummyUsers.length} مستخدم</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-2 rounded-3xl border border-gray-200 text-main1 disabled:opacity-50" disabled={page === 1}><FaChevronRight /></button>
          <span className="px-3 py-1 rounded-3xl bg-main1 text-light font-bold">{page}</span>
          <button onClick={() => setPage(p => p + 1)} className="p-2 rounded-3xl border border-gray-200 text-main1"><FaChevronLeft /></button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;