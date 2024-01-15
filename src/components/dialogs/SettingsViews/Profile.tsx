import { Avatar } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditProfileService from 'src/services/Profile/EditProfileService';
import React, { ChangeEvent, useState , KeyboardEvent } from 'react';
import { RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from 'src/services/Auth/AuthService';
import { User } from 'firebase/auth';
import { setUserAdditionalData } from 'src/store/slices/UserSlice';
import LoadingDialog from '../LoadingDialog';


function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.additionalData);
  const [fullname , setFullname] = useState<string>(user?.FirstName + ' ' + user?.LastName );
  const [about , setAbout] = useState<string>(user?.about+'');
  const [nameEdit , setNameEdit] = useState(false);
  const [aboutEdit , setAboutEdit] = useState(false);
  const [loading , setLoading] = useState(false);
  
  const fileInputRef = React.createRef<HTMLInputElement>();

  const openFileDialog = () => {

    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.click();

  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const _user:User | null = await AuthService.checkAuthState();

    if (!file || !user || !_user) {
      return;
    }
    setLoading(true);
    await EditProfileService.updateDisplayPicture(file , user.uid);
    const userData = await AuthService.getUserAdditionalData(_user);
    if(userData) dispatch(setUserAdditionalData(userData));
    setLoading(false);

  };

  const handleUpdateName = async () => {
    const name_split = fullname.split(' ');
    setLoading(true);
    if(name_split.length >= 2){
      await EditProfileService.updateDisplayName(name_split[0] , name_split[1]);
    }else if(name_split.length == 1) {
      await EditProfileService.updateDisplayName(name_split[0] , name_split[0]);
    }
    const userData = await AuthService._getUserAdditionalData();
    if(userData) dispatch(setUserAdditionalData(userData));
    setLoading(false);
    setNameEdit(false);
  };

  const handleKeyDownName = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && fullname != '') {
      handleUpdateName();
    }
  };

  const handleUpdateAbout = async () => {
    if(about == '') return;
    setLoading(true);
    await EditProfileService.updateAbout(about);

    const userData = await AuthService._getUserAdditionalData();
    if(userData) dispatch(setUserAdditionalData(userData));

    setLoading(false);
    setAboutEdit(false);
  };

  const handleKeyDownAbout = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && about != '') {
      handleUpdateAbout();
    }
  };


  return (
    <div className='tw-w-full'>

      <LoadingDialog isOpen={loading} />

      <div>
        <Avatar className="tw-mt-3" sx={{ width: 100, height: 100 }} src={user ? user.dp : ''} />
        <div onClick={openFileDialog} className=" tw-relative tw-top-[-18px] tw-left-[80px] tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
          <ModeEditIcon sx={{ width: 14 }} />
        </div>
      </div>

      <div className='tw-w-full tw-mt-3 tw-flex tw-gap-5 tw-justify-between'>
        {!nameEdit && <label className='tw-text-md tw-font-thin tw-mt-3 tw-my-auto'>{user?.FirstName + ' ' + user?.LastName}</label> }
        {nameEdit && (
          <div style={{ border: '1px solid rgba(255,255,255,0.4)' }} className='tw-w-full tw-p-0'>
            <input onChange={(e) => setFullname(e.target.value)} value={fullname} onKeyDown={handleKeyDownName} placeholder='Enter your full name' className='tw-w-full tw-text-xs tw-px-2' type='text' />
          </div>
        )}

        <div onClick={() => setNameEdit(!nameEdit)} className="tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
          <ModeEditIcon sx={{ width: 14 }} />
        </div>

      </div>

      <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>

        <label className="tw-text-xs tw-text-[#878787]">About</label>

        <div className="tw-flex tw-gap-5 tw-justify-between">
          {!aboutEdit && <p className="tw-text-xs tw-max-w-[300px] tw-my-auto ">{user?.about == '' ? 'About not setted yet' : user?.about}</p>}
          {aboutEdit && (
            <div className='tw-w-full tw-p-0'>
              <textarea onChange={(e) => setAbout(e.target.value)} onKeyDown={handleKeyDownAbout} value={about} placeholder='Enter your bio' className='tw-w-full tw-text-xs tw-p-2'/>
            </div>
          )}

          <div onClick={() => setAboutEdit(!aboutEdit)} className=" tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
            <ModeEditIcon sx={{ width: 14 }} />
          </div>
        </div>
      </div>

      <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>
        <label className="tw-text-xs tw-text-[#878787]">Email address</label>

        <div className="tw-flex tw-justify-between">
          <label className="tw-text-xs tw-my-auto">{user?.email}</label>
        </div>
      </div>

      <input ref={fileInputRef} onChange={handleUpload} type="file" style={{ display: 'none' }} id="fileInput" />

    </div>
  );
}

export default Profile;