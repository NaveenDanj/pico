import ChatIcon from '@mui/icons-material/Chat';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import EmailIcon from '@mui/icons-material/Email';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
// import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from 'src/components/dialogs/SettingsDialog';
import { useNavigate } from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();

    const navigateRoute = (route: string) => {
        navigate(route);
    }

    return (
        <div style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }} className="tw-h-[100vh] tw-flex tw-flex-col tw-gap-3 tw-w-[45px] tw-bg-[#202020]">

            <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-2 tw-p-1">

                <div onClick={() => navigateRoute('/')} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md tw-bg-[#2C2C2C] hover:tw-bg-[#282828]">
                    <ChatIcon sx={{ width: 16 }} />
                </div>

                <div onClick={() => navigateRoute('/story')} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#282828]">
                    <PausePresentationIcon sx={{ width: 16 }} />
                </div>

                <div onClick={() => navigateRoute('/email')} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md hover:tw-bg-[#282828]">
                    <EmailIcon sx={{ width: 16 }} />
                </div>

            </div>

            <div className='tw-flex tw-flex-grow'>

            </div>

            <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-2 tw-p-1">

                <div onClick={() => navigateRoute('/starred')} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md hover:tw-bg-[#282828]">
                    <StarBorderIcon sx={{ width: 16 }} />
                </div>

                <div onClick={() => navigateRoute('/archived')} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#282828]">
                    <ArchiveIcon sx={{ width: 16 }} />
                </div>

                {/* <div className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md hover:tw-bg-[#282828]">
                    <SettingsIcon sx={{ width: 16 }} />
                </div> */}

                <SettingsDialog />

            </div>



        </div>
    )
}

export default Sidebar