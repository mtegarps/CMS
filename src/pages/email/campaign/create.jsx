import Layout from '@/components/Layout'
import { Input, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import FormCampaignCreate from '@/components/FormCampaignCreate'
import NavCampaignCreate from '@/components/NavCampaignCreate'
import axios from 'axios'
import { getCookie } from "cookies-next";
import { AiFillBackward } from 'react-icons/ai'

//add box subscribe
const BoxSubscribe = () => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md w-100 align-items-center">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">Subscribe</p>
        <p className="text-sm">Subscribe to our newsletter to get the latest news and updates.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Input placeholder="Email Address" />
        <Button
          onClick={() => { alert('Subscribe') }}
          style={{ width: "200px", backgroundColor: "#1E293B", color: "#fff" }}>Subscribe</Button>
      </div>
    </div>
  )
}

const Index = () => {
  const [state, setState] = useState({
    loading: true,
    activeKey: "campaign",
  });
  const [emailTypeID, setEmailTypeID] = useState('');
  const [dataTemplate, setDataTemplate] = useState([]);
  const [dataBatch, setDataBatch] = useState([]);

  //get All Email Template
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

  //get All Email Batch
  const fetchBatch = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/batch/getBatch`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        const data = res.data.data
        setDataBatch(data)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  //get email type id
  const getEmailTypeID =async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/emailType/getAll`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        const data = res.data.data
        data.map((item) => {
          if (item.name === 'Campaign') {
            setEmailTypeID(item.emailTypeID)
          }
        })
      }
      ).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchTemplate()
    getEmailTypeID()
    fetchBatch()

    //unmount
    return () => {
      setDataTemplate([])
      setEmailTypeID('')
      setDataBatch([])
    }

  }, [])

  const tabPanes = [
    {
      label: "Campaign",
      key: "campaign",
      content:
        <div className="grid grid-cols-2 gap-4">
          <FormCampaignCreate
            dataTemplate={dataTemplate}
            emailTypeID={emailTypeID}
            dataBatch={dataBatch}
          />
          <div className="justify-self-center mt-[50px]" >
            <BoxSubscribe />
          </div>
        </div>
    },
    {
      label: "Content",
      key: "content",
      content:
        <>
          <p>Content</p>
        </>
    },
    {
      label: "Archive",
      key: "archive",
      content:
        <>
          <p>Archive</p>
        </>
    },
  ]

  return (
    <Layout>
      <a
        onClick={() => { window.location.href = '/email/campaign' }}
        style={{ backgroundColor: "#ffe58f", color: "#000" }}
        className='flex flex-row justify-center items-center mb-4 w-24 h-8 rounded-md'
      >
        <AiFillBackward className="mr-2 text-black" />
        <span className='text-black'>Back</span>
      </a>
      <NavCampaignCreate
        tabPanes={tabPanes}
        state={state}
        changeTab={(key) => setState({ ...state, activeKey: key })}
      />
    </Layout>
  )
}

export default Index