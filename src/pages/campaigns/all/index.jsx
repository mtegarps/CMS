import Layout from '@/components/Layout'
import TableCampaignAll from '@/components/TableCampaignAll'
import React from 'react'
import { Input, Button } from 'antd'

const Index = () => {
  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search"
          allowClear
          style={{ width: 300 }}
        />
         <Button 
         onClick={() => {window.location.href='/campaigns/create'}}
         type="primary" htmlType="submit">+ New</Button>
      </div>
      <TableCampaignAll />
    </Layout>
  )
}

export default Index