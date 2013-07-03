<?php
    session_start();
    if($_POST && $_POST['login'] === "login"){
        $_SESSION['isLoggedIn'] = true;
    }
?>
<!doctype html>
<html>
    <head>
        <title>Session Lab - Login</title>
    </head>
    <body>
        <?php
            if(!$_SESSION['isLoggedIn']){
        ?>
        <form method = "post">
            <input type = "submit" name = "login" value = "login" />
        </form>
        <?php
            }
            else {
        ?>
        <a href="logout.php">Logout</a>
        <?php    
            }
        ?>
    </body>
</html>