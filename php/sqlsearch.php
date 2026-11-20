<?php
$dsn = "mysql:host=localhost; dbname=marketplacem";

$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // Disable emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Disable errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Make the default fetch be an associative array
];
try {
  $pdo = new PDO($dsn, str_replace(array("\r", "\n"), '',file_get_contents('user.txt')), str_replace(array("\r", "\n"), '',file_get_contents('passwd.txt')), $options);
 $data = json_decode( file_get_contents( 'php://input' ), true );
 $sfuncv= $data['Sfunc'];
  
 if ($sfuncv==1){
   $stmt =$pdo -> prepare("SELECT p.ProductID, p.Name AS ProductName, p.Category, p.Price,
       p.InStockQuantity, v.Name AS VendorName, m.Name AS MarketName
FROM Products AS p
JOIN Vendors AS v ON p.VendorID = v.VendorID
JOIN Markets AS m ON v.MarketID = m.MarketID
WHERE p.InStockQuantity > 0
ORDER BY m.Name, p.Name;");
   $sresult = $stmt->fetchAll();
   echo json_encode($results);
 } elseif ($sfuncv==2){ $stmt =$pdo -> prepare("SELECT p.ProductID, p.Name, p.Category, p.Price, v.Name AS VendorName
FROM Products AS p
JOIN Vendors AS v ON p.VendorID = v.VendorID
WHERE p.Name LIKE %:sterm% OR p.Category LIKE %'sterm'%
ORDER BY p.Name;");
  $stmt->bindParam(':sterm',$searcht);
  $sresult = $stmt->fetchAll();
   echo json_encode($results);
   } elseif ($sfuncv==3){
   $stmt =$pdo -> prepare("SELECT ProductID, Name, Category, Price, InStockQuantity
FROM Products
WHERE Category = :sterm AND Price <= :maxp AND InStockQuantity > 0
ORDER BY Price ASC, Name;");
   $stmt->bindParam(':sterm',$searcht);
   $stmt->bomdParam(':maxp',$maxprice);
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==4){
   $stmt =$pdo -> prepare("SELECT MarketID, Name, City, State, OperationHours, Phone
FROM Markets
WHERE City = ':sterm'
ORDER BY Name;");
   $stmt->bindParam(':sterm',$searcht);
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==5){
   $stmt =$pdo -> prepare("SELECT v.VendorID, v.Name AS VendorName, v.Phone, v.OperationHours,
       m.Name AS MarketName
FROM Vendors AS v
JOIN Markets AS m ON v.MarketID = m.MarketID
WHERE m.MarketID = :mnumber
ORDER BY v.Name;");
   $stmt->bindParam(':mnumber',$marketnumber);
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==6){
   $stmt =$pdo -> prepare("SELECT m.MarketID, m.Name, me.Email, mt.Type
FROM Markets AS m
LEFT JOIN MarketEmails AS me ON m.MarketID = me.MarketID
LEFT JOIN MarketTypes AS mt ON m.MarketID = mt.MarketID
ORDER BY m.MarketID, me.Email, mt.Type;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==7){
   $stmt =$pdo -> prepare("SELECT p.ProductID, p.Name AS ProductName, p.InStockQuantity,
       v.Name AS VendorName
FROM Products AS p
JOIN Vendors AS v ON p.VendorID = v.VendorID
WHERE p.InStockQuantity < 10
ORDER BY p.InStockQuantity, p.Name;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==8){
   $stmt =$pdo -> prepare("SELECT o.OrderID, o.OrderDate, o.OrderStatus, p.Name AS ProductName,
       oi.Quantity, oi.UnitPrice, oi.Quantity * oi.UnitPrice AS LineTotal
FROM Orders AS o
JOIN OrderItems AS oi ON o.OrderID = oi.OrderID
JOIN Products AS p ON oi.ProductID = p.ProductID
WHERE o.OrderID = :ordernum
ORDER BY oi.OrderItemID;");
   $stmt->bomdParam(':ordernum',$ordernumber);
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==9){
   $stmt =$pdo -> prepare("SELECT o.OrderID, o.OrderDate, o.OrderStatus, o.PaymentStatus,
       COALESCE(SUM(oi.Quantity * oi.UnitPrice), 0) AS OrderTotal
FROM Orders AS o
LEFT JOIN OrderItems AS oi ON o.OrderID = oi.OrderID
GROUP BY o.OrderID, o.OrderDate, o.OrderStatus, o.PaymentStatus
ORDER BY o.OrderDate DESC, o.OrderID DESC;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==10){
   $stmt =$pdo -> prepare("SELECT v.VendorID, v.Name AS VendorName,
       SUM(oi.Quantity * oi.UnitPrice) AS Revenue
FROM Vendors AS v
JOIN Products AS p ON v.VendorID = p.VendorID
JOIN OrderItems AS oi ON p.ProductID = oi.ProductID
JOIN Orders AS o ON oi.OrderID = o.OrderID
WHERE o.OrderStatus = 'Completed' AND o.PaymentStatus = 'Paid'
GROUP BY v.VendorID, v.Name
ORDER BY Revenue DESC, v.Name;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==11){
   $stmt =$pdo -> prepare("SELECT m.MarketID, m.Name AS MarketName,
       COALESCE(SUM(CASE WHEN o.OrderStatus = 'Completed'
                             AND o.PaymentStatus = 'Paid'
                         THEN oi.Quantity * oi.UnitPrice ELSE 0 END), 0) AS Revenue
FROM Markets AS m
LEFT JOIN Vendors AS v ON m.MarketID = v.MarketID
LEFT JOIN Products AS p ON v.VendorID = p.VendorID
LEFT JOIN OrderItems AS oi ON p.ProductID = oi.ProductID
LEFT JOIN Orders AS o ON oi.OrderID = o.OrderID
GROUP BY m.MarketID, m.Name
ORDER BY Revenue DESC, m.Name;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==12){
   $stmt =$pdo -> prepare("SELECT p.ProductID, p.Name AS ProductName,
       SUM(oi.Quantity) AS UnitsSold
FROM Products AS p
JOIN OrderItems AS oi ON p.ProductID = oi.ProductID
JOIN Orders AS o ON oi.OrderID = o.OrderID
WHERE o.OrderStatus = 'Completed' AND o.PaymentStatus = 'Paid'
GROUP BY p.ProductID, p.Name
ORDER BY UnitsSold DESC, p.Name
LIMIT 10;");
  }elseif ($sfuncv==13){
   $stmt =$pdo -> prepare("SELECT OrderStatus, COUNT(*) AS NumberOfOrders
FROM Orders
GROUP BY OrderStatus
ORDER BY NumberOfOrders DESC;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==14){
   $stmt =$pdo -> prepare("SELECT o.OrderDate, SUM(oi.Quantity * oi.UnitPrice) AS DailyRevenue
FROM Orders AS o
JOIN OrderItems AS oi ON o.OrderID = oi.OrderID
WHERE o.OrderStatus = 'Completed' AND o.PaymentStatus = 'Paid'
GROUP BY o.OrderDate
ORDER BY o.OrderDate;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }elseif ($sfuncv==15){
   $stmt =$pdo -> prepare("SELECT v.VendorID, v.Name AS VendorName,
       COUNT(p.ProductID) AS ProductCount,
       COALESCE(SUM(p.InStockQuantity), 0) AS TotalStockUnits
FROM Vendors AS v
LEFT JOIN Products AS p ON v.VendorID = p.VendorID
GROUP BY v.VendorID, v.Name
ORDER BY ProductCount DESC, v.Name;");
 $sresult = $stmt->fetchAll();
   echo json_encode($results); 
 }
    
 exit();
} 
catch (Exception $e) {
  error_log($e->getMessage());
  exit('Something bad happened'); 
}

?>
