<?php
$dsn = "mysql:host=localhost; dbname=marketplacem";

$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // Disable emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Disable errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Make the default fetch be an associative array
];
#try {
  $pdo = new PDO($dsn, str_replace(array("\r", "\n"), '',file_get_contents('user.txt')), str_replace(array("\r", "\n"), '',file_get_contents('passwd.txt')), $options);
 $data = json_decode( file_get_contents( 'php://input' ), true );
 $sfuncv= $data['Sfunc'];
 #if ($sfuncv==1){
   $stmt =$pdo -> prepare("SELECT p.ProductID, p.Name AS ProductName, p.Category, p.Price,
       p.InStockQuantity, v.Name AS VendorName, m.Name AS MarketName
FROM Products AS p
JOIN Vendors AS v ON p.VendorID = v.VendorID
JOIN Markets AS m ON v.MarketID = m.MarketID
WHERE p.InStockQuantity > 0
ORDER BY m.Name, p.Name;");
     $stmt->execute();
     $sresult = $stmt->fetchAll(PDO::FETCH_ASSOC);
   echo $results;
 
    
 exit();
#} 
#catch (Exception $e) {
#  error_log($e->getMessage());
#  exit('Something bad happened'); 
#}

?>
