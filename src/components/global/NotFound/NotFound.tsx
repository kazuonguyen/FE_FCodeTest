import notfound from "./notfound.module.css";

function NotFoundMessage() {
    return (
        <div className={`mt-5 ${notfound.notFoundMessage}`}>
            <p>Trang bạn tìm kiếm</p>
            <p>&nbsp;hiện không khả dụng.</p>
        </div>
    );
}

export default function NotFoundImg() {
    return (
        <div className="flex flex-col items-center text-center">
            <img draggable={false} src="/404.svg" alt="404" className={notfound.notFound404} />
            <NotFoundMessage />
        </div>
    );
}
