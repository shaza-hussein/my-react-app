import React from 'react'
import { ListLoading } from '../../Components/Loading';
const Test = () => {

    return(
        <div className="p-6 bg-light min-h-screen font-tajawal">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-main1">المستخدمون</h2>
          <span className="text-gray-500 text-sm">جاري تحميل البيانات...</span>
        </div>
        <ListLoading count={5} />
      </div>
    );
}

export default Test;