import Loader from 'react-spinners/BarLoader';

function BarLoader({ loading, marginBlock, color, height, width }) {
    const override = {
        display: "block",
        textAlign: "center",
        margin: `${marginBlock}`,
    };
    return (
        <>
            <Loader
                color={color ? color : "rgb(239 68 68)"}
                loading={loading}
                cssOverride={override}
                height={height}
                width={width}
            />
        </>
    )
}

export default BarLoader