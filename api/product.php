// api/product.php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db_config.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

try {
    $stmt = $pdo->prepare("SELECT perfumes.*, brands.name AS brand FROM perfumes JOIN brands ON perfumes.brand_id = brands.id WHERE perfumes.id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(["error" => "Product not found"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

// === Notes ===
// 1. Updated backend to include individual product details API endpoint.
// 2. Improved frontend by adding Header, Footer, and better card layout for Catalog.
// 3. Extended Product page to fetch and display detailed information.
