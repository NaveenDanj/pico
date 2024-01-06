import { useEffect, useState } from 'react';
import FileUploadService from 'src/services/Chat/FileUploadService';
import { Message } from 'src/types/dto';
import ArticleIcon from '@mui/icons-material/Article';

interface ChatItemUserDTO {
  message: Message
}

function ChatItemUser({ message }: ChatItemUserDTO) {

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


  const RenderAttachmentItemComponent = (item : {url: string;type: string; name: string;}) => {
    return (
      <>
        {item.type == 'image' ? (
          <img
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            className='tw-rounded-md'
            src={item.url}
          />) : (
          <div className='tw-flex tw-flex-col tw-gap-2'>
            <center>
              <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 87 }} className=' tw-p-5 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                <div >
                  <ArticleIcon sx={{ fontSize : 45 , color: 'white' }} />
                </div>
              </div>
            </center>
            <center><label className='tw-text-[12px]'>{trimAndEllipsis(item.name , 10)}</label></center>
          </div>
        )}
      </>
    );
  };


  const handleRenderAttachments = (max:number) => {
    if(max == 1){
      return (
        <>
          {RenderAttachmentItemComponent(attachments[0])}
        </>
      );
    }else if(max == 2){
      return (

        <div className='tw-w-full tw-grid tw-grid-cols-2 tw-gap-2'>
          {attachments.map((item, index) => {
            if(index == max-1){
              return (
                <div className='tw-w-full tw-h-full'>
                  {RenderAttachmentItemComponent(item)}
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <>
                  {RenderAttachmentItemComponent(item)}
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
                  {RenderAttachmentItemComponent(item)}
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <>
                  {RenderAttachmentItemComponent(item)}
                </>
              );
            }
          }
                
          )}
                
        </div>
      );
    }

  };


  if(message.attachments.length > 0){
    return (
      <div className="tw-w-full tw-flex tw-gap-3 tw-justify-end">
        <div className="tw-bg-[#035D4D] tw-flex tw-flex-col tw-rounded-sm tw-py-3 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[400px]">

          {attachments.length == 1 && (
            handleRenderAttachments(1)
          )}

          {(attachments.length < 4 && attachments.length > 1) && handleRenderAttachments(2)}

          {attachments.length > 4 && handleRenderAttachments(4)}

          <div className='tw-flex tw-justify-between tw-mt-2'>
            <p className="tw-my-auto tw-text-xs">
              {message.message && message.message}
            </p>

            <div className="tw-flex tw-justify-between tw-my-auto tw-max-h-[10px]">
              <label className="tw-text-[#64988E] tw-text-[10px] tw-font-semibold tw-my-auto" style={{ whiteSpace: 'nowrap' }}>
          1:13 PM
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }else{

    return (
      <div className="tw-w-full tw-flex tw-gap-3 tw-justify-end">
  
        <div className="tw-bg-[#035D4D] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[650px]">
  
          <p className="tw-text-xs tw-mt-1">
            {message.message && message.message}
          </p>
  
          <div className="tw-flex tw-justify-end">
            <label className="tw-text-[#64988E] tw-text-[10px] tw-font-semibold">1:13 PM</label>
          </div>
  
        </div>
  
      </div>
    );

  }


}

export default ChatItemUser;