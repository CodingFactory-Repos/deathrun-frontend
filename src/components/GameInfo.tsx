import React from "react";
import { RoomInformationsProps } from "../types/RoomTypes.ts";
import GodMoney from "../assets/images/god_money.png";
import BankIcon from "../assets/images/bank_icon.png";
import ElevatorIcon from "../assets/images/elevator_icon.png";
import GodIcon from "../assets/images/god_icon.png";
import StarIcon from "../assets/images/star_icon.png";
import { InfoItemProps } from "../types/GlobalTypes.ts";

const InfoItem: React.FC<InfoItemProps> = ({
    label,
    description,
    image,
    value,
    alt,
    onHoverTrap,
}) => (
    <div
        style={{ display: "flex", alignItems: "center" }}
        onMouseEnter={() => onHoverTrap({ label, description, image })}
        onMouseLeave={() => onHoverTrap(null)}
    >
        <img src={image} alt={alt} style={{ height: 40 }} />
        {value}
    </div>
);

const GameInfo: React.FC<RoomInformationsProps> = ({
    roomInformations,
    godId,
    onHoverTrap,
}) => {
    console.log("Room informations-------", roomInformations);
    console.log("God id", godId);

    const myGod = roomInformations?.gods?.find((god) => god.god === godId);

    const infoItems = [
        {
            label: "Bank",
            description: "Money available split with all god",
            image: BankIcon,
            value: roomInformations?.bank,
            alt: "Bank Icon",
        },
        {
            label: "God Money",
            description: "Money available for the god to place traps",
            image: GodMoney,
            value: myGod?.spendingLimit || 0,
            alt: "God Money",
        },
        {
            label: "Floor",
            description: "Current player's floor number",
            image: ElevatorIcon,
            value: roomInformations?.floor,
            alt: "Elevator Icon",
        },
        {
            label: "God number",
            description: "Display the number of gods",
            image: GodIcon,
            value: roomInformations?.gods?.length,
            alt: "God Icon",
        },
        {
            label: "Score",
            description: "Display the player's score",
            image: StarIcon,
            value: roomInformations?.score,
            alt: "Star Icon",
        },
    ];

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    width: 230,
                    height: 170,
                    padding: 20,
                    borderRadius: 10,
                    gap: 5,
                    flexWrap: "wrap",
                    flexDirection: "column",
                }}
            >
                {infoItems.map((item, index) => (
                    <InfoItem key={index} {...item} onHoverTrap={onHoverTrap} />
                ))}
            </div>
        </div>
    );
};

export default GameInfo;
