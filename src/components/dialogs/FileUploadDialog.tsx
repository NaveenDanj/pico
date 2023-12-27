import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';

import './FileUpload.css';

export default function FileUploadDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <div onClick={handleClickOpen} className="tw-w-[45px] tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
        <AttachFileIcon sx={{ width: 16 }} />
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
              height: '590px'
            },
          },
        }}
      >

        <div className='tw-flex tw-flex-col tw-w-full tw-h-full'>
            
          <div style={{ maxWidth : 500 , margin: 'auto' , maxHeight : 470 }} className='tw-flex tw-flex-grow tw-justify-center tw-items-center'>
            <img style={{ maxWidth: '100%' , height : 'auto' , maxHeight : 470 }} src='https://avatars.githubusercontent.com/u/48654030?v=4' />
          </div>

          <div className='tw-flex tw-flex-col tw-bg-[#2C2C2C] tw-w-full tw-p-3 tw-gap-2'>
            
            <div className="tw-w-full">
              <input type="text" placeholder="Caption (optional)" className=' tw-w-full tw-p-1 tw-text-xs' />
            </div>

            <div className='tw-flex tw-w-full '>

              <div
                id='custom-scrollbar' 
                style={{ overflowX: 'auto' , overflowY : 'auto' , whiteSpace: 'nowrap' }} 
                className='tw-flex tw-flex-grow tw-gap-2 tw-p-1 '
              >
                
                <div style={{ border : '1px solid rgba(255,255,255,0.7)' , borderRadius : 5 }} className=' tw-p-2 tw-flex tw-justify-center tw-items-center'>
                  <ArticleIcon sx={{ fontSize : 25 }} />
                </div>

              </div>

              <div className='tw-flex tw-p-2 tw-gap-3'>
              
                <div className="tw-w-[45px] tw-p-1 tw-flex tw-items-center tw-justify-center  tw-rounded-md tw-bg-[#333333]  hover:tw-bg-[#383838]">
                  <AddIcon sx={{ width: 16 }} />
                </div>

                <div className="tw-w-[50px]      tw-p-1 tw-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-[#1DAA61]  hover:tw-bg-[#1B9355]">
                  <SendIcon sx={{ width: 16 }} />
                </div>
              </div>

            </div>


          </div>

        </div>

      </Dialog>
    </div>
  );
}