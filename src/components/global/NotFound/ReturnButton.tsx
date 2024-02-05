"use client";

import { useRouter } from "next/navigation";
import notfound from "./notfound.module.css";

export default function ReturnButton() {
    const router = useRouter();
    return (
        <div>
            <button
                type="button"
                onClick={() => router.push("/")}
                className={`group flex items-center justify-center flex-row rounded-full text-white bg-black px-4 py-2 ${notfound.notFoundReturnButton}`}
            >
                Quay lại trang chủ &nbsp;&nbsp;
                <img
                    draggable={false}
                    src="/buttonIcon/arrow-head.svg"
                    alt="arrow"
                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:h-5 h-3"
                />
            </button>
        </div>
    );
}
