import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LanguageIcon from '@mui/icons-material/Language';
import ImportExportIcon from '@mui/icons-material/ImportExport';
function Emails() {
  return (
    <div className='tw-w-full tw-pb-8 tw-mb-5'>
      <h2 className='tw-mt-1 tw-text-lg tw-font-semibold'>Email Settings</h2>


      <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col tw-gap-0'>

        <div>
          <AlternateEmailIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Username</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input required type='email' placeholder='Enter email address' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Enter your full email address as the username. Example: yourname@example.com.</label>
      </div>


      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <LanguageIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Host</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input required type='text' placeholder='Enter the incoming mail server' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Enter the incoming mail server (IMAP/POP) for your email provider. This information is usually provided by your email service. Example: imap.youremailprovider.com or pop.youremailprovider.com.</label>
      </div>


      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <ImportExportIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Port</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input required type='text' placeholder='Enter the port number' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Specify the port number for the incoming mail server. Common values include 993 for IMAP or 995 for POP. Refer to your email provider's documentation for the correct port number.</label>
      </div>


      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-0'>
        <div>
          <ImportExportIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Password</label>
        </div>

        <div className='tw-mt-2 tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
          <input required type='password' placeholder='Enter the password' className='tw-w-full  tw-p-1 tw-text-xs' />
        </div>

        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Provide the password associated with your email account. Ensure it is secure and unique. This password is used to authenticate your account with the email server.</label>
      </div>

      <div className='tw-w-full tw-mt-8 tw-flex tw-flex-col tw-gap-0'>
        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-white'>Update</button>
      </div>

      <div className='tw-w-full tw-p-3 tw-mt-4 tw-flex tw-flex-col tw-gap-0'></div>

    </div >
  )
}

export default Emails