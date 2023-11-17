import Dialog from '@mui/material/Dialog';
import AutorenewIcon from '@mui/icons-material/Autorenew';


interface ParamDTO {
    isOpen: boolean
}

function LoadingDialog({ isOpen }: ParamDTO) {

    return (
        <div>

            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "300px",
                        },
                    },
                }}
            >

                <div className='tw-flex tw-w-full tw-h-full'>
                    <div className='tw-flex tw-flex-grow tw-justify-center tw-p-3 tw-bg-[#303030] tw-overflow-y-auto'>
                        <AutorenewIcon className="tw-animate-spin" />
                    </div>
                </div>

            </Dialog>

        </div>
    )
}

export default LoadingDialog