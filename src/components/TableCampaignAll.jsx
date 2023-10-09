import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch } from 'react-icons/ai';
import { MdDisabledVisible, MdVisibility } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/id'

const TableCampaignAll = ({ dataSource, title, dataTemplate }) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'nomor',
      key: 'nomor',
      render: (_, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Email Template ID',
      dataIndex: 'emailTemplateID',
      key: 'emailTemplateID'
    },
    {
      title: 'Template',
      dataIndex: 'emailTemplateID',
      key: 'emailTemplateID',
      render: (_, record) => {
        const template = dataTemplate?.find(e => e.emailTemplateID === record.emailTemplateID);
        if (!template) return '-'
        return template.name
      }
    },
    {
      title: 'Email Campaign ID',
      dataIndex: 'emailCampaignID',
      key: 'emailCampaignID'
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        if (!record.created_at) return '-'
        return moment(record.created_at).format('lll')
      }
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

  return (
    <>
      <h5 className="text-left">{title}</h5>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        scroll={{ x: 1500 }}
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