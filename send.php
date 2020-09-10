<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$agreed = $_POST['agreed'];
$type = $_POST['type'];
$height = $_POST['height'];
$capacity = $_POST['capacity'];
$carrying = $_POST['carrying'];

// Формирование самого письма
$title = "MOVEE";
$body = "
<h2>Заказ грузового автомобия</h2>
<p>Требуется связаться с клиентом для оформления заказа грузового автомобиля для перевозки</p><br>
<b>Имя:</b> $name<br>
<b>Имя:</b> $phone<br>
<b>Тип авто:</b> $type<br><br>
<b>Высота:</b> $height<br><br>
<b>Объем:</b> $capacity<br><br>
<b>Грузоподъемность:</b> $carrying<br><br>
<b>Согласие на рассылку:</b> $agreed<br><br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'test-testov-test2020@mail.ru'; // Логин на почте
    $mail->Password   = 'A1236547'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('test-testov-test2020@mail.ru', 'MOVEE'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('kewipeg631@inxto.net');  
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);