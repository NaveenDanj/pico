import ArticleIcon from '@mui/icons-material/Article';

function FileItem() {
  return (
    <div className="tw-flex hover:tw-bg-[#3C3C3C] tw-p-1 tw-rounded-md tw-w-full">

      <div className="tw-p-3 tw-rounded-lg tw-flex tw-bg-[#393939] tw-justify-center tw-items-center">
        <ArticleIcon className='tw-my-auto' sx={{ fontSize: 38 }} />
      </div>

      <div className='tw-flex tw-flex-col tw-ml-3 tw-my-auto'>
        <label className='tw-text-sm'>Papers.txt</label>
        <label className='tw-text-[10px] tw-text-[#B2B2B2]'>53 bytes, Text Document</label>
      </div>

    </div>
  );
}

export default FileItem;