import React from "react";
import { RoomInformationsProps } from "../types/RoomTypes.ts";
import GodMoney from "../assets/images/god_money.png";

const GameInfo: React.FC<RoomInformationsProps> = ({
    roomInformations,
    godId,
}) => {
    console.log("Room informations-------", roomInformations);
    console.log("God id", godId);

    const myGod = roomInformations?.gods?.find((god) => god.god === godId);
    return (
        <div style={{ width: "100%", margin: "0 14px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    minHeight: 140,
                    width: "100%",
                    padding: 20,
                }}
            >
                <h1>Game Info </h1>
                <span>Bank {roomInformations?.bank}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={GodMoney}
                        alt="God Money"
                        style={{ height: 40 }}
                    />
                    My credit {myGod?.spendingLimit ? myGod.spendingLimit : 0}
                </div>
                <span>Floor {roomInformations?.floor}</span>
                <span>Gods {roomInformations?.gods?.length}</span>
                <span>score {roomInformations?.score}</span>
            </div>
        </div>
    );
};

export default GameInfo;
