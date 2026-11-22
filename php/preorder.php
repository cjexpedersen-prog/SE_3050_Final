
<?php
header('Content-Type: application/json');
$dsn = 'mysql:host=localhost;dbname=marketplacem;charset=utf8mb4';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=marketplacem;charset=utf8mb4',
        'YOUR_USERNAME',
        'YOUR_PASSWORD',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $data = json_decode(file_get_contents('php://input'), true);

    $productId = filter_var(
        $data['productId'] ?? null,
        FILTER_VALIDATE_INT
    );
    $quantity = filter_var(
        $data['quantity'] ?? null,
        FILTER_VALIDATE_INT
    );

    if (!$productId || !$quantity || $quantity < 1) {
        throw new Exception('Invalid product or quantity.');
    }

    $pdo->beginTransaction();

    // Lock product row while checking inventory
    $stmt = $pdo->prepare(
        'SELECT Price, InStockQuantity
         FROM Products
         WHERE ProductID = ?
         FOR UPDATE'
    );
    $stmt->execute([$productId]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        throw new Exception('Product not found.');
    }

    if ($product['InStockQuantity'] < $quantity) {
        throw new Exception('Not enough inventory available.');
    }

    // Create order
    $orderId = $pdo->query(
        'SELECT COALESCE(MAX(OrderID), 0) + 1
         FROM Orders'
    )->fetchColumn();

    $stmt = $pdo->prepare(
        "INSERT INTO Orders
         (OrderID, OrderDate, OrderStatus,
          PaymentStatus, PaymentMethod)
         VALUES (?, CURDATE(), 'Pre-Ordered',
                 'Unpaid', NULL)"
    );
    $stmt->execute([$orderId]);

    // Create order item
    $orderItemId = $pdo->query(
        'SELECT COALESCE(MAX(OrderItemID), 0) + 1
         FROM OrderItems'
    )->fetchColumn();

    $stmt = $pdo->prepare(
        'INSERT INTO OrderItems
         (OrderItemID, OrderID, ProductID,
          Quantity, UnitPrice)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $orderItemId,
        $orderId,
        $productId,
        $quantity,
        $product['Price']
    ]);

    // Reduce inventory
    $stmt = $pdo->prepare(
        'UPDATE Products
         SET InStockQuantity = InStockQuantity - ?
         WHERE ProductID = ?'
    );
    $stmt->execute([$quantity, $productId]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'message' => 'Pre-order placed successfully!'
    ]);

} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
