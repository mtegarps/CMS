import Layout from '@/components/Layout'
import CardOne from "@/components/CardOne";
import CardTwo from "@/components/CardTwo";
import CardThree from "@/components/CardThree";
import CardFour from "@/components/CardFour";
import ChartOne from "@/components/ChartOne";

const Page = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardOne/>
                <CardTwo/>
                <CardThree/>
                <CardFour/>
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne/>
                {/*<ChartTwo/>*/}
                {/*<ChartThree/>*/}

            </div>
        </Layout>
    );
};

export default Page;
