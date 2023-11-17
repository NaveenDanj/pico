import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import ChatNameItem from 'src/components/chat/ChatNameItem';
import './index.css'
import AddContactDialog from 'src/components/dialogs/AddContactDialog';
import { useEffect, useState } from 'react';
import ContactService from 'src/services/Contact/ContactService';
import { ChatContact } from 'src/types/dto';

function Chat() {

  const [chats, setChats] = useState<ChatContact[]>([])

  useEffect(() => {
    fetchChats();
  }, [])

  const fetchChats = async () => {
    const _chats = await ContactService.loadUserContact();
    setChats(_chats.contacts);
  }

  return (
    <div>

      <div className="tw-px-5 tw-mt-4 ">

        <div className="tw-flex tw-justify-between">

          <h1 className="tw-text-lg tw-font-bold tw-my-auto">Chats</h1>

          <div className="tw-flex tw-gap-1 tw-my-auto">

            <AddContactDialog />

            <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center  tw-rounded-md hover:tw-bg-[#333333]">
              <GroupIcon sx={{ width: 16 }} />
            </div>

          </div>

        </div>

        <div className='tw-mt-3'>

          <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-px-1 tw-rounded-sm'>
            <input type='text' placeholder='Search or start new chat' className='tw-w-full  tw-p-1 tw-text-xs' />
            <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
          </div>

        </div>

      </div>

      <div style={{ height: 'calc(100vh - 92px)' }} className='tw-px-5 tw-py-7 tw-flex tw-flex-col tw-gap-3 tw-overflow-y-auto'>

        <div className='tw-w-full tw-flex tw-justify-between tw-bg-[#4D4D4D] tw-p-2 tw-rounded-md tw-cursor-pointer'>

          <div className='tw-flex tw-gap-4'>

            <Avatar />

            <div className='tw-flex tw-flex-col'>
              <label className='tw-text-sm tw-font-medium'>Okkomala ekata</label>
              <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Check this out</label>
            </div>

          </div>

          <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>1:00 PM</label>

        </div>
        {chats.map((item) => (<ChatNameItem chatItem={item} />))}
      </div>

    </div>
  )
}

export default Chat