import React from "react";

interface NoticeProps {
    className?: string;
}

export default function Notice({ className }: NoticeProps) {
    return <img draggable={false} src="/icon/notice.svg" alt="notice" className={`${className}`} />;
}
