<?php
$conn = new mysqli("localhost", "root", "", "store_db");

$code = $_GET['code'];

$sql = "UPDATE users SET is_verified = 1 WHERE verification_code = '$code'";

if ($conn->query($sql)) {
  echo "Email verified successfully. You can now login.";
} else {
  echo "Verification failed.";
}
?>
