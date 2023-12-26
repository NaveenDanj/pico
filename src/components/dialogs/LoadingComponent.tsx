import AutorenewIcon from '@mui/icons-material/Autorenew';

function LoadingComponent() {
  return (
    <div className='tw-w-full tw-h-[100%] tw-flex tw-justify-center tw-items-center'>
      <AutorenewIcon className="tw-animate-spin" />
    </div>
  );
}

export default LoadingComponent;