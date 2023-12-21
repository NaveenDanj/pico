import SearchIcon from '@mui/icons-material/Search';
import ArchivedItem from 'src/components/archived/ArchivedItem';

function Archived() {
  return (
    <div>

      <div className="tw-px-5 tw-mt-4 ">

        <div className="tw-flex tw-justify-between">

          <h1 className="tw-text-lg tw-font-bold tw-my-auto">Archived</h1>

        </div>

        <div className='tw-mt-3'>

          <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-px-1 tw-mb-3 tw-rounded-sm'>
            <input type='text' placeholder='Search archived messages' className='tw-w-full  tw-p-1 tw-text-xs' />
            <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
          </div>

          <label className="tw-text-[898989] tw-mt-5 tw-text-[12px] tw-font-semibold">Messages</label>

        </div>

      </div>

      <div style={{ height: 'calc(100vh - 120px)' }} className='tw-px-5 tw-py-4 tw-flex tw-flex-col tw-gap-3 tw-overflow-y-auto'>

        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />
        <ArchivedItem />

      </div>

    </div>
  );
}

export default Archived;