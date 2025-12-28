use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'yourgmail@gmail.com';
  $mail->Password = 'APP_PASSWORD'; // Gmail App Password
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->setFrom('4ufinder@gmail.com', '4ufinder Online Store');
  $mail->addAddress($email);

  $mail->isHTML(true);
  $mail->Subject = 'Password Reset';
  $mail->Body = "Click here to reset password:<br>
  <a href='$link'>$link</a>";

  $mail->send();
  echo "Email sent successfully";
} catch (Exception $e) {
  echo "Mailer Error: " . $mail->ErrorInfo;
}
