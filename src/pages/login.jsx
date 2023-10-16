import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [resetFormData, setResetFormData] = useState({
    userID: "",
    newPassword: "",
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, formData);
      const { data } = res.data;
      setCookie("token", data.accessToken, {
        maxAge: 60 * 60 * 1,
      });
      setCookie("name", data.role.name, {
        maxAge: 60 * 60 * 1,
      });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/user/resetPassword`, {
        userID: resetFormData.userID,
        data: {
          newPassword: resetFormData.newPassword,
        },
      });
      console.log("Password reset successful:", res.data);
      // Handle success or show a message to the user
    } catch (err) {
      console.error("Password reset error:", err);
      // Handle error or show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white border rounded-md shadow-md dark:bg-gray-900">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">CMS</h1>
          <form onSubmit={submitHandler} className="mt-6">
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="absolute right-3 top-3">
                  <MdOutlineMailOutline size={20} />
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="absolute right-3 top-3">
                  <BiLock size={20} />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg bg-primary hover:bg-opacity-90"
            >
              Sign In
            </button>
          </form>

          {/* Reset Password Link */}
          <div className="mt-6 text-center">
            <p
              className="text-gray-700 cursor-pointer dark:text-gray-300"
              onClick={() => setIsResetModalOpen(true)}
            >
              Reset Password
            </p>
          </div>

          {/* Reset Password Modal */}
          {isResetModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
              <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-md dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                  Reset Password
                </h2>
                <form onSubmit={resetPasswordHandler}>
                  <div className="mb-4">
                    <label
                      htmlFor="resetUserID"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
                    >
                      User ID
                    </label>
                    <div className="relative">
                      <input
                        id="resetUserID"
                        name="resetUserID"
                        value={resetFormData.userID}
                        onChange={(e) =>
                          setResetFormData({ ...resetFormData, userID: e.target.value })
                        }
                        type="text"
                        placeholder="Enter user ID"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="newPassword"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        value={resetFormData.newPassword}
                        onChange={(e) =>
                          setResetFormData({ ...resetFormData, newPassword: e.target.value })
                        }
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="absolute right-3 top-3">
                        <BiLock size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white rounded-lg bg-primary hover:bg-opacity-90"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
                <button
                  className="mt-4 text-sm text-gray-600 cursor-pointer dark:text-gray-300"
                  onClick={() => setIsResetModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
