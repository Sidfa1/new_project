// session_timeout.js
(function () {
    function checkSession() {
        // Perform an AJAX request to check the session status
        fetch('/check_session/')
            .then(response => response.json())
            .then(data => {
                if (data.session_expired) {
                    // Reload the page if the session has expired
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }

    // Check the session status every 30 seconds (adjust as needed)
    setInterval(checkSession, 300000);
})();
