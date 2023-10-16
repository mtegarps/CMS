import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Image from "next/image";
import SidebarLinkGroup from "@/components/SidebarLinkGroup";
import { MdEmail } from "react-icons/md";
import { GoLog, GoReport } from "react-icons/go";
import { CgTemplate } from "react-icons/cg";
import { AiOutlineDatabase } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi"; // Import the Batch Data icon

const Sidebar = (props) => {
  const router = useRouter();
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [cookies] = useCookies(["role", "name"]);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  

  const [name, setName] = useState("");

  useEffect(() => {
    setName(cookies.name);
  }, [cookies.name]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-99 flex h-screen w-62.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear 
      dark:bg-boxdark lg:static lg:translate-x-0
      ${props.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      ${props.hideSidebar && "lg:-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/dashboard" className={`relative w-[8.5rem] h-[2.5rem]`}>
          <Image
            src="/images/logo/logo.jpg"
            alt="Logo"
            layout="responsive"
            width={85}
            height={25}
          />
        </Link>

        {/* <button
        
          ref={trigger}
          onClick={(e) => {
            e.stopPropagation();
            props.setHideSidebar(!props.hideSidebar);
          }}
          // onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={props.sidebarOpen}
          className="block text-white focus:outline-none "
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
              fill=""
            />
          </svg>
        </button> */}
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <div className="px-6 py-5.5 lg:py-6.5">
          <h1 className="text-white">Selamat Datang,{" "} {name}</h1>
        </div>
        <nav className="px-4 py-4 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  router.pathname === "/" || router.pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${router.pathname.includes("/batch-data") && "bg-graydark dark:bg-meta-4"
                          }`}
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                      // }}
                      >
                        Dashboard
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>


              <SidebarLinkGroup
                activeCondition={router.pathname.includes("/user-management")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(router.pathname === "/" ||
                          router.pathname.includes("user-management")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        User Management
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate ease-linear
                         transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {name === "Administrator" && (
                            <li>
                              <Link
                                href="/user-management/users"
                                className={`flex items-center space-x-3 ${router.pathname.includes("/users") ? "text-white" : ""
                                  }`}
                              >
                                <HiUserGroup />
                                <span>User</span>
                              </Link>
                            </li>
                          )}

                          <li>
                            <Link
                              href="/user-management/activitylog"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/activitylog") ? "text-white" : ""
                                }`}
                            >
                              <GoLog />
                              <span>Activity Log</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={router.pathname.includes("/email/")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${router.pathname.includes("/email") && "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Email
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/email/campaign"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/campaign")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <GoLog />
                              <span>Campaign</span>
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/email/template"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/template")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <CgTemplate />
                              <span>Template</span>
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/email/log"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/log")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <GoLog />
                              <span>Log</span>
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/email/report"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/report")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <GoReport />
                              <span>Report</span>
                            </Link>
                          </li>

                          {/* <li>
                            <Link
                              href="/email/media"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/media")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <CgTemplate />
                              <span>Media</span>
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/email/analytic"
                              className={`flex items-center space-x-3 ${router.pathname.includes("/email/analytic")
                                ? "text-white"
                                : ""
                                }`}
                            >
                              <CgTemplate />
                              <span>Analytic</span>
                            </Link>
                          </li> */}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>




            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
