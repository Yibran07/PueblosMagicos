

    function showOfflineMessage() {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    }

    function hideOfflineMessage() {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }

    window.addEventListener('load', function() {
        if (!navigator.onLine) {
            showOfflineMessage();
        }

        window.addEventListener('online', function() {
            hideOfflineMessage();
            // Recarga la página para restaurar el contenido principal
            location.reload();
        });

        window.addEventListener('offline', showOfflineMessage);
    });

