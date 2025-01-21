<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db_config.php';

try {
    $stmt = $pdo->query("SELECT id, name, description, image_url FROM perfumes");
    $perfumes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($perfumes);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

// === Notes ===
// 1. Run the backend on a PHP server (e.g., XAMPP or WAMP) and set up a MySQL database with the `perfumes` table.
// 2. Run the React.js frontend with `npm start`.
// 3. Ensure CORS is enabled on the PHP backend for cross-origin requests.
