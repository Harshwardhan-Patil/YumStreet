import { useEffect, useRef } from 'react';

const FocusOutside = ({ children, onClickOutside }) => {
    const focusRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (focusRef.current && !focusRef.current.contains(e.target)) {
                onClickOutside && onClickOutside();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    return <div ref={focusRef}>{children}</div>;
};

export default FocusOutside;
