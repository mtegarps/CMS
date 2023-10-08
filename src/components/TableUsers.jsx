import {FaEdit} from "react-icons/fa";
import Link from "next/link";
import SwitcherUser from "@/components/SwitcherUser";
import Table from "@/components/Table";

const TableUsers = ({users}) => {

    return (
        <Table>
            <thead>
            <tr className="text-center bg-gray-2 dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Aksi</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Name</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">companyID</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white min-w-fit ">
                    RoleID
                </th>
            </tr>
            </thead>
            <tbody>
            {users?.map((user, id) => {
                return (
                    <tr key={`dataCompanyId.${id}`}>
                        <td className="border-b flex items-center space-x-3 border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <SwitcherUser isActive={user.isActive} userID={user.userID}/>
                            <Link
                                href={`/user-management/users/${user.userID}/edit`}
                                className={`p-2 rounded-md text-white bg-warning`}
                            >
                                <FaEdit/>
                            </Link>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {user.email}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {user.firstName}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {user.companyID}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            {user.roleID}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </Table>
    );
};

export default TableUsers;
