import React from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import TableActivityLog from "@/components/TableActivityLog"; // Import the modified TableActivityLog component
import TableActivityLogOld from "@/components/TableActivityLogOld"; // Import the modified TableActivityLog component

const Page = ({ activityData }) => {
  return (
    <Layout>
      <TableActivityLog data={activityData} /> 
      {/* <TableActivityLogOld data={activityData} />  */}
    </Layout>
  );
}

export default Page;

export async function getServerSideProps(context) {
  try {
    // Fetch activity data
    const activityResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/activityLog/getAll`, {
      headers: {
        "x-access-token": context.req.cookies.token
      }
    });

    // Assuming there's no need to check for a 401 response here

    return {
      props: {
        activityData: activityResponse.data?.data || [] // Pass activity data to props
      }
    };
  } catch (error) {
    // Redirect to a specific page if there's an error
    return {
      redirect: {
        destination: '/company', // Replace with appropriate redirect destination
        permanent: true,
      },
      props: {} // No need for props if there's an error
    };
  }
}
