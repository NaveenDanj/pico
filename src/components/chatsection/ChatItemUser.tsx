import { useEffect, useState } from 'react';
import FileUploadService from 'src/services/Chat/FileUploadService';
import { Message } from 'src/types/dto';

interface ChatItemUserDTO {
    message: Message
}

function ChatItemUser({ message }: ChatItemUserDTO) {

  const [attachments , setAttachments] = useState<string[]>([]);

  useEffect(() => {

    const processAttachments = async () => {
      const _attachments = await FileUploadService.getAttachment(message.attachments);
      setAttachments(_attachments);
    };

    processAttachments();

  } , [message.attachments]);


  const handleRenderAttachments = (max:number) => {

    if(max == 2){
      return (
        <div className='tw-w-full tw-grid tw-grid-cols-2 tw-gap-2'>
          {attachments.map((item, index) => {
            if(index == max-1){
              return (
                <div className='tw-w-full tw-h-full'>
                  <img
                    key={index}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' , opacity: attachments.length - max > 0 ? 0.6 : 1 }}
                    className='tw-rounded-md'
                    src={item}
                    alt={`Image ${index + 1}`}
                  />
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <img
                  key={index}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  className='tw-rounded-md'
                  src={item}
                  alt={`Image ${index + 1}`}
                />
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
                  <img
                    key={index}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' , opacity: attachments.length - max > 0 ? 0.6 : 1 }}
                    className='tw-rounded-md'
                    src={item}
                    alt={`Image ${index + 1}`}
                  />
                  { attachments.length - max > 0 && <label className=' tw-relative tw-top-[-50%] tw-left-[40%] tw-text-2xl'>+{attachments.length - max}</label>}
                </div>
              );
            }else if(index >= 0 && index < max){
              return (
                <img
                  key={index}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  className='tw-rounded-md'
                  src={item}
                  alt={`Image ${index + 1}`}
                />
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
            <img className='tw-rounded-md tw-max-w-[400px]' src={attachments[0]} />
          )}

          {attachments.length < 4 && handleRenderAttachments(2)}

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