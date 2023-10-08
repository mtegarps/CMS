import {useRouter} from "next/router";
import {useState} from "react";
import axios from "axios";
import {getCookie} from "cookies-next";
import Layout from "@/components/Layout";

const Page = ({company}) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: company.name,
        email: company.email,
        phone: company.phone,
        website: company.website,
        address: company.address
    });
    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/company/update`, {
                companyId: router.query.id,
                data: {...formData}
            },
            {
                headers: {
                    "x-access-token": getCookie("token")
                }
            }).then(res => {
                router.push('/company')
            }
        ).catch(err => {
            console.log(err)
        })

    }
    return (
        <Layout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Company Form
                        </h3>
                    </div>
                    <form onSubmit={submitHandler} action="#">
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label htmlFor={'name'} className="mb-2.5 block text-black dark:text-white">
                                        Nama
                                    </label>
                                    <input
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        value={formData.name}
                                        type="text"
                                        name={'name'}
                                        id={'name'}
                                        placeholder="Masukan nama"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label htmlFor={'email'} className="mb-2.5 block text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        value={formData.email}
                                        type="email"
                                        name={'email'}
                                        id={'email'}
                                        placeholder="Masukan alamat Email"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={`phone`} className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    name={`phone`}
                                    id={`phone`}
                                    type="text"
                                    placeholder="Masukan nomor telepon"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={'website'} className="mb-2.5 block text-black dark:text-white">
                                    Website
                                </label>
                                <input
                                    value={formData.website}
                                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                                    name={`website`}
                                    id={`website`}
                                    type="text"
                                    placeholder="Masukan website"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>


                            <div className="mb-6">
                                <label htmlFor={'address'} className="mb-2.5 block text-black dark:text-white">
                                    Alamat
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    name={'address'}
                                    id={'address'}
                                    rows={6}
                                    placeholder="Masukan alamat"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button type={`submit`}
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Page

/** @param {import('next').GetServerSidePropsContext} context */

export async function getServerSideProps(context) {
    const companies = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/getAll`, {
        headers: {
            "x-access-token": context.req.cookies.token
        }
    }).then(res => res.data.data.filter(item => item.companyID === context.params.id)).catch(err => console.log(err))
    if (!companies[0]) {
        return {
            notFound: true // This will handle the 404 error page
        };
    }
    return {
        props: {
            company: companies[0] || []
        }
    }
}