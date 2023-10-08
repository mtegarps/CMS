import Layout from "@/components/Layout";

const Home = () => {

    return (
        <Layout>
        </Layout>
    )
}

export default Home

/** @param {import('next').GetServerSidePropsContext} context */


export async function getServerSideProps(context) {
    // const comanies = await axios.get(`${process.env.API_URL}/company/getAll`)
    console.log(context.req.cookies)
    return {
        props: {
            tes: ''
        }
    }
}