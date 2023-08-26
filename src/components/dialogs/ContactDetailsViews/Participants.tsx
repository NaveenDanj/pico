import SearchIcon from '@mui/icons-material/Search';
import ContactNameItem from './ContactNameItem';

function Participants() {
    return (
        <div className='tw-w-full tw-pt-2'>
            <label className='tw-text-lg tw-font-thin tw-my-auto'>Participants</label>

            <div className="tw-w-full tw-mt-5">

                <div>
                    <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
                        <input type='text' placeholder='Search' className='tw-w-full  tw-p-1 tw-text-xs' />
                        <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
                    </div>
                </div>

            </div>

            <div className='tw-w-full tw-mt-2 tw-h-[480px] tw-overflow-y-auto tw-flex tw-flex-col tw-gap-1 tw-pt-3'>
                <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem />
                {/* <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem />
                <ContactNameItem /> */}
            </div>

        </div>
    )
}

export default Participants