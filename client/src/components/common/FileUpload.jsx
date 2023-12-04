import { cn } from "@/lib/utils";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";


function FileUpload({ name, size = 1, handleDrop, handleChange, handleFileRemove, files, className }) {


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (event) => {
        const dataToTransfer = {
            id: event.target.id,
            mimeTypes: ['image/jpg', 'image/png', 'image/jpeg'],
        };
        const jsonString = JSON.stringify(dataToTransfer);
        event.dataTransfer.setData(name, jsonString);
    };

    return (
        <>
            <ul className="my-2">
                {files.map((file, index) => (
                    <li key={file.name + index} className="border rounded-md p-1 my-1 flex justify-between border-gray-400 w-full">
                        <span>{file.name}</span>
                        <div onClick={() => handleFileRemove(file.name)}><XMarkIcon className="w-6 cursor-pointer fill-red-500" /></div>
                    </li>
                ))}
            </ul>
            <div className={cn('border  rounded-md border-gray-400 max-w-md p-4', className)} >
                <div onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div draggable="true" onDragStart={handleDragStart}>
                        <div>
                            <label className="flex flex-col items-center justify-center font-semibold gap-2 cursor-pointer h-40" htmlFor={`file-${name}`}>
                                <ArrowUpTrayIcon className="max-w-[50px]" />
                                Choose file or drag it here
                            </label>
                            {size > 1
                                ? <input name={name} type={'file'} id={`file-${name}`} onChange={handleChange} className='hidden' multiple accept=".png, .jpg, .jpeg" />
                                : <input name={name} type={'file'} id={`file-${name}`} onChange={handleChange} className='hidden' accept=".png, .jpg, .jpeg" />
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default FileUpload