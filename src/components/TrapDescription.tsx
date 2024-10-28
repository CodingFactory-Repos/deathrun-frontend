import React from "react";
import { TrapDescriptionProps } from "../types/TrapTypes.ts";

const TrapDescription: React.FC<TrapDescriptionProps> = ({ trapItem }) => {
    return (
        <div
            style={{
                position: "absolute",
                width: 350,
                top: 150,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: "20px",
                    width: "100%",
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
                        {"trapData" in trapItem &&
                        trapItem.trapData.length > 0 ? (
                            <img
                                src={trapItem.trapData[0].image}
                                alt={trapItem.label}
                                style={{ height: 40 }}
                            />
                        ) : "image" in trapItem ? (
                            <img
                                src={trapItem.image}
                                alt={trapItem.label}
                                style={{ height: 40 }}
                            />
                        ) : (
                            trapItem.label
                        )}
                    </div>
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    >
                        {trapItem.label}
                    </div>
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
        </div>
    );
};

export default TrapDescription;
