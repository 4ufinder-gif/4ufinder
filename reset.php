<?php
$conn = new mysqli("https://4ufinder.vercel.app", "root", "", "4ufinder_store_db");

$token = $_GET['token'];

$result = $conn->query(
  "SELECT * FROM users 
   WHERE reset_token='$token' 
   AND reset_expires > NOW()"
);

if ($result->num_rows != 1) {
  die("Invalid or expired token.");
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Reset Password</title>
</head>
<body>

<h2>Reset Password</h2>

<form method="POST">
  <input type="password" name="password" placeholder="New Password" required>
  <button type="submit">Update Password</button>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $newPass = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $conn->query(
    "UPDATE users 
     SET password='$newPass', reset_token=NULL, reset_expires=NULL 
     WHERE reset_token='$token'"
  );

  echo "Password updated successfully. You can now login.";
}
?>

</body>
</html>
