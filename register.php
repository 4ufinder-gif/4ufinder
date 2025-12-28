<?php
$conn = new mysqli("http://4ufinder.vercel.com", "root", "", "4ufinder_store_db");

if ($conn->connect_error) {
  die("Connection failed");
}

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$code = md5(rand());

$sql = "INSERT INTO users (fullname, email, password, verification_code)
        VALUES ('$fullname', '$email', '$password', '$code')";

if ($conn->query($sql)) {

  $verifyLink = "http://localhost/store/verify.php?code=$code";

  $subject = "Verify Your Email";
  $message = "Click the link to verify your account:\n$verifyLink";
  $headers = "From: no-reply@yourstore.com";

  mail($email, $subject, $message, $headers);

  echo "Registration successful! Check your email to verify.";
} else {
  echo "Email already exists!";
}
?>
