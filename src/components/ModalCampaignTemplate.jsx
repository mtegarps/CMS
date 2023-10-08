import React, { Children, useState } from 'react';
import { Button, Modal } from 'antd';

const ModalCampaignTemplate = ({children, openModal, setOpenModal, onFinish, confirmLoading, onCancel}) => {
  return (
    <>
      <Modal
        width={1000}
        style={{
          top: 20,
        }}
        title="New Template"
        open={openModal}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={onCancel} 
        >
        <p>{children}</p>
      </Modal>
    </>
  );
};
export default ModalCampaignTemplate;