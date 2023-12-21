
function MediaItem() {
  return (
    <div className="tw-grid-item tw-w-full tw-max-w-[200px] tw-px-2 tw-flex tw-flex-col tw-cursor-pointer tw-py-2 tw-rounded-md">
      <div className="tw-ml-2 tw-cursor-pointer">
        <img style={{ width: '100%', height: 100 }} className="tw-rounded-md  tw-cursor-pointer" src="https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc" />
      </div>

    </div>
  );
}

export default MediaItem;