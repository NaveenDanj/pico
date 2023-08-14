
function MainLayout() {
    return (
        <div className="tw-w-full tw-h-[100vh] tw-flex">

            <div style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }} className="tw-h-[100vh] tw-flex tw-flex-col tw-gap-3 tw-w-[45px] tw-bg-[#202020]">
                asd
            </div>

            <div style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }} className="tw-max-w-[300px] tw-bg-[#272727] tw-flex-grow tw-min-w-[240px]">
                qsd
            </div>

            <div className="tw-flex tw-flex-col tw-flex-grow">

                <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)' }} className="tw-w-full tw-p-4">
                    asd
                </div>

                <div style={{ height: 'calc(100vh - 16px)', backgroundImage: 'url(./pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px 250px' }} className="tw-w-full">
                    asd
                </div>

            </div>

        </div>
    )
}

export default MainLayout