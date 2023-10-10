import React from 'react';
import { Table } from 'antd';
import { renderPagination } from './RenderPagination';
import Swal from 'sweetalert2';
import { BsTrash, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineCopy, AiOutlineFileSearch } from 'react-icons/ai';
import { MdDisabledVisible, MdVisibility } from 'react-icons/md';

const TableCampaignMedia = ({ setIsPatch, setShowModal, loading, title }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      width: 200,
    },
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      render: () => (
        <div className="flex justify-center">
          {/* <BsRocketTakeoff className="text-primary" size={14} />
          <MdDisabledVisible className="text-primary" size={14} />
          <AiOutlineFileSearch className="text-primary" size={14} />
          <AiOutlineCopy className="text-primary" size={14} />
          <AiOutlineLineChart className="text-primary" size={14} /> */}
          <BsTrash className="text-danger" size={14} />
        </div>
      )
    },
  ];
  const data = [
    {
      key: '1',
      name: 'pony.jpg',
      image: <img src="https://picsum.photos/200/100" alt="pony" />,
      created: '2021-08-10 12:00:00',
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
export default TableCampaignMedia;