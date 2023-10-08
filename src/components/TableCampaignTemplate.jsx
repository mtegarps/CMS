import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch, AiOutlineEdit, AiOutlineCheckCircle} from 'react-icons/ai';

const TableCampaignTemplate = ({ setIsPatch, setShowModal, loading, title }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (text) => {
        return (
          <div className="flex justify-start">
            {text === 'Campaign' ? 
            <span className="bg-primary text-white rounded-sm px-2 py-1 text-xs">{text}</span> : 
            <span className="bg-warning text-white rounded-sm px-2 py-1 text-xs">{text}</span>
            }
          </div>
        )
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      width: 200,
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
      width: 200,
    },
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      render: () => (
        <div className="flex justify-between">
          <AiOutlineFileSearch className="text-primary" size={14} />
          <AiOutlineEdit className="text-primary" size={14} />
          <AiOutlineCopy className="text-primary" size={14} />
          <AiOutlineCheckCircle className="text-primary" size={14} />
          <BsTrash className="text-danger" size={14} />
        </div>
      )
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Welcome to listmonk',
      type: 'Campaign',
      id: '1',
      created: '2021-09-01 00:00:00',
      updated: '2021-09-01 00:00:00',
    },
    {
      key: '2',
      name: 'Welcome to listmonk',
      type: 'Transactional',
      id: '2',
      created: '2021-09-01 00:00:00',
      updated: '2021-09-01 00:00:00',
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
export default TableCampaignTemplate;