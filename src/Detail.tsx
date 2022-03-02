import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

interface characterDetails{
    id?: string,
    name?: string,
    status?: string,
    image?: string
}

const Detail = () => {

    const [details, setDetails] = useState({} as characterDetails)
    const characterId = useParams()

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${characterId.characterId}`)
            .then(response => {return response.json()})
            .then((responseBody: characterDetails) => {setDetails(responseBody)})
    }, [])

    return(
        <div>
            <div>{details.id}</div>
            <div>{details.name}</div>
            <div>{details.status}</div>
            <div>{details.image}</div>
        </div>

    )

}

export default Detail;