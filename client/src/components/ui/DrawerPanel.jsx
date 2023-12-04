import { forwardRef } from 'react'
import { Drawer } from 'vaul'

const DrawerPanel = forwardRef(({ trigger, children, full }, ref) => {
    const contentHeight = full
        ? `${content} h-[96%]`
        : content
    return (
        <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
                {trigger}
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className={contentHeight}>
                    <div className='p-4 bg-white rounded-t-[10px] flex-1'>
                        <div className="p-4 bg-white rounded-t-[10px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                            <div className="m-section">
                                {children}
                                <Drawer.Close ref={ref} />
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
})

DrawerPanel.displayName = 'DrawerPanel';

const content = `
bg-zinc-100  flex flex-col 
rounded-t-[10px] mt-24 
fixed bottom-0 left-0 right-0 z-50
`

export default DrawerPanel