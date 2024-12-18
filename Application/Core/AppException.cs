namespace Application.Core {
    public class AppException {
        public AppException(int code, string message, string details = null)
        {
            StatusCode = code;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

    }
}