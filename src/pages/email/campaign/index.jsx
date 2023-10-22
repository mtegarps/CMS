import Layout from '@/components/Layout'
import TableCampaignAll from '@/components/TableCampaignAll'
import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, Form } from 'antd'
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import axios from "axios";

const Index = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [dataTemplate, setDataTemplate] = useState([])
  const [showModalEdit, setShowModalEdit] = useState(false)

  const fetchTemplate = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/emailTemplate/getAll`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        const data = res.data.data
        setDataTemplate(data)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/emailCampaign/getAll`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        // console.log('res', res)
        const data = res.data.data
        setDataSource(data)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  const onEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      emailCampaignID: record.emailCampaignID,
      emailTemplateID: record.emailTemplateID
    })
    setShowModalEdit(true)
  }

  const handleUpdate = async () => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const token = getCookie("token");
    const dataBody = {
      emailCampaignID: form.getFieldValue('emailCampaignID'),
      data: {
        emailTemplateID: form.getFieldValue('emailTemplateID'),
        name: form.getFieldValue('name'),
        description: form.getFieldValue('description'),
      }
    }

    await axios.put(`${api_url}/email/emailCampaign/update`, dataBody, {
      headers: {
        "x-access-token": token
      }
    }).then(res => {
      console.log('res update', res)
      const data = res.data.data;
      if (res.data.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Campaign has been updated!',
        })
        setShowModalEdit(false)
        fetchData()
      }
    }
    ).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
    fetchTemplate()

    //unmount
    return () => {
      setDataSource([])
      setDataTemplate([])
    }
  }, [])

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search"
          allowClear
          style={{ width: 300 }}
        />
        <Button
          onClick={() => { window.location.href = '/email/campaign/create' }}
          type="primary" htmlType="submit">+ New</Button>
      </div>
      <TableCampaignAll
        dataSource={dataSource}
        dataTemplate={dataTemplate}
        onEdit={onEdit}
      />

      <Modal
        title="Edit Campaign"
        open={showModalEdit}
        okText="Update"
        onOk={() => handleUpdate()}
        onCancel={() => setShowModalEdit(false)}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of campaign!' }]}
          >
            <Input
              onChange={(e) => form.setFieldsValue({ name: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description of campaign!' }]}
          >
            <Input
              onChange={(e) => form.setFieldsValue({ description: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="emailCampaignID"
            label="Email Campaign ID"
            rules={[{ required: true, message: 'Please input the email campaign ID of campaign!' }]}
          >
            <Input
              onChange={(e) => form.setFieldsValue({ emailCampaignID: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="emailTemplateID"
            label="Template"
            rules={[{ required: true, message: 'Please input the template of campaign!' }]}
          >
            <Input
              onChange={(e) => form.setFieldsValue({ emailTemplateID: e.target.value })}
            />
          </Form.Item>
            
        </Form>
      </Modal>
    </Layout>
  )
}

export default Index