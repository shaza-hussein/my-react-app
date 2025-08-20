import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight, FaBolt } from 'react-icons/fa';
import SortableHeaderCell from '../../Components/SortableHeaderCell';
// import userImg from '../../Assets/images/user.png';
import { translateRole } from '../../Utils/roleTranslator';
import { useUsersList } from '../../Hooks';
import { ListLoading } from '../../Components/Loading';
import Alert from '../../Components/Alert';
import { formatDateOnly } from '../../Utils/dateFormatter';



const filters = [
  { label: 'الكل', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'غير نشط', value: 'inactive' },
  { label: 'مدير عام', value: 'super_admin' },
  { label: 'تاجر', value: 'merchant' },
];





const UsersList = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nameFilter, setNameFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState('-created_at'); // الترتيب الافتراضي: الأحدث أولاً
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [appliedPhone, setAppliedPhone] = useState('');



  // دالة للترتيب
  const handleSort = (field, direction = 'asc') => {
    if (direction === 'asc') {
      setOrdering(field); // ترتيب تصاعدي
    } else {
      setOrdering(`-${field}`); // ترتيب تنازلي
    }
  };

  // تطبيق البحث/الفلاتر عند الضغط على زر "بحث" أو Enter
  const handleApplyFilters = () => {
    setAppliedSearch(search.trim());
    setAppliedName(nameFilter.trim());
    setAppliedPhone(phoneFilter.trim());
    setPage(1);
  };

  const handleKeyDownApply = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  // بناء معاملات الطلب (باستخدام useMemo لتثبيت المرجع وتقليل عمليات الجلب غير الضرورية)
  const queryParams = useMemo(() => ({
    page,
    search: appliedSearch || undefined,
    name: appliedName || undefined,
    phone: appliedPhone || undefined,
    is_active: selectedFilter === 'active' ? true : selectedFilter === 'inactive' ? false : undefined,
    role: (selectedFilter === 'super_admin' || selectedFilter === 'merchant') ? selectedFilter : undefined,
    ordering
  }), [page, appliedSearch, appliedName, appliedPhone, selectedFilter, ordering]);

  // جلب البيانات باستخدام الـ hook
  const { users, total, loading, error, next, previous, refetch } = useUsersList(queryParams);
  // sub-pagination inside 20-per-page API page
  const visiblePerPage = 5;
  const totalSubPages = Math.max(1, Math.ceil(users.length / visiblePerPage));
  const [subPage, setSubPage] = React.useState(1);
  const startIdx = (subPage - 1) * visiblePerPage;
  const endIdx = startIdx + visiblePerPage;
  const visibleUsers = users.slice(startIdx, endIdx);

  // عرض رسالة الخطأ إذا وجدت
  if (error) {
    return (
      <div className="p-6 bg-light min-h-screen font-tajawal">
        <Alert 
          type="error" 
          message={error}
          onClose={() => refetch()}
        />
      </div>
    );
  }

  // عرض التحميل للصفحة كاملة إذا كان التحميل الأولي
  if (loading && users.length === 0) {
    return (
      <div className="p-6 bg-light min-h-screen font-tajawal">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-main1">المستخدمون</h2>
          <span className="text-gray-500 text-sm">جاري تحميل البيانات...</span>
        </div>
        <ListLoading count={5} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-light min-h-screen font-tajawal">
      {/* العنوان وعدد المستخدمين */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-main1">المستخدمون</h2>
          <span className="text-gray-500 text-sm">إجمالي المستخدمين <b className="text-main2">{total}</b></span>
        </div>
        {/* حقل البحث العام */}
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عام..."
              value={search}
              onChange={e => {
                const val = e.target.value;
                setSearch(val);
                if (val.trim() === '' && appliedSearch !== '') {
                  setAppliedSearch('');
                  setPage(1);
                }
              }}
              onKeyDown={handleKeyDownApply}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main1 font-tajawal"
            />
            <button
              onClick={handleApplyFilters}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-main1 transition-transform hover:scale-110 active:scale-95 focus:outline-none rounded-full"
              title="بحث"
            >
              <FaSearch />
            </button>
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
              onChange={e => {
                const val = e.target.value;
                setNameFilter(val);
                if (val.trim() === '' && appliedName !== '') {
                  setAppliedName('');
                  setPage(1);
                }
              }}
              onKeyDown={handleKeyDownApply}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main1 font-tajawal"
            />
            <button
              onClick={handleApplyFilters}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-main1 transition-transform hover:scale-110 active:scale-95 focus:outline-none rounded-full"
              title="بحث بالاسم"
            >
              <FaSearch />
            </button>
          </div>
          <div className="relative w-full md:w-48">
            <input
              type="text"
              placeholder="فلترة برقم الهاتف..."
              value={phoneFilter}
              onChange={e => {
                const val = e.target.value;
                setPhoneFilter(val);
                if (val.trim() === '' && appliedPhone !== '') {
                  setAppliedPhone('');
                  setPage(1);
                }
              }}
              onKeyDown={handleKeyDownApply}
              className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-grayish text-main1 focus:outline-none focus:ring-2 focus:ring-main1 font-tajawal"
            />
            <button
              onClick={handleApplyFilters}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-main1 transition-transform hover:scale-110 active:scale-95 focus:outline-none rounded-full"
              title="بحث برقم الهاتف"
            >
              <FaSearch />
            </button>
          </div>
          

        </div>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto rounded-2xl shadow-md bg-transparent">
        <table className="min-w-full text-sm text-main1 font-tajawal">
          <thead>
            <tr className="bg-grayish text-main1">
              <th className="p-4 text-center text"><input type="checkbox" /></th>
              <th className="p-4 text-right">
                <SortableHeaderCell 
                  label="الاسم" 
                  field="first_name" 
                  ordering={ordering} 
                  onSort={handleSort}
                  align="right"
                  ascTitle="ترتيب تصاعدي"
                  descTitle="ترتيب تنازلي"
                />
              </th>
              <th className="p-4 text-right">
                <SortableHeaderCell 
                  label="الكنية" 
                  field="last_name" 
                  ordering={ordering} 
                  onSort={handleSort}
                  align="right"
                  ascTitle="ترتيب تصاعدي"
                  descTitle="ترتيب تنازلي"
                />
              </th>
              <th className="p-4 text-center">
                <div className="flex items-center justify-center">
                  <SortableHeaderCell 
                    label="رقم الهاتف" 
                    field="phone_number" 
                    ordering={ordering} 
                    onSort={handleSort}
                    align="center"
                    ascTitle="ترتيب تصاعدي"
                    descTitle="ترتيب تنازلي"
                  />
                </div>
              </th>
              <th className="p-4 text-center">حالة الحساب</th>
              <th className="p-4 text-center">
                <div className="flex items-center justify-center">
                  <SortableHeaderCell 
                    label="تاريخ الإنشاء" 
                    field="created_at" 
                    ordering={ordering} 
                    onSort={handleSort}
                    align="center"
                    ascTitle="الأقدم أولاً"
                    descTitle="الأحدث أولاً"
                  />
                </div>
              </th>
              <th className="p-4 text-center">الدور</th>
              <th className="p-4 text-center">المحيل</th>
              <th className="p-4 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-400">لا يوجد مستخدمون مطابقون</td>
              </tr>
            ) : (
              visibleUsers.map((user, idx) => (
                <tr key={idx} className="border-b last:border-b-0 hover:bg-grayish/60 transition">
                  <td className="p-4 text-center"><input type="checkbox" /></td>
                  <td className="p-4 flex items-center gap-3">
                    {/* <img src={user.profile_image || userImg} alt={user.first_name || user.firstName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" /> */}
                    <span className="font-bold text-main1">{user.first_name}</span>
                  </td>
                  <td className="p-4 text-main1">{user.last_name }</td>
                  <td className="p-4 text-center">{user.phone_number}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.is_active ? 'bg-green-100 text-main1' : 'bg-red-100 text-accent'}`}>
                      {user.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="p-4 text-center">{formatDateOnly(user.created_at)}</td>
                  <td className="p-4 text-center">{translateRole(user.role)}</td>
                  <td className="p-4 text-center">{user.referrer || '-'}</td>
                  <td className="p-4 text-center flex items-center gap-2 justify-center">
                    <button className="p-2 rounded-lg hover:bg-main2/10 text-main2 transition"><FaEdit /></button>
                    
                    {!user.is_active ? (
                      <button className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition" title="تنشيط الحساب">
                        <FaBolt />
                      </button>
                    ) : (
                      <button className="p-2 rounded-lg hover:bg-accent/10 text-accent transition" title="إلغاء تنشيط الحساب">
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* التصفح */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">عرض {visibleUsers.length} من {total} مستخدم</div>
        <div className="flex items-center gap-2">
          {/* API prev/next page */}
          <button onClick={() => { setPage(p => Math.max(1, p - 1)); setSubPage(1); }} className="p-2 rounded-3xl border border-gray-200 text-main1 disabled:opacity-50" disabled={!previous}><FaChevronRight /></button>
          {/* sub pages 1..N within current API page */}
          {Array.from({ length: totalSubPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setSubPage(n)}
              className={`px-3 py-1 rounded-3xl border ${subPage === n ? 'bg-main1 text-light border-main1' : 'text-main1 border-gray-200 hover:bg-main1/10'}`}
            >
              {n}
            </button>
          ))}
          <button onClick={() => { setPage(p => p + 1); setSubPage(1); }} className="p-2 rounded-3xl border border-gray-200 text-main1 disabled:opacity-50" disabled={!next}><FaChevronLeft /></button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;