import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Layout from '@/components/Layout'
import ChartOne from "@/components/ChartOne";
import axios from "axios";
import { BiBlanket } from "react-icons/bi";
import TableDashboard from "@/components/TableDashboard";

const Page = () => {
  const [dataCard, setDataCard] = useState([])
  const [dataTable, setDataTable] = useState([])

  const fetchDataCard = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/dashboard/get`,
      {
        headers: {
          "x-access-token": getCookie("token")
        }
      })
      .then(res => {
        console.log('res', res)
        const data = res.data.data
        setDataCard(data.dashboardBox)
        setDataTable(data.allCampaign)
      }
      ).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchDataCard()

    //unmount
    return () => {
      setDataCard([])
      setDataTable([])
    }
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-6">
        {dataCard.map((item, index) => {
          // get last index
          const lastIndex = dataCard.length - 1

          return (
            <div key={index}>
              <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  <BiBlanket className="fill-primary dark:fill-white" size={22} />
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                     {lastIndex === index ? item.totalCampaign : item.statusName}
                    </h4>
                    <span className="text-sm font-medium">Total</span>
                  </div>

                  <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                    {lastIndex === index ? item.totalCampaign : item.total}
                    <svg
                      className="fill-meta-3"
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                        fill=""
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 py-6">
        <TableDashboard
          title="All Campaign"
          dataSource={dataTable}
        />
      </div>
    </Layout>
  );
};

export default Page;
