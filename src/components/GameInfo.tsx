import React from "react";
import { RoomInformationsProps } from "../types/RoomTypes.ts";
import GodMoney from "../assets/images/god_money.png";
import BankIcon from "../assets/images/bank_icon.png";
import ElevatorIcon from "../assets/images/elevator_icon.png";

const GameInfo: React.FC<RoomInformationsProps> = ({
    roomInformations,
    godId,
}) => {
    console.log("Room informations-------", roomInformations);
    console.log("God id", godId);

    const myGod = roomInformations?.gods?.find((god) => god.god === godId);
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    // flexDirection: "column",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    width: 230,
                    padding: 20,
                    borderRadius: 10,
                    gap: 12,
                }}
            >
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={BankIcon}
                            alt="God Money"
                            style={{ height: 40 }}
                        />
                        {roomInformations?.bank}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={GodMoney}
                            alt="God Money"
                            style={{ height: 40 }}
                        />
                        {myGod?.spendingLimit ? myGod.spendingLimit : 0}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={ElevatorIcon}
                            alt="God Money"
                            style={{ height: 40 }}
                        />
                        {roomInformations?.floor}
                    </div>
                </div>
                <div>
                    <div>Gods {roomInformations?.gods?.length}</div>
                    <div>score {roomInformations?.score}</div>
                </div>
            </div>
        </div>
    );
};

export default GameInfo;
