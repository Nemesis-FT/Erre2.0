import React from "react";
import Style from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={Style.NotFound}>
            <h1>404</h1>
            <h2>Ti sei perso durante l'esplorazione della costellazione.</h2>
            <h3>Il navigatore non può aiutarti a trovare qualcosa che non esiste.</h3>
        </div>
    );
}