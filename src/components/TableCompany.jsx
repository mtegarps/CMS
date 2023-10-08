import {FaEdit, FaTrash} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";
import Table from "@/components/Table";

const TableCompany = ({companies}) => {
    const router = useRouter()

    const deleteCompany = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/company/delete`, {
                headers: {
                    "x-access-token": getCookie("token")
                },
                data: {
                    companyID: id
                }
            }).then(res => router.back()).catch(err => console.log(err))

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Table>
            <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
                <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Aksi
                </th>
                {/*<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">*/}
                {/*    companyID*/}
                {/*</th>*/}
                <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Nama
                </th>
                <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Email
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                    No Telepon
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Website
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white min-w-fit ">
                    Alamat
                </th>
            </tr>
            </thead>
            <tbody>
            {
                companies?.map((company, id) => {

                    return (<tr key={`dataCompanyId.${id}`}>

                        <td className="border-b flex items-center space-x-3 border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <Link href={`/company/${company.companyID}/edit`}
                                  className={`p-2 rounded-md text-white bg-warning`}>
                                <FaEdit/>
                            </Link>

                            <button className={`p-2 rounded-md text-white bg-danger`}>
                                <FaTrash onClick={() => deleteCompany(company.companyID)}/>

                            </button>

                        </td>

                        {/*<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">*/}
                        {/*    {company.companyID}*/}
                        {/*</td>*/}

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {company.name}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {company.email ?? "tidak ada"}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {company.phone}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {company.website}
                        </td>


                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 min-w-[30rem]">
                            {company.address}
                        </td>

                    </tr>)
                })
            }
            </tbody>

        </Table>
    )
}

export default TableCompany