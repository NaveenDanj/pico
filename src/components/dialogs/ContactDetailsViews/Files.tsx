import FileItem from './FileItem';

function Files() {
  return (
    <div className='tw-w-full tw-pt-2'>
      <label className='tw-text-lg tw-font-thin tw-my-auto'>Files</label>

      <div className='tw-gap-1 tw-flex tw-flex-col tw-mt-5 tw-w-full '>

        <div className="tw-h-[500px] tw-gap-3 tw-pr-2 tw-overflow-y-auto tw-w-full tw-flex tw-flex-col">

          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />

        </div>

      </div>

    </div>
  );
}

export default Files;