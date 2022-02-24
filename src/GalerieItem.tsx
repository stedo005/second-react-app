import "./GalerieItem.css"

interface GalerieItemProps {
    name: string
    species?: string
    status?: string
    image?: string
}

export default function GalerieItem(props: GalerieItemProps) {

    return(
        <div className="galerie-body">
            <div className="item-card">
                <div className="item-headline">
                    <h2>{props.name}</h2>
                </div>
                <div className="item-properties">
                    <h3>Species:</h3>
                    <p>{props.species}</p>
                    <h3>Status:</h3>
                    <p>{props.status}</p>
                </div>
                <div className="item-image-box">
                    <img src={props.image} alt="portät" className="item-image"/>
                </div>
            </div>
        </div>
    )
}