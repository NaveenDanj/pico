import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import './FileUpload.css';
import { Message } from 'src/types/dto';
import FileUploadService from 'src/services/Chat/FileUploadService';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import ChatGlobalInboxService from 'src/services/Chat/ChatGlobalInboxService';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function FileUploadDialog() {
  const [open, setOpen] = React.useState(false);
  const [fileList , setFileList] = React.useState<File[]>([]);
  const [selectedFileDisplay , setSelectedFileDisplay] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [messageText , setMessageText] = React.useState('');
  const selectedChat = useSelector((state: RootState) => state.currentChat.selectedChat );
  const [loading , setLoading] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }

  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0){

      for(let i = 0; i < event.target.files.length; i++){
        setFileList([...fileList , event.target.files[i]]);
      }
      console.log(fileList);
      setOpen(true);
    }
  };

  const createURLFromSelectedFile = (file:File) => {
    return URL.createObjectURL(file);
  };

  const handleSelectItem = () => {
    const f:File = fileList[selectedFileDisplay];

    if(!f) return;

    const extension = f.type.split('/')[0];

    if(extension == 'image'){
      return (
        <div className='tw-flex tw-flex-col tw-gap-2'>
          <img style={{ maxWidth: '100%' , height : 'auto' , maxHeight : 430 }} src={createURLFromSelectedFile(fileList[selectedFileDisplay])} />
          <center><label className='tw-text-sm'>{fileList[selectedFileDisplay].name}</label></center>
        </div>
      );
    }else{
      return (
        <div className='tw-flex tw-flex-col tw-gap-2'>
          <center>
            <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 , maxWidth : 87 }} className=' tw-p-5 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
              <div >
                <ArticleIcon sx={{ fontSize : 45 , color: 'white' }} />
              </div>
            </div>
          </center>
          <center><label className='tw-text-sm'>{fileList[selectedFileDisplay].name}</label></center>
        </div>
      );
    }

  };

  const handleRemoveFile = (indexToDelete:number) => {
    const updatedItems = fileList.filter((_item, index) => index !== indexToDelete);

    if(updatedItems.length == 0){
      handleClose();
    }
    setFileList(updatedItems);
  };
  

  const handleClose = () => {
    setOpen(false);
    setSelectedFileDisplay(0);
    setFileList([]);
  };


  const handleSendMessage = async () => {
    if(!selectedChat) return;
    const attachments:string[] = [];
    setLoading(true);
    for(let i = 0; i < fileList.length; i++){
      const res = await FileUploadService.uploadFile(fileList[i] , selectedChat.uid);

      if(res.success && res.doc){
        attachments.push(res.doc?.id);
      }

    }
    
    const messageObject: Message = {
      message: messageText,
      chatroomId: selectedChat.uid,
      attachments: attachments,
      timestamp: new Date(),
      isReplied: false,
      repliedTo: null
    };
    await ChatGlobalInboxService.sendToGlobalIndex(messageObject, selectedChat.contats.userUID, selectedChat.uid);
    setLoading(false);
    handleClose();
  };



  return (
    <div>

      <div onClick={handleClickOpen} className="tw-w-[45px] tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
        <AttachFileIcon sx={{ width: 16 }} />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '590px',
              height: '610px'
            },
          },
        }}
      >

        <div className='tw-flex tw-flex-col tw-w-full tw-h-full'>
            
          <div style={{ display : loading ? 'none' : '' }} className="tw-w-full tw-flex tw-justify-end">
            <div onClick={() => handleClose()} className=" tw-p-1 tw-mr-2 tw-mt-1 tw-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-[#383838] ">
              <CloseIcon className='tw-cursor-pointer' sx={{ fontSize : 20 }} />
            </div>
          </div>
            
          {fileList.length > 0 && (
            <div style={{ maxWidth : 500 , margin: 'auto' , maxHeight : 470 }} className='tw-flex tw-flex-grow tw-justify-center tw-items-center'>
              {handleSelectItem()}
            </div>
          )}

          <div className='tw-flex tw-flex-col tw-bg-[#2C2C2C] tw-w-full tw-p-3 tw-gap-2'>
            
            <div className="tw-w-full">
              <input value={messageText} onChange={(e) => setMessageText(e.target.value)} type="text" placeholder="Caption (optional)" className=' tw-w-full tw-p-1 tw-text-xs' />
            </div>

            <div className='tw-flex tw-w-full '>

              <div
                id='custom-scrollbar' 
                style={{ overflowX: 'auto' , overflowY : 'auto' , whiteSpace: 'nowrap' }} 
                className='tw-flex tw-flex-grow tw-gap-2 tw-p-1 '
              >
                {fileList.map((_file:File , index:number) => (
                  <div onClick={() => setSelectedFileDisplay(index)} key={index} style={{ border : index == selectedFileDisplay? '1px solid rgba(27,147,85,0.7)' : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 }} className=' tw-group tw-p-2 tw-flex tw-justify-center tw-items-center tw-cursor-pointer'>
                    <ArticleIcon sx={{ fontSize : 25 , color: index == selectedFileDisplay? '#1B9355' : 'white'}} />
                    <div onClick={() => !loading? handleRemoveFile(index) : true} className='tw-p-1 group-hover:tw-flex tw-hidden tw-justify-center tw-items-center'>
                      <CloseIcon className='tw-bg-[#383838] ' sx={{ fontSize : 15 }} />
                    </div>
                  </div>
                ) )}

              </div>

              <div className='tw-flex tw-p-2 tw-gap-3'>

                <div onClick={() => !loading? handleClickOpen() : true} className="tw-w-[45px] tw-p-1 tw-flex tw-items-center tw-justify-center  tw-rounded-md tw-bg-[#333333]  hover:tw-bg-[#383838]">
                  <AddIcon sx={{ width: 16 }} />
                </div>

                <div onClick={() => !loading? handleSendMessage() : true} className="tw-w-[50px]  tw-p-1 tw-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-[#1DAA61]  hover:tw-bg-[#1B9355]">
                  {loading ? <AutorenewIcon className="tw-animate-spin" /> : <SendIcon sx={{ width: 16 }} />}
                </div>
              </div>

            </div>


          </div>

        </div>

      </Dialog>
    </div>
  );
}