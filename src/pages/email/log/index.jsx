import Layout from '@/components/Layout'
import TableCampaignLog from '@/components/TableCampaignLog'
import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, Form, DatePicker } from 'antd'
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import axios from "axios";
import { AiOutlineReload } from 'react-icons/ai'

const Index = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [showModalEdit, setShowModalEdit] = useState(false)

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/log/email`,
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


  useEffect(() => {
    fetchData()

    //unmount
    return () => {
      setDataSource([])
    }
  }, [])

  return (
    <Layout>
      {/* filter */}
      {/* <div className="bg-white rounded-lg shadow overflow-hidden mb-4"> */}
      <div className="flex justify-between mb-[80px]">
        <Form layout="inline">
          <Form.Item label="Campaign Name">
            <Input
            style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Input 
           style={{ width: 100 }}
            />
          </Form.Item>
          <Form.Item label="Running By">
            <Input 
            style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker.RangePicker 
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center gap-1">
            <Button style={{ backgroundColor: '#FFB822', color: '#FFFFFF' }}>Filter</Button>
            <Button style={{ backgroundColor: 'gray', color: '#FFFFFF' }}><AiOutlineReload size={18} />
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {/* </div> */}

      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search"
          allowClear
          style={{ width: 300 }}
        />
        {/* <Button
          onClick={() => { window.location.href = '/email/campaign/create' }}
          type="primary" htmlType="submit">+ New</Button> */}
      </div>

      

      <TableCampaignLog
        dataSource={dataSource}
      />
    </Layout>
  )
}

export default Index