// CaculatorTime.js
const caculatorTimeAgo = (time) => {
    const now = new Date();
    const created = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
    const diff = now - created;

    if (isNaN(diff)) return '';

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ngày trước`;
    } else if (hours > 0) {
        return `${hours} giờ trước`;
    } else {
        return `${minutes} phút trước`;
    }
};

export default caculatorTimeAgo;
