import Layout from '@/components/Layout'
import TableCampaignAll from '@/components/TableCampaignAll'
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import axios from "axios";

const Index = () => {
  const [dataSource, setDataSource] = useState([])
  const [dataTemplate, setDataTemplate] = useState([])

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
        console.log('res', res)
        const data = res.data.data
        setDataSource(data)
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
      />
    </Layout>
  )
}

export default Index