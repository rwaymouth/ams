<?php
  include 'db-settings.php';
  $db = 'mysql:dbname='.$config["dbname"].'; host='.$config["hostname"];
  $user = $config["dbuser"];
  $login = $config["dbpassword"];
  $conn = new PDO($db, $user, $login);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $conn->prepare('SELECT * FROM person ORDER BY lastName');
  $stmt->execute();
  $data = array();
  while($row = $stmt->fetch()) {
     array_push($data, $row);
  }

  if(!empty($_POST['action']) && $_POST['action'] == "new") {
    $first = $_POST['firstName'];
    $last = $_POST['lastName'];
    $phone = $_POST['phone'];
    $insert = "INSERT INTO person (firstName, lastName, phone) VALUES (\"".$first."\", \"".$last."\", \"". $phone ."\")";
    $stmt = $conn->prepare($insert);
    $stmt->execute();
    $stmt = $conn->prepare('SELECT LAST_INSERT_ID() FROM person');
    $stmt->execute();
    $data = $stmt->fetch();
    $stmt = $conn->prepare('SELECT * FROM person ORDER BY lastName');
    $stmt->execute();
    $list = array();
    while($row = $stmt->fetch()) {
       array_push($list, $row);
    }
    $entry = array(
      array(
        'entryID' => $data[0],
        'allIDs' => $list
      )
    );

    echo json_encode($entry);
  }

  if(!empty($_POST['action']) && $_POST['action'] == "delete") {
    $id = $_POST["id"];
    $delete = "DELETE FROM person WHERE id=$id";
    $stmt = $conn->prepare($delete);
    $stmt->execute();
    echo $id;
}
