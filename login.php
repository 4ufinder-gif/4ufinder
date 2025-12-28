<?php
$conn = new mysqli("http://4ufinder.vercel.app", "root", "", "4ufinder_store_db");

$email = $_POST['email'];
$password = $_POST['password'];

$result = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($result->num_rows == 1) {
  $user = $result->fetch_assoc();

  if (!$user['is_verified']) {
    die("Please verify your email first.");
  }

  if (password_verify($password, $user['password'])) {
    echo "Login successful!";
  } else {
    echo "Wrong password.";
  }
} else {
  echo "User not found.";
}
?>
