
function Encryption() {
    return (
        <div className='tw-w-full tw-pt-2'>
            <label className='tw-text-lg tw-font-thin tw-my-auto'>Encryption</label>

            <div className='tw-gap-1 tw-flex tw-flex-col tw-mt-5 tw-w-full '>

                <div className="tw-h-[500px] tw-gap-3 tw-pr-2 tw-overflow-y-auto tw-w-full tw-flex tw-flex-col">
                    <p className="tw-text-[12px]">We use end-to-end encryption to safeguard your messages.<br /><br />
                        This means that only you and the intended recipient can read the messages you send – not even us, the service provider, can access the content of your messages.
                        The messages are encrypted on your device and decrypted only on the recipient's device.</p>
                </div>

            </div>

        </div>
    )
}

export default Encryption