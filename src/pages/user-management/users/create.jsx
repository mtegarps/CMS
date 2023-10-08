import Layout from "@/components/Layout";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";
import {AiOutlineLoading} from "react-icons/ai";
import Swal from "sweetalert2";

const Page = ({roles}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: null,
        birthPlace: "",
        birthDate: "",
        address: "",
        companyID: "",
        roleID: "",
    });

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true)
        const token = getCookie('token'); // Get the token from cookies
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, formData, {
            headers: {
                "x-access-token": token,
            },
        }).then(() => {
            setLoading(false)
            return router.push("/user-management/users");
        }).catch(async error => {
            await Swal.fire('Error', error.response.data.message, 'error')
            setLoading(false)
        })
    };
    return (
        <Layout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div
                    className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Users Form</h3>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                            <div className="mb-4.5">
                                <label htmlFor={"email"} className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    value={formData.email}
                                    type="email"
                                    name={"email"}
                                    id={"email"}
                                    placeholder="Masukan alamat Email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={"phone"} className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    value={formData.phone}
                                    type="number"
                                    name={"phone"}
                                    id={"phone"}
                                    placeholder="Masukan nomor telepon"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={"password"} className="mb-2.5 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    value={formData.password}
                                    type="password"
                                    name={"password"}
                                    id={"password"}
                                    placeholder="Masukan alamat Email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={`firstName`} className="mb-2.5 block text-black dark:text-white">
                                    First Name
                                </label>
                                <input
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    name={`firstName`}
                                    id={`firstName`}
                                    type="text"
                                    placeholder="Masukan nama depan"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={"lastName"} className="mb-2.5 block text-black dark:text-white">
                                    Last Name
                                </label>
                                <input
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    name={`lastName`}
                                    id={`lastName`}
                                    type="text"
                                    placeholder="Masukan nama belakang"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className={`mb-4.5`}>
                                <label className="block mb-3 text-black dark:text-white">Jenis kelamin</label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({...formData, gender: parseInt(e.target.value)})}
                                        className="relative z-20 w-full px-12 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    >
                                        <option value="" selected disabled>
                                            Pilih jenis kelamin
                                        </option>
                                        <option value="1">Laki - Laki</option>
                                        <option value="2">Wanita</option>
                                    </select>
                                    <span className="absolute z-10 -translate-y-1/2 top-1/2 right-4">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={"birthPlace"} className="mb-2.5 block text-black dark:text-white">
                                    Tempat Lahir
                                </label>
                                <input
                                    value={formData.birthPlace}
                                    onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                                    name={`birthPlace`}
                                    id={`birthPlace`}
                                    type="text"
                                    placeholder="Masukan tempat lahir"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="block mb-3 text-black dark:text-white">Tanggal lahir</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name={formData.birthDate}
                                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label htmlFor={`firstName`} className="mb-2.5 block text-black dark:text-white">
                                    Alamat
                                </label>
                                <input
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    name={`address`}
                                    id={`address`}
                                    type="text"
                                    placeholder="Masukan alamat user"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className={`mb-4.5`}>
                                <label className="block mb-3 text-black dark:text-white">Role</label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        onChange={(e) => setFormData({...formData, roleID: e.target.value})}
                                        className="relative z-20 w-full px-12 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((role, index) => (
                                            <option key={index} value={role.roleID}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute z-10 -translate-y-1/2 top-1/2 right-4">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                                </div>
                            </div>

                            <div className={`mb-4.5`} style={{display: 'none'}}>
                                <label className="block mb-3 text-black dark:text-white">Company</label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    {/* Input tersembunyi untuk menyimpan companyID */}
                                    <input
                                        type="hidden"
                                        value={formData.companyID}
                                        onChange={(e) => setFormData({...formData, companyID: e.target.value})}
                                    />

                                    {/* Placeholder text */}
                                    <span className="absolute z-20 px-3 py-2 text-gray-400">Placeholder Text</span>

                                    <span className="absolute z-10 -translate-y-1/2 top-1/2 right-4">
      <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              fill="#637381"
          ></path>
        </g>
      </svg>
    </span>
                                </div>
                            </div>


                            <button
                                type={`submit`}
                                disabled={loading}
                                className="self-center h-12 flex items-center space-x-2 justify-center font-medium rounded bg-primary text-gray disabled:bg-primary/75 disabled:cursor-not-allowed"
                            >
                                <span>Kirim</span>
                                {
                                    loading ?
                                        <>
                                            <AiOutlineLoading className={`animate-spin`}/>
                                        </>
                                        :

                                        ""
                                }


                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const roles =
        (await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/role/getAll`, {
                headers: {
                    "x-access-token": context.req.cookies.token,
                },
            })
            .then((res) => res.data.data)) || [];
    return {
        props: {
            roles
        },
    };
}

export default Page;