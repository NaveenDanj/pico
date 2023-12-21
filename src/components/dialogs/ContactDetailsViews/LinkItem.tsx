import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';

function LinkItem() {
  return (
    <div className="tw-flex hover:tw-bg-[#3C3C3C] tw-p-1 tw-rounded-md tw-w-full">

      <div className="tw-p-3 tw-rounded-lg tw-flex tw-bg-[#393939] tw-justify-center tw-items-center">
        <AttachmentOutlinedIcon className='tw-my-auto' sx={{ fontSize: 38 }} />
      </div>

      <div className='tw-flex tw-flex-col tw-pl-3 tw-my-auto'>

        <label className='tw-text-sm'>Papers.txt</label>

        <div className='tw-w-[300px] tw-break-words '>
          <p className='tw-text-[10px]  tw-text-[#B2B2B2]'>https://mail.google.com/mail/u/1/#inbox/FMfcgzGtwqGQpFbHPsDwmnVPLWHsmPDt</p>
        </div>

      </div>

    </div>
  );
}

export default LinkItem;