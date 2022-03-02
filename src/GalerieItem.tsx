import "./GalerieItem.css"

interface GalerieItemProps {
    name: string,
    species?: string,
    status?: string,
    image?: string,
}

export default function GalerieItem(props: GalerieItemProps) {

    return(
        <div className="galerie-body">
            <div className="item-card">
                <div className="item-headline">
                    <h2 data-testid="name">{props.name}</h2>
                </div>
                <div className="item-properties">
                    <h3>Species:</h3>
                    <p data-testid='species'>{props.species}</p>
                    <h3>Status:</h3>
                    <p data-testid='status'>{props.status}</p>
                </div>
                <div className="item-image-box">
                    <img data-testid='image' src={props.image} alt="portät" className="item-image"/>
                </div>
            </div>
        </div>
    )
}