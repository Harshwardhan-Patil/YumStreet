import { YumStreet } from "@/constants";
import { useEffect } from "react"

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title || YumStreet.TITLE;
    }, [])
}

export default useDocumentTitle