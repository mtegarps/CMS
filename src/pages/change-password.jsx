import Layout from "@/components/Layout";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const userID = jwtDecode(getCookie("token")).id;

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/changePassword`,
        {
          userID,
          data: formData,
        },
        {
          headers: {
            "x-access-token": getCookie("token"),
          },
        }
      )
      .then((res) => router.push("/company"))
      .catch((e) => console.log(e));
  };
  return (
    <Layout>
      <form
        onSubmit={submitHandler}
        className="mt-6 w-4/5 bg-white border border-gray-200 rounded-md shadow-md p-3 mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
          >
            Password Lama
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="absolute right-3 top-3">
              <BiLock size={20} />
            </span>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
          >
            Password Baru
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="absolute right-3 top-3">
              <BiLock size={20} />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-primary rounded-lg hover:bg-opacity-90"
        >
          Ganti
        </button>
      </form>
    </Layout>
  );
}
