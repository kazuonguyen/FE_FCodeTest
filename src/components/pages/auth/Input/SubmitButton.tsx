import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import input from "./input.module.css";

interface SubmitButtonProps {
    className?: string;
    onClick?: () => void;
}

export default function SubmitButton({ className, onClick }: SubmitButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={`${input.button} ${className} justify-center items-center cursor-pointer rounded-full`}
            onClick={onClick}
        >
            <Image
                draggable={false}
                src="/buttonIcon/arrow.svg"
                alt="arrow"
                className="p-1.5 ct:p-2"
                fill
            />
        </motion.button>
    );
}
