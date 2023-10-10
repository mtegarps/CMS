import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch } from 'react-icons/ai';
import { MdDisabledVisible, MdVisibility } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/id';
import SwitcherUser from "@/components/SwitcherUser";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const TableActivityLog = ({ data, title, dataTemplate }) => {
  const dataSource = data?.data || []; // Access the nested data array

  const columns = [
    {
      title: 'Nama Pengguna',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event'
    },
    {
      title: 'Informasi Event',
      dataIndex: 'eventInfo',
      key: 'eventInfo'
    },
    {
      title: 'Waktu Aktivitas',
      dataIndex: 'activityTime',
      key: 'activityTime',
      render: (_, record) => {
        if(!record.activityTime) return '-'
        return moment(record.activityTime).format('lll')
      }
    },
  ];

  return (
    <>
      <h5 className="text-left">{title}</h5>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        // scroll={{ x: 1500 }}
        // loading={loading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "50", "100"],
          position: ["bottomRight"],
          size: "default",
          itemRender: renderPagination,
        }}
      />
    </>
  )
};
export default TableActivityLog;