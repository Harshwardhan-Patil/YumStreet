import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Rating from "./Rating";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

function ReviewBox({ name, profileImg, address, rating, date, comment, image, url }) {
    return (
        <div className='mb-4'>
            <div className='flex gap-2 py-2'>
                <Link to={url} className='flex items-start gap-2 w-80'>
                    <Avatar className='w-12 h-12 '>
                        <AvatarImage src={image || profileImg} />
                        <AvatarFallback><UserCircle2 /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className='text-primary capitalize font-semibold'>{name}</h2>
                        <span className='text-primary-gray text-sm'>{address}</span>
                    </div>
                </Link>
                <div className="w-full">
                    <div className='flex gap-2 mb-2'>
                        <Rating rating={rating} />
                        <p className='text-sm text-primary-gray'>{date}</p>
                    </div>
                    <div><p className='text-primary-gray'>{comment}</p></div>
                </div>
            </div>
            <Separator />
        </div>
    )
}


export default ReviewBox;