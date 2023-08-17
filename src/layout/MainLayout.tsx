import { Outlet } from "react-router-dom"
import Sidebar from "src/components/global/Sidebar"
import ChatView from "src/components/chatsection/ChatView";
// import StoryView from "src/components/story/StoryView";


function MainLayout() {
    return (
        <div className="tw-w-full tw-h-[100vh] tw-flex">

            <Sidebar />

            <div style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }} className="tw-max-w-[300px] tw-bg-[#272727] tw-flex-grow tw-min-w-[240px]">
                <Outlet />
            </div>

            <div className="tw-flex tw-flex-col tw-flex-grow">
                <ChatView />
                {/* <StoryView /> */}
            </div>

        </div>
    )
}

export default MainLayout