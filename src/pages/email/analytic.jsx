import Layout from '@/components/Layout'
import TableCampaignAll from '@/components/TableCampaignAll'
import React, { useState } from 'react'
import { Input, Button, Form } from 'antd'
import { BsSearch } from 'react-icons/bs'

const Index = () => {
  const [form] = Form.useForm();
  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Form layout="vertical" form={form} name="control-hooks" className="w-full">
          <div className="flex justify-between mb-4">
            <Form.Item
              className="w-1/2 mr-5"
              label="Campaign"
              name="campaign"
              rules={[{ required: true, message: 'Please input your field campaign!' }]}
            >
              <Input
                placeholder="campaign"
                onChange={(e) => {
                  form.setFieldsValue({ campaign: e.target.value })
                }}
              />
            </Form.Item>

            <Form.Item
              className="w-70 mr-5"
              label="From"
              name="from"
              rules={[{ required: true, message: 'Please input your field from!' }]}
            >
              <Input
                placeholder="from"
                onChange={(e) => {
                  form.setFieldsValue({ from: e.target.value })
                }}
              />
            </Form.Item>
            <Form.Item
              className="w-70 mr-5"
              label="To"
              name="to"
              rules={[{ required: true, message: 'Please input your field to!' }]}
            >
              <Input
                placeholder="subject"
                onChange={(e) => {
                  form.setFieldsValue({ to: e.target.value })
                }}
              />
            </Form.Item>
            <Form.Item
              className="w-50 mr-5"
              label=" "
              name="subject"
            >
              <Button
                onClick={() => { alert('asd') }}
                type="primary" htmlType="submit">
                <BsSearch size={16} />
              </Button>
            </Form.Item>
          </div>
        </Form>

      </div>
    </Layout>
  )
}

export default Index