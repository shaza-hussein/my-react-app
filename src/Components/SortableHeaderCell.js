import React from 'react';
import { HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi2';

const SortableHeaderCell = ({
  label,
  field,
  ordering,
  onSort,
  align = 'left',
  ascTitle = 'ترتيب تصاعدي',
  descTitle = 'ترتيب تنازلي',
}) => {
  const isAsc = ordering === field;
  const isDesc = ordering === `-${field}`;

  const containerAlign = align === 'center' ? 'justify-center' : align === 'right' ? '' : '';

  return (
    <div className={`flex items-center gap-2 ${containerAlign}`}>
      <span>{label}</span>
      <div className="flex flex-row">
        <button
          type="button"
          onClick={() => onSort(field, 'asc')}
          className="hover:text-main2 transition-transform hover:scale-110 active:scale-95 focus:outline-none rounded-full"
          title={ascTitle}
        >
          <HiOutlineArrowUp className={`w-3 h-3 ${isAsc ? 'text-main1' : 'text-gray-400'}`} />
        </button>
        <button
          type="button"
          onClick={() => onSort(field, 'desc')}
          className="hover:text-main2 transition-transform hover:scale-110 active:scale-95 focus:outline-none rounded-full"
          title={descTitle}
        >
          <HiOutlineArrowDown className={`w-3 h-3 ${isDesc ? 'text-main1' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
  );
};

export default SortableHeaderCell;


