import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import FileUploadService from 'src/services/Chat/FileUploadService';
import { ChatRoomDTO, Message } from 'src/types/dto';
import ArticleIcon from '@mui/icons-material/Article';
import moment from 'moment';


interface ChatItemOtherDTO {
  message: Message,
  userContact: ChatRoomDTO | null
}


function ChatItemOther({ message , userContact }: ChatItemOtherDTO) {

  const [attachments , setAttachments] = useState<{url: string , type: string , name:string}[]>([]);

  useEffect(() => {

    const processAttachments = async () => {
      const _attachments = await FileUploadService.getAttachment(message.attachments);
      setAttachments(_attachments);
    };

    processAttachments();

  } , [message.attachments]);

  const trimAndEllipsis = (inputString:string, maxLength:number) => {
    const extension = inputString.split('.')[inputString.split('.').length-1];
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength - 3) + '... ' + `.${extension}`;
    } else {
      return inputString;
    }
  };

  const handleRenderAttachments = (max:number) => {
    if(max == 1){
      return (
        <>
          {attachments[0].type == 'image' ? (
            <img
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              className='tw-rounded-md'
              src={attachments[0].url}
            />) : (
            <div className='tw-flex tw-flex-col tw-gap-2'>
              <center>
                <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 87 }} className=' tw-p-5 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                  <div >
                    <ArticleIcon sx={{ fontSize : 45 , color: 'white' }} />
                  </div>
                </div>
              </center>
              <center><label className='tw-text-[12px]'>{attachments[0].name}</label></center>
            </div>
          )}
        </>
      );
    }else if(max == 2){
      return (
        <div className='tw-w-full tw-grid tw-grid-cols-2 tw-gap-2'>
          {attachments.map((item, index) => {
            if(index == max-1){
              return (
                <div className='tw-w-full tw-h-full'>
                  {item.type == 'image' ? (
                    <img
                      key={index}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' , opacity: attachments.length - max > 0 ? 0.6 : 1 }}
                      className='tw-rounded-md'
                      src={item.url}
                      alt={`Image ${index + 1}`}
                    />) : (
                    <div className='tw-flex tw-flex-col tw-gap-2'>
                      <center>
                        <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 60 }} className=' tw-p-3 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                          <div >
                            <ArticleIcon sx={{ fontSize : 30 , color: 'white' }} />
                          </div>
                        </div>
                      </center>
                      <center><label className='tw-text-sm'>{trimAndEllipsis(item.name , 10)}</label></center>
                    </div>
                  )}
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <>
                  {item.type == 'image' ? (
                    <img
                      key={index}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      className='tw-rounded-md'
                      src={item.url}
                      alt={`Image ${index + 1}`}
                    />) : (
                    <div className='tw-flex tw-flex-col tw-gap-2'>
                      <center>
                        <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 60 }} className=' tw-p-3 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                          <div >
                            <ArticleIcon sx={{ fontSize : 30 , color: 'white' }} />
                          </div>
                        </div>
                      </center>
                      <center><label className='tw-text-sm'>{trimAndEllipsis(item.name , 10)}</label></center>
                    </div>
                  )}
                </>
              );
            }
          }
          )}
                
        </div>
  
      );

    }else{
      return (
        <div className='tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-2'>
          {attachments.map((item, index) => {
            if(index == max-1){
              return (
                <div className='tw-w-full tw-h-fulls'>
                  {item.type == 'image' ? (
                    <img
                      key={index}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' , opacity: attachments.length - max > 0 ? 0.6 : 1 }}
                      className='tw-rounded-md'
                      src={item.url}
                      alt={`Image ${index + 1}`}
                    />) : (
                    <div className='tw-flex tw-flex-col tw-gap-2'>
                      <center>
                        <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 60 }} className=' tw-p-3 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                          <div >
                            <ArticleIcon sx={{ fontSize : 30 , color: 'white' }} />
                          </div>
                        </div>
                      </center>
                      <center><label className='tw-text-sm'>{trimAndEllipsis(item.name , 10)}</label></center>
                    </div>
                  )}
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <>
                  {item.type == 'image' ? (
                    <img
                      key={index}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      className='tw-rounded-md'
                      src={item.url}
                      alt={`Image ${index + 1}`}
                    />) : (
                    <div className='tw-flex tw-flex-col tw-gap-2'>
                      <center>
                        <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 60 }} className=' tw-p-3 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                          <div >
                            <ArticleIcon sx={{ fontSize : 30 , color: 'white' }} />
                          </div>
                        </div>
                      </center>
                      <center><label className='tw-text-sm'>{trimAndEllipsis(item.name , 10)}</label></center>
                    </div>
                  )}
                </>
              );
            }
          }
                
          )}
                
        </div>
      );
    }

  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDateDisplay = (date:any) => {
    const d = moment(new Date(date.seconds * 1000));
    const now = moment();
  
    const diff = now.diff(d, 'days');
    
    if (diff === 0) {
      return d.format('h:mmA');
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (now.year() === d.year()) {
      return d.format('MMM D');
    } else {
      return d.format('YYYY/MM/DD');
    }
  };

  if(message.type == 'Call'){
    true;
  }else if(message.attachments.length > 0){
    return(

      <div className="tw-w-full tw-flex tw-gap-3">

        <Avatar src={userContact ? userContact.contats.dp : ''} sx={{ width: 30, height: 30 }} />

        <div className="tw-bg-[#383838] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[400px]">

          <label className="tw-text-[#06CF9C] tw-text-xs">{userContact && userContact.contats.contactName}</label>

          {attachments.length == 1 && (
            handleRenderAttachments(1)
          )}

          {(attachments.length < 4 && attachments.length > 1) && handleRenderAttachments(2)}

          {attachments.length > 4 && handleRenderAttachments(4)}

          <p className="tw-text-xs tw-mt-1">
            {message.message && message.message}
          </p>

          <div className="tw-flex tw-justify-end">
            <label className="tw-text-[#7D7D7D] tw-text-[10px] tw-font-semibold">{formatDateDisplay(message.timestamp)}</label>
          </div>

        </div>

      </div>
    );
  }else{

    return (
      <div className="tw-w-full tw-flex tw-gap-3">

        <Avatar src={userContact ? userContact.contats.dp : ''} sx={{ width: 30, height: 30 }} />

        <div className="tw-bg-[#383838] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[400px]">

          <label className="tw-text-[#06CF9C] tw-text-xs">{userContact && userContact.contats.contactName}</label>

          <p className="tw-text-xs tw-mt-1">
            {message.message && message.message}
          </p>

          <div className="tw-flex tw-justify-end">
            <label className="tw-text-[#7D7D7D] tw-text-[10px] tw-font-semibold">{formatDateDisplay(message.timestamp)}</label>
          </div>

        </div>

      </div>
    );

  }


}

export default ChatItemOther;