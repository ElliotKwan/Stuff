<?php
    session_start();
    $_SESSION['isLoggedIn'] = true;
    if($_POST && $_POST['logout'] === "logout"){
        session_destroy();
        session_start();
        $_SESSION['isLoggedIn'] = false;
    }
?>
<!doctype html>
<html>
    <head>
        <title>Session Lab - Logout</title>
    </head>
    <body>
        <?php
            if($_SESSION['isLoggedIn']) {
        ?>
        <form method = "post">
            <input type = "submit" name = "logout" value = "logout" />
        </form>
        <?php
            }
            else {
        ?>
        <a href = "login.php">Login</a>
        <?php
            }
        ?>
    </body>
</html>