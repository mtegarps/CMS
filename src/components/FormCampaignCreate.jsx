import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, Switch, DatePicker } from 'antd';
import TagInput from 'antd-tag-input';


const FormCampaignCreate = () => {
  const [form] = Form.useForm();
  const [showCustomHeader, setShowCustomHeader] = useState(false)
  const [switchEnable, setSwitchEnable] = useState(false)

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <d>
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your campaign name!' }]}
        >
          <Input
            placeholder="name"
            onChange={(e) => {
              form.setFieldsValue({ name: e.target.value })
            }}
          />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please input your campaign subject!' }]}
        >
          <Input
            placeholder="subject"
            onChange={(e) => {
              form.setFieldsValue({ subject: e.target.value })
            }}
          />
        </Form.Item>

        <Form.Item
          label="From Address"
          name="fromAddress"
          rules={[{ required: true, message: 'Please input your campaign subject!' }]}
        >
          <Input
            placeholder="listmonk <noreply@listmonk.yoursite.com>"
            onChange={(e) => {
              form.setFieldsValue({ subject: e.target.value })
            }}
          />
        </Form.Item>

        <Form.Item
          label="List (0)"
          name="list"
          rules={[{ required: true, message: 'Please input your campaign list!' }]}
        >
          <Select
            placeholder="List to send to"
            allowClear
            mode='multiple'
            onChange={(e) => {
              form.setFieldsValue({ list: e })
            }}
          >
            <Select.Option value="list1">List 1</Select.Option>
            <Select.Option value="list2">List 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Template"
          name="template"
          rules={[{ required: true, message: 'Please input your campaign Template!' }]}
        >
          <Select
            placeholder="select a template"
            allowClear
            mode='single'
            onChange={(e) => {
              form.setFieldsValue({ template: e })
            }}
          >
            <Select.Option value="default">Default</Select.Option>
            <Select.Option value="template1">Template 1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tag"
          rules={[{ required: true, message: 'Please input your campaign tag!' }]}
        >
          <TagInput
            placeholder="Tags"
            style={{ height: "35px", borderRadius: "5px", border: "1px solid #d9d9d9" }}
            value={[]}
            onChange={(e) => {
              form.setFieldsValue({ tag: e })
            }}
          />
        </Form.Item>

        <Form.Item
          label="Send Item"
          name="sendItem"
          rules={[{ required: true, message: 'Please input your campaign tag!' }]}
        >
          <div className="flex flex-row justify-between">
            <Switch
              style={{ backgroundColor: switchEnable ? "#1677FF" : "#1E293B" }}
              onChange={(e) => {
                setSwitchEnable(e)
                if (!switchEnable) {
                  form.setFieldsValue({ date: '' })
                }
              }}
            />
            {switchEnable && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-sm">Send campaign at a specific date and time.</p>
                <Form.Item
                  name="date"
                // rules={[{ required: true, message: 'Please input your campaign Date!' }]}
                >
                  <DatePicker
                    showTime
                    allowClear
                    placeholder="date and time"
                    value={form.getFieldValue('date') ? form.getFieldValue('date') : ''}
                    onChange={(e) => {
                      if (setSwitchEnable) {
                        form.setFieldsValue({ date: e })
                      } else {
                        form.setFieldsValue({ date: '' })
                      }
                    }}
                  />
                </Form.Item>
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          label=""
          name="sendItem"
          rules={[{ required: true, message: 'Please input your campaign tag!' }]}
        >
          <a className="text-sm text-blue-500"
            onClick={() => {
              setShowCustomHeader(!showCustomHeader)
              form.setFieldsValue({ date: '' })
            }}
          >+ Set custom headers</a>

          {showCustomHeader && (
            <div className="flex flex-col">
              <Form.Item
                name="date"
              // rules={[{ required: true, message: 'Please input your campaign Date!' }]}
              >
                <Input.TextArea
                  placeholder="custom headers"
                  value={form.getFieldValue('date') ? form.getFieldValue('date') : ''}
                  onChange={(e) => {
                    if (setSwitchEnable) {
                      form.setFieldsValue({ date: e })
                    } else {
                      form.setFieldsValue({ date: '' })
                    }
                  }}
                />
                <span className="text-sm">
                  Array of custom headers to attach to outgoing messages. eg: {'[{"X-Custom": "value"}, {"X-Custom2": "value"}]'}.
                </span>
              </Form.Item>
            </div>
          )}
        </Form.Item>

        <Button style={{ width: "300px", backgroundColor: "#1E293B", color: "#fff" }} htmlType="submit">
          Submit
        </Button>
      </Form>

      {/* box subscribe */}
      {/* <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Subscribe</p>
          <p className="text-sm">Subscribe to our newsletter to get the latest news and updates.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Input placeholder="Email Address" />
          <Button style={{width: "300px", backgroundColor: "#1E293B", color: "#fff"}}>Subscribe</Button>
        </div>
      </div> */}
    </d>
  )
}

export default FormCampaignCreate