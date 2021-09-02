import React from "react";
import {Anchor, Chapter, Panel} from "@steffo/bluelib-react";
import {faRunning} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ServerFav(props) {

    return (
        <Panel>
            <Chapter>
                <p><Anchor href={"/erre2/"+props.fav.address}>{props.fav.name}</Anchor></p>
                <p>{props.fav.university}</p>
            </Chapter>
        </Panel>
    );
}