import React from "react";
import Style from "./Home.module.css";
import {Heading, Image} from "@steffo/bluelib-react";
import ServerSelector from "./ServerSelector";

export default function Home() {
    return (
        <div className={Style.Home}>
            <div className={Style.lander}>
                <Image src={"/favicon.ico"}></Image>
                <Heading level={1}>Erre2 Navigator</Heading>
                <p className="text-muted">La webapp veloce e reattiva per consultare i repository online di riassunti
                    gratuiti.</p>

            </div>
            <ServerSelector/>

        </div>

    );
}