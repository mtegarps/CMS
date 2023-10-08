import Layout from "@/components/Layout";
import TableCompany from "@/components/TableCompany";
import axios from "axios";
import Link from "next/link";

const Page = ({ companies }) => {
  return (
    <Layout>
      <div className={`flex justify-end`}>
        <Link
          href={"/company/create"}
          className={`px-3 py-2 rounded-md bg-primary text-white mb-3`}
        >
          Tambah
        </Link>
      </div>
      <TableCompany companies={companies} />
    </Layout>
  );
};

export default Page;

/** @param {import('next').GetServerSidePropsContext} context */

export async function getServerSideProps(context) {
  const role = context.req.cookies.name;

  if (role === "Administrator") {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }
  const companies = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/getAll`, {
    headers: {
      "x-access-token": context.req.cookies.token,
    },
  });

  return {
    props: {
      companies: companies.data.data || [],
    },
  };
}
