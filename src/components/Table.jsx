const Table = ({children}) => {
    return (
        <div
            className="border text-center border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 rounded-md">
            <div
                className=" overflow-x-auto scroll-x scrollbar scrollbar-thumb-primary scrollbar-track-form-stroke scrollbar-thumb-rounded scrollbar-h-1.5">
                <table className="w-full table-auto">
                    {children}
                </table>
            </div>
        </div>
    );
}

export default Table