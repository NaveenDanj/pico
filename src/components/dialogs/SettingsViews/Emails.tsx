import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LanguageIcon from '@mui/icons-material/Language';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PasswordIcon from '@mui/icons-material/Password';
import { useState , useEffect } from 'react';
import { Alert } from '@mui/material';
import MailSettingService from 'src/services/Email/MailSettingService';
import AuthService from 'src/services/Auth/AuthService';
import axios from 'axios';


function Emails() {

  const [error , setError] = useState('')
  const [success , setSuccess] = useState('')

  const [email , setEmail] = useState('')
  const [host , setHost] = useState('')
  const [port , setPort] = useState('')
  const [password , setPassword] = useState('')

  // const agent = new https.Agent({ rejectUnauthorized: false });


  useEffect(() => {
    fetchMailSettings()
  }, [])

  const fetchMailSettings = async () =>{
    const res = await MailSettingService.importEmailSettings()

    if(!res){
      setError('Something went wrong while fetching data. Please try again!')
      return
    } 

    setEmail(res.email)
    setHost(res.host)
    setPort(res.port+'')
    setPassword(res.password)

    const functionURL = 'http://127.0.0.1:5001/pico-cloud/us-central1/fetchEmails';

    const token = await AuthService.getCurrentUserToken()

    axios.get(functionURL , {
      headers: {
        'Authorization': `Bearer ${token}`,
      }})


  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess('')
    setError('')

    const res = await MailSettingService.setupEmailSettings(email , host , port , password)

    if(!res){
      setError('Something went wrong. Please try again!')
    }else{
      setSuccess('Your email account imported successfully!')
    }

  }


  return (
    <form onSubmit={handleSubmit} className='tw-w-full tw-flex tw-flex-col tw-pb-8 tw-mb-5'>
      <h2 className='tw-mt-1 tw-text-lg tw-font-semibold'>Email Settings</h2>

      <div className='tw-mt-6'>

      </div>

      {error != '' && (<><Alert variant="outlined" severity="error">{error}</Alert></>)}
      {success != '' && (<><Alert variant="outlined" severity="success">{success}</Alert></>)}

      <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col tw-gap-0'>


        <div>
          <AlternateEmailIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Username</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input onChange={(e) => setEmail(e.target.value)} value={email} required type='email' placeholder='Enter email address' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Enter your full email address as the username. Example: yourname@example.com.</label>
      </div>

      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <LanguageIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Host</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input onChange={(e) => setHost(e.target.value)} value={host} required type='text' placeholder='Enter the incoming mail server' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Enter the incoming mail server (IMAP/POP) for your email provider. This information is usually provided by your email service. Example: imap.youremailprovider.com or pop.youremailprovider.com.</label>
      </div>

      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <ImportExportIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Port</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input onChange={(e) => setPort(e.target.value)} value={port} required type='text' placeholder='Enter the port number' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Specify the port number for the incoming mail server. Common values include 993 for IMAP or 995 for POP. Refer to your email provider's documentation for the correct port number.</label>
      </div>

      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <PasswordIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Password</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input onChange={(e) => setPassword(e.target.value)} value={password} required type='password' placeholder='Enter the password' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Provide the password associated with your email account. Ensure it is secure and unique. This password is used to authenticate your account with the email server.</label>
      </div>

      <div className='tw-w-full tw-mt-8 tw-flex tw-flex-col tw-gap-0'>
        <button type='submit' className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-white'>Update</button>
      </div>

      <div className='tw-w-full tw-p-3 tw-mt-4 tw-flex tw-flex-col tw-gap-0'></div>

    </form >
  )
}

export default Emails