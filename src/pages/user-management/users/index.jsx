import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import TableUsers from "@/components/TableUsers";

const Page = ({users, errors}) => {
    return (
        <Layout>
            <div className={`flex justify-end`}>
                <Link href={'/user-management/users/create'}
                      className={`px-3 py-2 rounded-md bg-primary text-white mb-3`}>Tambah</Link>
            </div>
            <TableUsers users={users}/>
        </Layout>
    )
}

export default Page

/** @param {import('next').GetServerSidePropsContext} context */


export async function getServerSideProps(context) {


    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getAll`, {
        headers: {
            "x-access-token": context.req.cookies.token
        }
    }).then(res => res.data.data)


    return {
        props: {
            users: response || []
        }
    }
}