import Layout from '@/components/Layout'
import TableCampaignTemplate from '@/components/TableCampaignTemplate'
import React, { useState, useEffect } from 'react'
import ModalCampaignTemplate from '@/components/ModalCampaignTemplate'
import { Form, Input, Button, Checkbox, Select, Switch, DatePicker, Modal } from 'antd';
import { AiOutlineFileSearch } from 'react-icons/ai';
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import axios from "axios";

const Index = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openModalPreview, setOpenModalPreview] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailTypes, setEmailTypes] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setOpenModal(true);
  };

  const showModalPreview = () => {
    setOpenModalPreview(true);
  };

  //get All Email Template
  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/emailTemplate/getAll`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        const data = res.data.data
        setDataSource(data)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  //get email type
  const getEmailTypeID = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/emailType/getAll`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        const data = res.data.data
        setEmailTypes(data)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
    getEmailTypeID()

    //unmount
    return () => {
      setDataSource([])
      setEmailTypes([])
    }

  }, [])

  const onFinish = async () => {
    const values = form.getFieldsValue();
    setConfirmLoading(true);
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const token = getCookie("token");
    const formData = new FormData();
    formData.append("emailTypeID", values.emailTypeID);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("subject", values.subject);
    formData.append("rawHTML", values.rawHTML);
    formData.append("isDefault", true);

    await axios.post(`${api_url}/email/emailTemplate/create`, formData, {
      headers: {
        "x-access-token": token
      }
    }).then(res => {
      const data = res.data.data;
      if (res.data.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      form.resetFields()
      setConfirmLoading(false)
    }).catch(err => {
      console.log(err)
      setConfirmLoading(false)
    })
  };

  const onCancel = () => {
    setOpenModal(false);
    form.resetFields();
  }


  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search"
          allowClear
          style={{ width: 300 }}
        />
        <Button
          onClick={showModal}
          type="primary" htmlType="submit">+ New</Button>
      </div>
      <TableCampaignTemplate
        dataSource={dataSource}
        emailTypes={emailTypes}
      />

      <ModalCampaignTemplate
        openModal={openModal}
        setOpenModal={setOpenModal}
        confirmLoading={confirmLoading}
        onFinish={onFinish}
        onCancel={onCancel}
      >
        <div className="flex justify-end mb-4 mr-2">
          <button
            onClick={showModalPreview}
            className="bg-primary text-white px-2 py-1 rounded-sm flex flex-row items-center">
            <AiOutlineFileSearch size={14} className="mr-2" />
            <span>Preview</span>
          </button>
        </div>
        <Form layout="vertical" form={form} name="control-hooks">
          <div className="flex flex-row justify-between w-full">
            <div className="w-full mr-5">
              <Form.Item
                label="Name"
                name="name"
              >
                <Input
                  placeholder="name"
                  onChange={(e) => {
                    form.setFieldsValue({ name: e.target.value })
                  }}
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item
                label="Type"
                name="emailTypeID"
              >
                <Select
                  placeholder="Select type"
                  allowClear
                  mode='single'
                  onChange={(e) => {
                    form.setFieldsValue({ emailTypeID: e })
                  }}
                >
                  {emailTypes.map((item) => {
                    return (
                      <Select.Option value={item.emailTypeID}>{item.name}</Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please input your field subject!' }]}
          >
            <Input
              placeholder="subject"
              onChange={(e) => {
                form.setFieldsValue({ subject: e.target.value })
              }}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your field description!' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="description"
              onChange={(e) => {
                form.setFieldsValue({ description: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            label="Raw HTML"
            name="rawHtml"
          >
            <Input.TextArea
              rows={15}
              placeholder="raw"
              onChange={(e) => {
                form.setFieldsValue({ rawHtml: e.target.value })
              }}
            />
          </Form.Item>
        </Form>
      </ModalCampaignTemplate>

      <Modal
        width={1000}
        style={{
          top: 20,
        }}
        title="Preview"
        open={openModalPreview}
        footer={null}
        onCancel={() => setOpenModalPreview(false)}
      >
        <Input.TextArea
          rows={15}
          value={form.getFieldValue('rawHtml')}
        />
      </Modal>
    </Layout>
  )
}

export default Index