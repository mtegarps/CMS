import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch } from 'react-icons/ai';
import { MdDisabledVisible, MdVisibility } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/id';
import axios from 'axios';
import { getCookie } from "cookies-next";

const TableDashboard = ({ dataSource, title, dataTemplate }) => {

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'companyID',
      key: 'companyID',
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
    // {
    //   title: '',
    //   key: 'action',
    //   fixed: 'right',
    //   render: (_, record) => (
    //     <div className="flex flex-row justify-around">
    //       <BsRocketTakeoff
    //         onClick={() => handleStartBlaster(record.emailTemplateID, record.emailCampaignID)}
    //         className="text-primary hover:cursor-pointer"
    //         size={14}
    //       />
    //       <MdDisabledVisible className="text-primary" size={14} />
    //       <AiOutlineFileSearch className="text-primary" size={14} />
    //       <AiOutlineCopy className="text-primary" size={14} />
    //       <AiOutlineLineChart className="text-primary" size={14} />
    //       <BsTrash className="text-danger" size={14} />
    //     </div>
    //   )
    // },
  ];

  return (
    <>
      <h5 className="text-left">{title}</h5>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
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
export default TableDashboard;