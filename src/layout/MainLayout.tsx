import { Avatar } from "@mui/material"
import { Outlet } from "react-router-dom"
import Sidebar from "src/components/global/Sidebar"
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
function MainLayout() {
    return (
        <div className="tw-w-full tw-h-[100vh] tw-flex">

            <Sidebar />

            <div style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }} className="tw-max-w-[300px] tw-bg-[#272727] tw-flex-grow tw-min-w-[240px]">
                <Outlet />
            </div>

            <div className="tw-flex tw-flex-col tw-flex-grow">

                <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)' }} className="tw-w-full tw-py-2 tw-px-3 tw-flex tw-justify-between">
                    <div className='tw-flex tw-gap-4'>

                        <Avatar />

                        <div className='tw-flex tw-flex-col'>
                            <label className='tw-text-sm tw-font-medium'>Okkomala ekata</label>
                            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Naveen Dhananjaya, Ashan cs</label>
                        </div>

                    </div>

                    <div className="tw-ml-2 tw-flex tw-gap-2">

                        <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                            <EmailIcon sx={{ width: 16 }} />
                        </div>

                        <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                            <SearchIcon sx={{ width: 16 }} />
                        </div>

                    </div>

                </div>

                <div style={{ height: 'calc(100vh - 16px)', backgroundImage: 'url(./pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px 250px' }} className="tw-w-full">

                </div>

            </div>

        </div>
    )
}

export default MainLayout