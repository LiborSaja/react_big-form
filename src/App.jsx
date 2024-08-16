import React, { useState, useEffect } from "react";
import validateFloat from "./Functions/validateFloat";
import RbGroup from "./Components/RbGroup";
import ChbGroup from "./Components/ChbGroup";
import NumImp from "./Components/NumImp";
import Select from "./Components/Select";
import Range from "./Components/Range";
import Clock from "./Components/Clock";
import ProgressBar from "./Components/ProgressBar";
import TextBox from "./Components/TextBox";
import Button from "./Components/Button";
import TextArea from "./Components/TextArea";
import File from "./Components/File";
import saveText from "./Functions/saveText";

const App = () => {
    const [radioPrichut, setRadioPrichut] = useState("Vanilková");
    const [checkboxNavic, setCheckboxNavic] = useState([]);
    const [pocetKopecku, setPocetKopecku] = useState(1);
    const druhy = [
        "smetanové pokušení",
        "jogurtová fantazie",
        "vysocenízkotučná specialita",
    ];
    const [druhZmrzliny, setDruhZmrzliny] = useState("smetanové pokušení");
    const [mistoDisk, setMistoDisk] = useState(50);
    const odpocet = 1000;
    const [zbyvaOdpocet, setZbyvaOdpocet] = useState(odpocet);
    const [scitanec1, setscitanec1] = useState(0);
    const [scitanec2, setscitanec2] = useState(0);
    const [soucetCisel, setSoucetCisel] = useState(
        "Zadejte validní sčítance a zmáčkněte tlačítko výpočtu."
    );
    const [textArea, setTextArea] = useState("");

    // odpocet
    useEffect(() => {
        if (odpocet > 0) {
            const timer = setInterval(() => {
                setZbyvaOdpocet(zbyvaOdpocet - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [zbyvaOdpocet]);
    //  progress bar
    const progress =
        zbyvaOdpocet > 0 ? ((odpocet - zbyvaOdpocet) / odpocet) * 100 : 100;
    // prompt scitanec 1
    useEffect(() => {
        let temp = prompt(
            "Zadejte 1. sčítanec - číslo, může být i desetinné",
            10.5
        );
        while (!validateFloat(temp)) {
            temp = prompt(
                "Nesprávné zadání! Zadejte znovu!\nZadejte 1. sčítanec - číslo, může být i desetinné",
                10.5
            );
        }
        setscitanec1(parseFloat(temp));
    }, []);

    //  handleData
    const handleData = (data, idecko) => {
        switch (idecko) {
            case "prichut": {
                setRadioPrichut(data);
                break;
            }
            case "navic": {
                setCheckboxNavic(data);
                break;
            }
            case "pocet": {
                if (data < 1) {
                    alert(
                        "Nechci dělat chytrého, ale samotná oplatka by Vám nejspíše nechutnala :D"
                    );
                    data = 1;
                } else if (data > 4) {
                    alert(
                        "Nezlobte se, ale víc jak 4 kopečky by Vám spadly :D"
                    );
                    data = 4;
                }
                setPocetKopecku(data);
                break;
            }
            case "druh": {
                setDruhZmrzliny(data);
                break;
            }
            case "misto": {
                setMistoDisk(data);
                break;
            }
            case "scitanec1": {
                setscitanec1(data);
                break;
            }
            case "scitanec2": {
                setscitanec2(data);
                break;
            }
            case "textArea": {
                setTextArea(data);
                break;
            }
            case "chooseFile": {
                setTextArea(data);
                break;
            }
            default:
                break;
        }
    };
    // handleEvent button
    const handleEvent = (idecko) => {
        switch (idecko) {
            case "soucet": {
                if (!validateFloat(scitanec1) && !validateFloat(scitanec2)) {
                    setSoucetCisel(
                        "Součet nelze provést, ani jedno políčko neobsahuje číslo!"
                    );
                } else if (!validateFloat(scitanec2)) {
                    setSoucetCisel(
                        "Součet nelze provést, 2. sčítanec není číslo!"
                    );
                } else if (!validateFloat(scitanec1)) {
                    setSoucetCisel(
                        "Součet nelze provést, 1. sčítanec není číslo!"
                    );
                } else {
                    setSoucetCisel(
                        `Výsledek: ${
                            parseFloat(scitanec1) + parseFloat(scitanec2)
                        }`
                    );
                }
                break;
            }
            case "download": {
                saveText(textArea);
                break;
            }
            default:
                break;
        }
    };

    return (
        <div className="my-bg vw-100 vh-100">
            <h2 className="text-center bg-dark p-1 text-bg">FORMULÁŘ</h2>
            <div className="container p-4">
                <div className="row">
                    <div className="col-6">
                        {/* vypis */}
                        <h5>Vaše objednávka:</h5>
                        <hr />
                        <p>
                            {radioPrichut} {checkboxNavic} {pocetKopecku}{" "}
                            kopeček/y, {druhZmrzliny}.
                        </p>{" "}
                        <hr />
                        {/* prichut zmrzliny */}
                        <RbGroup
                            label="Příchuť zmrzliny"
                            id="prichut"
                            dataIn={[
                                { label: "Vanilková", value: "Vanilková" },
                                { label: "Čokoládová", value: "Čokoládová" },
                                { label: "Míchaná", value: "Míchaná" },
                            ]}
                            handleData={handleData}
                            selectedValue={radioPrichut}
                        />
                        <br />
                        {/* neco navic */}
                        <ChbGroup
                            label="Suroviny navíc?"
                            id="navic"
                            dataIn={[
                                {
                                    label: "Kousky oříšků",
                                    value: "s kousky oříšků, ",
                                },
                                {
                                    label: "Čoko hobliny",
                                    value: "s čoko hoblinkami, ",
                                },
                                {
                                    label: "Karamelové křupinky",
                                    value: "s karamelovými křupinkami, ",
                                },
                            ]}
                            handleData={handleData}
                            selectedValue={checkboxNavic}
                        />
                        <br />
                        {/* pocet kopecku */}
                        <NumImp
                            label="Počet kopečků (max 4)"
                            id="pocet"
                            dataIn={pocetKopecku}
                            handleData={handleData}
                        />
                        <br />
                        {/* vyber z moznosti */}
                        <Select
                            label="Vyberte druh zmrzliny:"
                            id="druh"
                            dataIn={druhy}
                            selectedValue={druhZmrzliny}
                            handleData={handleData}
                        />
                        <br />
                        {/* zaplneni disku */}
                        <Range
                            label="Místo na disku"
                            id="misto"
                            dataIn={mistoDisk}
                            handleData={handleData}
                            min="0"
                            max="100"
                        />
                        {/* vypis casu */}
                        Aktuální čas: <Clock />, dostupná kapacita disku:{" "}
                        {mistoDisk}%.
                    </div>
                    <div className="col-6">
                        {/* PROGRESS BAR */}
                        <ProgressBar id="odpocitavani" dataIn={progress} />
                        <p>
                            {zbyvaOdpocet > 0
                                ? `Probíhá rychlá aktualizace windows, zbývá pouze ${zbyvaOdpocet} vteřin.`
                                : "Aktualizace dokončena"}
                        </p>
                        <div className="row">
                            {/* scitanec 1 */}
                            <div className="col">
                                <TextBox
                                    label="Sčítanec 1"
                                    id="scitanec1"
                                    dataIn={scitanec1}
                                    handleData={handleData}
                                />
                            </div>
                            {/* scitanec 2 */}
                            <div className="col">
                                <TextBox
                                    label="Sčítanec 2"
                                    id="scitanec2"
                                    dataIn={scitanec2}
                                    handleData={handleData}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Button
                                    label="Výpočet"
                                    id="soucet"
                                    handleEvent={handleEvent}
                                />
                            </div>
                            <div className="col">{soucetCisel}</div>
                        </div>
                        <br />
                        {/* operace s textem */}
                        <TextArea
                            label="Operace s textem"
                            id="textArea"
                            dataIn={textArea}
                            handleData={handleData}
                            height="150px"
                        />
                        <div className="row">
                            <div className="col">
                                {/* nahrani souboru */}
                                <File
                                    label="Načíst text ze souboru"
                                    id="chooseFile"
                                    handleData={handleData}
                                />
                            </div>
                            <div className="col">
                                {/* stahnuti souboru */}
                                <Button
                                    label="Stáhnout text"
                                    id="download"
                                    handleEvent={handleEvent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center pt-4">&copy; Libor Šaja 2024</p>
            </div>
        </div>
    );
};

export default App;
