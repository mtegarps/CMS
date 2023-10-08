import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch } from 'react-icons/ai';
import { MdDisabledVisible, MdVisibility } from 'react-icons/md';

const TableCampaignAll = ({ setIsPatch, setShowModal, loading, title }) => {
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text) => {
        return (
          <div className="flex justify-center">
            {text === 'Finish' ? 
            <span className="bg-success text-white rounded-sm px-2 py-1 text-xs">{text}</span> : 
            <span className="bg-warning text-white rounded-sm px-2 py-1 text-xs">{text}</span>
            }
          </div>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'List',
      dataIndex: 'list',
      key: 'list',
      width: 200,
    },
    {
      title: 'Timestamps',
      dataIndex: 'timestamps',
      key: 'timestamps',
      width: 200,
    },
    {
      title: 'Stats',
      dataIndex: 'stats',
      key: 'stats',
      width: 200,
    },
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      render: () => (
        <div className="flex justify-between">
          <BsRocketTakeoff className="text-primary" size={14} />
          <MdDisabledVisible className="text-primary" size={14} />
          <AiOutlineFileSearch className="text-primary" size={14} />
          <AiOutlineCopy className="text-primary" size={14} />
          <AiOutlineLineChart className="text-primary" size={14} />
          <BsTrash className="text-danger" size={14} />
        </div>
      )
    },
  ];
  const data = [
    {
      key: '1',
      status: 'Finish',
      name: 'Welcome to listmonk',
      list: 'Default List',
      timestamps: '2021-09-01 00:00:00',
      stats: '0/0/0',
    },
    {
      key: '2',
      status: 'Draft',
      name: 'Welcome to listmonk',
      list: 'Default List',
      timestamps: '2021-09-01 00:00:00',
      stats: '0/0/0',
    },
  ];
  return (
    <>
      <h5 className="text-left">{title}</h5>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        // scroll={{ x: 1500 }}
        // loading={loading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 25,
          pageSizeOptions: ["25", "50", "100"],
          position: ["bottomRight"],
          size: "default",
          itemRender: renderPagination,
        }}
      />
    </>
  )
};
export default TableCampaignAll;