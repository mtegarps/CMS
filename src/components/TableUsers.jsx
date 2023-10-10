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

const TableUsers = ({ dataSource, title, dataTemplate }) => {
  const columns = [
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <div className="flex flex-row">
          <SwitcherUser isActive={record.isActive} userID={record.userID} />
          <Link
            href={`/user-management/users/${record.userID}/edit`}
            className={`p-2 rounded-md text-white bg-warning`}
          >
            <FaEdit />
          </Link>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Company ID',
      dataIndex: 'companyID',
      key: 'companyID'
    },
    {
      title: 'Role ID',
      dataIndex: 'roleID',
      key: 'roleID'
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
export default TableUsers;