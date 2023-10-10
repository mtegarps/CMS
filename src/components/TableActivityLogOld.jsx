import React from "react";
import Table from "@/components/Table";

const TableActivityLog = ({ data }) => {
  const activityData = data?.data || []; // Access the nested data array

  return (
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
        {activityData.map((activity, id) => (
          <tr key={`userActivityLog.${id}`}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.fullName}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.event}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.eventInfo}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {new Date(activity.activityTime).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
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
        {activityData.map((activity, id) => (
          <tr key={`userActivityLog.${id}`}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.fullName}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.event}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {activity.eventInfo}
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {new Date(activity.activityTime).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableActivityLog;
