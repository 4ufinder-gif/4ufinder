<?php
$conn = new mysqli("https://4ufinder.vercel.app", "root", "", "4ufinder_store_db");

$email = $_POST['email'];
$token = md5(rand());
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

$result = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($result->num_rows == 1) {

  $conn->query("UPDATE users SET reset_token='$token', reset_expires='$expires' WHERE email='$email'");

  $link = "http://localhost/store/reset.php?token=$token";

  $subject = "Reset Your Password";
  $message = "Click this link to reset your password:\n$link";
  $headers = "From: no-reply@yourstore.com";

  mail($email, $subject, $message, $headers);

  echo "Password reset link sent to your email.";
} else {
  echo "Email not found.";
}
?>
