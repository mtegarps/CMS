import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch, AiOutlineEdit, AiOutlineCheckCircle} from 'react-icons/ai';
import moment from 'moment';
import 'moment/locale/id'

const TableCampaignTemplate = ({ dataSource, emailTypes, title }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => {
        const emailType = emailTypes?.find(e => e.emailTypeID === record.emailTypeID);
        if (emailType?.name == 'Campaign') {
          return <span className="bg-primary text-white px-2 py-1 rounded-full">{emailType.name}</span>
        } else if (emailType?.name == 'Transactional') {
          return <AiOutlineLineChart className="bg-warning text-white px-2 py-1 rounded-full" size={14} />
        } else {
          return <>-</>
        }
      }
    },
    {
      title: 'ID',
      dataIndex: 'emailTemplateID',
      key: 'emailTemplateID',
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (_, record) => {
        if(!record.created_at) return '-'
        return moment(record.created_at).format('lll')
      }
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
      render: (_, record) => {
        if(!record.updated_at) return '-'
        return moment(record.updated_at).format('lll')
      }
    },
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      width: 250,
      render: () => (
        <div className="flex flex-row justify-around">
          <AiOutlineFileSearch className="text-primary" size={14} />
          <AiOutlineEdit className="text-primary" size={14} />
          <AiOutlineCopy className="text-primary" size={14} />
          <AiOutlineCheckCircle className="text-primary" size={14} />
          <BsTrash className="text-danger" size={14} />
        </div>
      )
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
export default TableCampaignTemplate;