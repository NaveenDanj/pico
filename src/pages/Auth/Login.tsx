import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'


import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useState } from 'react';
import AuthService from 'src/services/Auth/AuthService';
import { Alert } from '@mui/material';
import Loading from 'src/components/global/Loading';
import { setUser } from "src/store/slices/UserSlice";
import { UserData } from "src/types/dto";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const res = await AuthService.login(email, password)
        setLoading(false)

        if (res.success) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const data: UserData = AuthService.getUserData(res.user)
            dispatch(setUser(data))
            navigate('/');
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (res.error.code == 'auth/invalid-login-credentials') {
                setError('Username or password is incorrect')
            }

        }

    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="tw-w-full tw-h-[100vh] tw-items-center tw-justify-center tw-flex">

            <div className="tw-flex tw-flex-col tw-flex-grow tw-max-w-[450px]">
                <div className="tw-w-full tw-flex tw-justify-center tw-p-1">
                    <h2 className="tw-text-2xl tw-font-semibold ">Pico-WEB</h2>
                </div>

                <form onSubmit={handleLogin} className="tw-bg-[#132036] tw-py-5 tw-mb-7 tw-px-5 tw-rounded-md tw-mt-5">

                    {error != '' && (<><Alert variant="outlined" severity="error">{error}</Alert><br /></>)}
                    <label className="tw-mt-1 tw-text-lg tw-font-semibold">Login</label>

                    <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-3">
                        <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Email Address</label>
                        <input required onChange={(e) => setEmail(e.target.value)} type="text" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your email" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>


                    <div className="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-mt-5">
                        <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Password</label>
                        <input required onChange={(e) => setPassword(e.target.value)} type="password" className="tw-p-2 tw-text-md tw-rounded-md" placeholder="Enter your password" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>

                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="tw-w-full tw-mt-5 tw-pb-7">
                        <button type="submit" className="tw-bg-[#1F54C8] tw-w-full">Sign In</button>
                    </div>

                    <div className="tw-mt-3">
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

                    </div>

                </form>

                <center>
                    <label className="tw-text-sm tw-text-[#9499A3] tw-font-semibold">Don't have an account? Register</label>
                </center>

            </div>

        </div>
    )
}

export default Login