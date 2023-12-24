import ContactDetailsSingleDialog from '../../dialogs/ContactDetailsDialogSingle';
import { ChatRoomDTO } from 'src/types/dto';
import CallMainDialog from '../../dialogs/call/CallMainDialog';
import SearchIcon from '@mui/icons-material/Search';


interface SelectedChatHeaderDTO {
    selectedChat: ChatRoomDTO 
}


function SelectedChatHeader({selectedChat}: SelectedChatHeaderDTO) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)' }} className="tw-bg-[#272727] tw-w-full tw-py-2 tw-px-3 tw-flex tw-justify-between">

      {/* <ContactDetailsDialog selectedChat={selectedChat} /> */}

      <ContactDetailsSingleDialog selectedChat={selectedChat} />

      <div className="tw-ml-2 tw-flex tw-gap-2">

        <CallMainDialog calleeId={selectedChat.contats.userUID} calleeDp={selectedChat.contats.dp} calleeName={selectedChat.contats.contactName} />

        <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
          <SearchIcon sx={{ width: 16 }} />
        </div>

      </div>

    </div>
  );
}

export default SelectedChatHeader;