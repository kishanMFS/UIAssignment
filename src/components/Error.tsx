import '../styles/error.css'


interface ErrorType {
    message: string;
    onClose: () => void;
}

const Error = ({ message = 'An error occurred', onClose }: ErrorType) => {
    return (
        <>
            {message && (
                <div className="error-container">
                    <div className="error-message-area">
                        <span>{message}</span>
                        <button onClick={onClose} className="error-btn">x</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Error;