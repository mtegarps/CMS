import Layout from '@/components/Layout'
import { Input, Button } from 'antd'
import React, { useState } from 'react'
import DropzoneComp from '@/components/DropzoneComp'
import TableCampaignMedia from '@/components/TableCampaignMedia'

const Index = () => {
  const [files, setFiles] = useState([])
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <DropzoneComp
              files={files}
              setFiles={setFiles}
            />
          </div>
          <Button type="primary" htmlType="submit">Upload</Button>
        </form>
      </div>
      <div className="flex justify-between mt-[80px] mb-4 ">
        <Input.Search
          placeholder="Search"
          allowClear
          style={{ width: 300 }}
        />
      </div>
      <TableCampaignMedia />
    </Layout>
  )
}

export default Index