import React from "react";
import { TrapDescriptionProps } from "../types/TrapTypes.ts";

const TrapDescription: React.FC<TrapDescriptionProps> = ({ trapItem }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #000",
                borderRadius: "10px",
                padding: "20px",
                width: "350px",
                textAlign: "justify",
                backgroundColor: "white",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                    justifyContent: "flex-start",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        fontSize: "3rem",
                        marginRight: "10px",
                    }}
                >
                    {trapItem.images.length > 0 ? (
                        <img
                            src={trapItem.images[0]}
                            alt={trapItem.label}
                            style={{ height: "60px" }}
                        />
                    ) : (
                        trapItem.label
                    )}
                </div>
                <div
                    style={{
                        fontWeight: "bold" as const,
                        fontSize: "1.5rem",
                    }}
                >
                    {trapItem.label}
                </div>
                {/* Icône et nom sur la même ligne */}
            </div>
            <p
                style={{
                    fontSize: "1rem",
                    maxHeight: "150px",
                    overflowY: "auto",
                    textAlign: "justify",
                }}
            >
                {trapItem.description}
            </p>
        </div>
    );
};

export default TrapDescription;
