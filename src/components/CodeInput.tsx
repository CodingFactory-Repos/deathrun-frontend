import React, { useRef } from "react";
import TextField from "@mui/material/TextField";

interface CodeInputProps {
    code: string[];
    onCodeChange: (updatedCode: string[]) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, onCodeChange }) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        const updatedCode = [...code];
        if (value.match(/^\d?$/)) {
            updatedCode[index] = value;
            onCodeChange(updatedCode);

            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedValue = event.clipboardData.getData("Text").slice(0, 4);
        if (/^\d{4}$/.test(pastedValue)) {
            onCodeChange(pastedValue.split(""));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "15px",
                marginBottom: "40px",
                justifyContent: "center",
            }}
        >
            {code.map((digit, index) => (
                <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            color: "white",
                            fontSize: "2em",
                            fontFamily: "fantasy",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            borderRadius: "5px",
                        },
                    }}
                    sx={{
                        maxWidth: "80px",
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: "white" },
                            "&.Mui-focused fieldset": { borderColor: "white" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "gold",
                        },
                    }}
                />
            ))}
        </div>
    );
};

export default CodeInput;
