import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai';
import moment from 'moment';
import 'moment/locale/id';
import axios from 'axios';
import { getCookie } from "cookies-next";

const TableCampaignLog = ({ dataSource, title }) => {

  const columns = [
    {
      title: 'Email Log ID',
      dataIndex: 'emailLogID',
      key: 'emailLogID',
    },
    {
      title: 'Session Campaign ID',
      dataIndex: 'sessionCampaign',
      key: 'sessionCampaign'
    },
    {
      title: 'Email Campaign ID',
      dataIndex: 'emailCampaignID',
      key: 'emailCampaignID'
    },
    {
      title: 'Email Campaign Name',
      dataIndex: 'emailCampaignName',
      key: 'emailCampaignName'
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerID',
      key: 'customerID'
    },
    {
      title: 'Status Name',
      dataIndex: 'statusName',
      key: 'statusName'
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to'
    },
    {
      title: 'Event Info',
      dataIndex: 'eventInfo',
      key: 'eventInfo'
    },
    {
      title: 'Activity Time',
      dataIndex: 'activityTime',
      key: 'activityTime',
      render: (_, record) => {
        if (!record.activityTime) return '-'
        return moment(record.activityTime).format('lll')
      }
    },
    // {
    //   title: '',
    //   key: 'action',
    //   fixed: 'right',
    //   width: 80,
    //   render: (_, record) => (
    //     <div className="flex flex-row justify-around">
    //       <BsRocketTakeoff
    //         onClick={() => handleStartBlaster(record.emailTemplateID, record.emailCampaignID)}
    //         className="text-primary hover:cursor-pointer"
    //         size={14}
    //       />
    //       <AiOutlineEdit 
    //       onClick={() => onEdit(record)}
    //       className="text-primary hover:cursor-pointer" 
    //       size={14} />
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
        scroll={{ x: 1500 }}
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
export default TableCampaignLog;