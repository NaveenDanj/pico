import AutorenewIcon from '@mui/icons-material/Autorenew';

function Loading() {
    return (
        <div className="tw-fixed tw-inset-0 tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 tw-z-50">
            <div className="tw-text-white tw-text-4xl">
                <AutorenewIcon className="tw-animate-spin" />
            </div>
        </div>
    )
}

export default Loading