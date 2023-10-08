import Layout from "@/components/Layout";
import Table from "@/components/Table";
import React from "react";

const Page = () => {
    return (
        <Layout>
            <Table>
                <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Nama Pengguna
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Event
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Informasi Event
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Waktu Aktivitas
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        Nama
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        Evenet
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        event
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        waktu
                    </td>
                </tr>
                </tbody>
            </Table>
        </Layout>
    )
}

export default Page
