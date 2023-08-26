import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

function Register() {
    return (
        <div className="tw-w-full tw-h-[100vh] tw-items-center tw-justify-center tw-flex">

            <div className="tw-flex tw-flex-col tw-flex-grow tw-max-w-[650px]">
                <div className="tw-w-full tw-flex tw-justify-center tw-p-1">
                    <h2 className="tw-text-2xl tw-font-semibold ">Pico-WEB</h2>
                </div>

                <div className="tw-w-full tw-bg-[#132036] tw-py-3 tw-mb-7 tw-px-5 tw-rounded-md tw-mt-5">
                    <label className="tw-text-lg tw-font-semibold">Create Account</label>

                    <div className='tw-gap-5 tw-grid tw-mt-5 tw-grid-container tw-grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>

                        <div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-3">
                                <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">First Name</label>
                                <input type="text" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your email" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>


                            <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-5">
                                <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Last Name</label>
                                <input type="text" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your password" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>

                        </div>

                        <div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-3">
                                <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Email Address</label>
                                <input type="text" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your email" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>


                            <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-5">
                                <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Password</label>
                                <input type="password" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your password" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>

                        </div>


                    </div>


                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="tw-w-full tw-mt-5 tw-pb-7">
                        <button className="tw-bg-[#1F54C8] tw-w-full">Account Register</button>
                    </div>

                    <div className="tw-mt-3">
                        <center><label className="tw-text-xs tw-font-bold">OR USE WITH</label></center>

                        <div className="tw-flex tw-justify-around  tw-mt-3">
                            <button className="tw-bg-[#203047] tw-w-[250px] tw-text-[#94a3b8]">
                                <GoogleIcon sx={{ fontSize: 20 }} />
                                <label className='tw-text-sm tw-font-bold tw-ml-3'>Google</label>
                            </button>
                            <button className="tw-bg-[#203047] tw-w-[250px] tw-text-[#94a3b8]">
                                <FacebookOutlinedIcon sx={{ fontSize: 20 }} />
                                <label className='tw-text-sm tw-font-bold tw-ml-3'>Facebook</label>
                            </button>
                        </div>

                    </div>

                    {/* <div className="tw-mt-3">
                        <center><label className="tw-text-xs tw-font-bold">OR USE WITH</label></center>

                        <div className="tw-flex tw-justify-around tw-mt-3">
                            <button className="tw-bg-[#203047] tw-w-[150px] tw-text-[#94a3b8]">
                                <GoogleIcon sx={{ fontSize: 20 }} />
                                <label className='tw-text-sm tw-font-bold tw-ml-3'>Google</label>
                            </button>
                            <button className="tw-bg-[#203047] tw-w-[150px] tw-text-[#94a3b8]">
                                <FacebookOutlinedIcon sx={{ fontSize: 20 }} />
                                <label className='tw-text-sm tw-font-bold tw-ml-3'>Facebook</label>
                            </button>
                        </div>

                    </div> */}

                </div>

                <center>
                    <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Don't have an account? Register</label>
                </center>

            </div>

        </div>
    )
}

export default Register