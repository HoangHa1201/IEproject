import ReactLoading from 'react-loading'

export default function Loading ({height, width}) {

    return (
        <ReactLoading type='spin' height={height} width={width}/>
    )
}