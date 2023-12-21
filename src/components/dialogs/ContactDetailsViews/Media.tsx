import MediaItem from './MediaItem';

function Media() {
  return (
    <div className='tw-w-full tw-pt-2'>
      <label className='tw-text-lg tw-font-thin tw-my-auto'>Media</label>

      <div className='tw-h-[500px] tw-overflow-y-auto tw-gap-1 tw-grid tw-mt-5 tw-grid-container tw-grid-cols-[repeat(auto-fill,minmax(100px,1fr))] tw-w-full'>

        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />

      </div>

    </div>
  );
}

export default Media;