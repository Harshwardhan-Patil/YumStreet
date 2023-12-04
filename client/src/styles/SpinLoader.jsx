import ClipLoader from 'react-spinners/ClipLoader';

function SpinLoader({ loading, marginBlock, color, size = 30 }) {
    const override = {
        display: "block",
        textAlign: "center",
        margin: `${marginBlock}`,
    };
    return (
        <>
            <ClipLoader
                color={color ? color : "rgb(239 68 68)"}
                loading={loading}
                cssOverride={override}
                size={size}
            />
        </>
    )
}

export default SpinLoader