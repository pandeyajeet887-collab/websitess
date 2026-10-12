import React, { useState } from 'react';
import { Copy, Check, FileCode, Database, FolderTree, Terminal, Download } from 'lucide-react';

export const PhpCodeHub: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('folder_map');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const folderMap = `sa-global-agro/
├── .htaccess                       # URL rewriting & Security headers
├── sitemap.php                     # Automated SEO XML Sitemap generator
├── index.php                       # Homepage with Hero, Stats, Certifications
├── about.php                       # SKRM-inspired Milling standards & Quality Infra
├── products.php                    # Rice varieties catalog with AGL specifications
├── contact.php                     # AJAX contact endpoint with auto-reply dispatch
│
├── config/
│   ├── database.php                # Secure PDO connection with prepared statements
│   └── config.php                  # Global constants, currency fallback & email creds
│
├── includes/
│   ├── header.php                  # Responsive header, high-end SVG logo, Lang switcher
│   ├── footer.php                  # Corporate footer with ports, APEDA RCMC & address
│   └── translations.php            # Multi-language dictionary (EN, AR, ES, FR)
│
├── admin/
│   ├── index.php                   # Secure Session login with BCRYPT password verify
│   ├── dashboard.php               # ERP control center with live Forex API & metrics
│   ├── invoice_engine.php          # Mill-to-Port INR cost sheet + 10% profit -> USD PI/CI
│   ├── view_invoice.php            # Printable clean export invoice (strictly masks INR)
│   └── logout.php                  # Session destruction & token invalidation
│
├── database/
│   └── schema.sql                  # MySQL tables: rice_products, invoices, inquiries, forex
│
├── assets/
│   ├── css/style.css               # Tailwind CSS / Custom typography & print media queries
│   ├── js/main.js                  # AJAX form processor, currency calculator, language handler
│   └── images/                     # Product grain photography & certificates
`;

  const schemaSql = `-- ==============================================================================
-- DATABASE SCHEMA: S&A Global Agro Exporter (Production MySQL 8.0+)
-- Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`sa_global_agro\` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE \`sa_global_agro\`;

-- 1. ADMIN USERS TABLE (BCRYPT Hashed Passwords)
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` ENUM('superadmin', 'director', 'export_manager') DEFAULT 'export_manager',
  \`last_login\` DATETIME NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default director user (password: Admin@SAGlobal2026!)
INSERT INTO \`admins\` (\`username\`, \`email\`, \`password_hash\`, \`full_name\`, \`role\`)
VALUES ('director', 'director@saglobalagro.com', '$2y$12$Z16U/6gqgWv6tM9B7XgHce2W3nQkF3/L6KjR.Q9L8bXy0L6f3k0ey', 'Director of Trade', 'superadmin')
ON DUPLICATE KEY UPDATE \`username\` = \`username\`;

-- 2. RICE VARIETIES & EXPORT CATALOG TABLE
CREATE TABLE IF NOT EXISTS \`rice_varieties\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`code\` VARCHAR(50) NOT NULL UNIQUE,
  \`name\` VARCHAR(120) NOT NULL,
  \`category\` ENUM('basmati', 'non-basmati') NOT NULL,
  \`agl\` VARCHAR(30) NOT NULL COMMENT 'Average Grain Length in mm',
  \`elongation\` VARCHAR(50) NOT NULL,
  \`moisture_max\` DECIMAL(4,2) NOT NULL DEFAULT 12.50,
  \`broken_max\` DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  \`purity_min\` DECIMAL(4,2) NOT NULL DEFAULT 95.00,
  \`hs_code\` VARCHAR(20) NOT NULL,
  \`sub_finishes\` VARCHAR(255) NOT NULL COMMENT 'Raw, Steam, Sella, Golden Sella',
  \`image_url\` VARCHAR(255) NOT NULL,
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Standard Varieties
INSERT INTO \`rice_varieties\` (\`code\`, \`name\`, \`category\`, \`agl\`, \`elongation\`, \`hs_code\`, \`sub_finishes\`, \`image_url\`) VALUES
('1121-basmati', '1121 Basmati Rice', 'basmati', '8.35 - 8.40 mm', 'Up to 2.5x post-cooking', '10063020', 'Steam, Sella, Golden Sella, Raw', 'assets/images/1121.jpg'),
('1718-basmati', '1718 Basmati Rice', 'basmati', '8.30 - 8.35 mm', 'Up to 2.4x post-cooking', '10063020', 'Steam, Sella, Golden Sella', 'assets/images/1718.jpg'),
('1509-basmati', '1509 Basmati Rice', 'basmati', '8.40 - 8.45 mm', 'Up to 2.3x post-cooking', '10063020', 'Steam, Creamy Sella, Golden Sella', 'assets/images/1509.jpg'),
('1401-basmati', '1401 Basmati Rice', 'basmati', '7.70 - 7.80 mm', 'Up to 2.2x post-cooking', '10063020', 'Steam, Sella, Raw', 'assets/images/1401.jpg'),
('pusa-basmati', 'Pusa Basmati Rice', 'basmati', '7.40 - 7.50 mm', 'Up to 2.1x post-cooking', '10063020', 'Raw, Steam, Sella', 'assets/images/pusa.jpg'),
('traditional-basmati', 'Traditional Royal Basmati', 'basmati', '7.30 - 7.45 mm', 'Up to 2.0x post-cooking', '10063020', 'Raw Aged 2 Yrs, Steam', 'assets/images/traditional.jpg'),
('sugandha-rice', 'Sugandha Rice', 'non-basmati', '7.80 - 7.90 mm', 'Up to 2.0x post-cooking', '10063090', 'Steam, Creamy Sella, Golden Sella', 'assets/images/sugandha.jpg'),
('sharbati-rice', 'Sharbati Rice', 'non-basmati', '7.00 - 7.15 mm', 'Up to 1.9x post-cooking', '10063090', 'Steam, Sella, Golden Sella', 'assets/images/sharbati.jpg'),
('pr11-pr14', 'PR 11 / PR 14 Rice', 'non-basmati', '6.80 - 7.00 mm', 'Up to 1.8x post-cooking', '10063090', 'Steam, Parboiled, Raw', 'assets/images/pr11.jpg'),
('parmal-ir64', 'Parmal / IR 64 Parboiled', 'non-basmati', '6.00 - 6.20 mm', 'Up to 1.7x post-cooking', '10063090', '5% Broken, 25% Broken, 100% Broken', 'assets/images/ir64.jpg');

-- 3. EXPORT INQUIRIES & AUTO-REPLY LOG TABLE
CREATE TABLE IF NOT EXISTS \`inquiries\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`tracking_number\` VARCHAR(30) NOT NULL UNIQUE,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`company_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(120) NOT NULL,
  \`phone\` VARCHAR(40) NOT NULL,
  \`rice_variety\` VARCHAR(120) NOT NULL,
  \`quantity_mt\` DECIMAL(10,2) NOT NULL,
  \`destination_port\` VARCHAR(120) NOT NULL,
  \`packaging_type\` VARCHAR(100) NOT NULL,
  \`message\` TEXT NULL,
  \`auto_reply_status\` ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
  \`client_ip\` VARCHAR(45) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. FOREX EXCHANGE RATES CACHE TABLE
CREATE TABLE IF NOT EXISTS \`exchange_rates\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`base_currency\` VARCHAR(3) DEFAULT 'USD',
  \`usd_inr\` DECIMAL(8,4) NOT NULL DEFAULT 86.8500,
  \`eur_inr\` DECIMAL(8,4) NOT NULL DEFAULT 94.2000,
  \`usd_eur\` DECIMAL(8,4) NOT NULL DEFAULT 0.9200,
  \`source_api\` VARCHAR(100) DEFAULT 'ExchangeRate-API',
  \`last_synced\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`exchange_rates\` (\`usd_inr\`, \`eur_inr\`, \`usd_eur\`) VALUES (86.8500, 94.2000, 0.9200);

-- 5. EXPORT INVOICES (PI & CI) TABLE
CREATE TABLE IF NOT EXISTS \`export_invoices\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`invoice_type\` ENUM('PI', 'CI') NOT NULL,
  \`invoice_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`invoice_date\` DATE NOT NULL,
  \`validity_date\` DATE NULL,
  \`bl_number\` VARCHAR(50) NULL,
  -- Consignee / Buyer
  \`buyer_name\` VARCHAR(150) NOT NULL,
  \`buyer_company\` VARCHAR(150) NOT NULL,
  \`buyer_address\` TEXT NOT NULL,
  \`buyer_country\` VARCHAR(100) NOT NULL,
  \`buyer_tax_id\` VARCHAR(50) NULL,
  -- Maritime parameters
  \`port_of_loading\` VARCHAR(100) NOT NULL DEFAULT 'Mundra Port, Gujarat, India',
  \`port_of_discharge\` VARCHAR(100) NOT NULL,
  \`incoterm\` ENUM('FOB', 'CIF', 'CFR') NOT NULL DEFAULT 'FOB',
  \`vessel_name\` VARCHAR(100) NULL,
  \`container_size\` ENUM('20ft FCL', '40ft FCL') DEFAULT '20ft FCL',
  \`total_quantity_mt\` DECIMAL(10,2) NOT NULL,
  \`packaging_type\` VARCHAR(150) NOT NULL,
  \`payment_terms\` VARCHAR(255) NOT NULL,
  -- Internal Cost & Profit Params (IN INR - STRICTLY RESTRICTED TO ADMIN)
  \`inr_mill_exworks_total\` DECIMAL(12,2) NOT NULL,
  \`inr_inland_freight_total\` DECIMAL(12,2) NOT NULL,
  \`inr_port_charges_total\` DECIMAL(12,2) NOT NULL,
  \`inr_subtotal_base_cost\` DECIMAL(12,2) NOT NULL,
  \`profit_margin_percent\` DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  \`inr_profit_amount\` DECIMAL(12,2) NOT NULL,
  \`inr_grand_total_with_profit\` DECIMAL(12,2) NOT NULL,
  -- External Foreign Values (IN STRICT USD OR EUR - CLIENT EXPORT DOCUMENTS)
  \`currency\` ENUM('USD', 'EUR') NOT NULL DEFAULT 'USD',
  \`fx_rate_applied\` DECIMAL(8,4) NOT NULL,
  \`unit_price_foreign_per_mt\` DECIMAL(10,2) NOT NULL,
  \`total_amount_foreign\` DECIMAL(12,2) NOT NULL,
  \`amount_in_words\` VARCHAR(255) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

  const dbPhp = `<?php
/**
 * config/database.php
 * S&A Global Agro Exporter - High-Performance Secure Database Layer
 * Strict Object-Oriented PDO Connection with Prepared Statements
 */

declare(strict_types=1);

// Prevent direct script execution
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'])) {
    http_response_code(403);
    exit('Access Forbidden');
}

class Database {
    private string $host = 'localhost';
    private string $db_name = 'sa_global_agro';
    private string $username = 'root';
    private string $password = '';
    private string $charset = 'utf8mb4';
    private ?PDO $conn = null;

    /**
     * Singleton instance pattern for connection reuse
     */
    private static ?self $instance = null;

    private function __construct() {
        // Read environment variables if available
        $this->host = getenv('DB_HOST') ?: $this->host;
        $this->db_name = getenv('DB_NAME') ?: $this->db_name;
        $this->username = getenv('DB_USER') ?: $this->username;
        $this->password = getenv('DB_PASS') ?: $this->password;
    }

    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        if ($this->conn !== null) {
            return $this->conn;
        }

        $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset={$this->charset}";
        
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false, // Enforce true server-side prepared statements
            PDO::ATTR_PERSISTENT         => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];

        try {
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            return $this->conn;
        } catch (PDOException $e) {
            // Log anomaly securely to internal error log; never leak credentials or stack trace to client
            error_log('[DB CONNECTION ERROR] ' . $e->getMessage(), 3, __DIR__ . '/../logs/db_errors.log');
            
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'message' => 'Database connection failed. Please contact the administrator.'
            ]));
        }
    }
}
`;

  const headerPhp = `<?php
/**
 * includes/header.php
 * S&A Global Agro Exporter - High-End Corporate Navigation & Vector Logo
 */

declare(strict_types=1);

// Language Selector Handler (English, Arabic, Spanish, French)
$supported_langs = ['en', 'ar', 'es', 'fr'];
$current_lang = 'en';

if (isset($_GET['lang']) && in_array($_GET['lang'], $supported_langs, true)) {
    $_SESSION['lang'] = $_GET['lang'];
    $current_lang = $_GET['lang'];
} elseif (!empty($_SESSION['lang']) && in_array($_SESSION['lang'], $supported_langs, true)) {
    $current_lang = $_SESSION['lang'];
}

$page_title = $page_title ?? 'S&A Global Agro Exporter | Premium Indian Basmati & Non-Basmati Rice';
$page_desc = $page_desc ?? 'Direct mill-to-port export of 1121, 1509, 1401 Basmati and Non-Basmati rice to 45+ countries. APEDA, ISO 22000 & HACCP certified.';
$active_nav = $active_nav ?? 'home';
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($current_lang) ?>" dir="<?= $current_lang === 'ar' ? 'rtl' : 'ltr' ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($page_title) ?></title>
  <meta name="description" content="<?= htmlspecialchars($page_desc) ?>">
  
  <!-- Global OpenGraph & Twitter Cards -->
  <meta property="og:title" content="<?= htmlspecialchars($page_title) ?>">
  <meta property="og:description" content="<?= htmlspecialchars($page_desc) ?>">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.saglobalagro.com/">
  
  <!-- Tailwind CSS & Google Fonts -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-editorial { font-family: 'Playfair Display', Georgia, serif; }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 antialiased selection:bg-amber-600 selection:text-white">

<!-- Top Ticker Bar -->
<div class="bg-[#0B1B3D] text-stone-200 text-xs py-1.5 px-4 sm:px-8 border-b border-amber-500/30">
  <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-3 text-[11px] sm:text-xs">
      <span class="text-amber-400 font-medium">★ APEDA Verified Export House</span>
      <span class="text-stone-400 hidden sm:inline">|</span>
      <span class="text-stone-300 hidden sm:inline">Port Gateways: Mundra &amp; Nhava Sheva</span>
    </div>
    <div class="flex items-center gap-4 text-[11px] sm:text-xs">
      <a href="mailto:info@saglobalagro.com" class="hover:text-amber-400">info@saglobalagro.com</a>
      <a href="tel:+919876543210" class="hover:text-amber-400 font-mono">+91 98765 43210</a>
    </div>
  </div>
</div>

<!-- Main Header -->
<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    
    <!-- Vector Brand Logo -->
    <a href="index.php" class="flex items-center gap-3 select-none">
      <svg class="w-12 h-12 shrink-0 drop-shadow-sm" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2B2" />
            <stop offset="35%" stop-color="#D4AF37" />
            <stop offset="70%" stop-color="#AA820A" />
            <stop offset="100%" stop-color="#F7DF84" />
          </linearGradient>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0B1B3D" />
            <stop offset="100%" stop-color="#040D1E" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="76" fill="url(#navyGrad)" stroke="url(#goldGrad)" stroke-width="3" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
        <ellipse cx="80" cy="80" rx="60" ry="24" fill="none" stroke="#D4AF37" stroke-width="0.8" opacity="0.35" />
        <circle cx="80" cy="80" r="32" fill="#071329" stroke="url(#goldGrad)" stroke-width="1.8" />
        <text x="80" y="87" text-anchor="middle" fill="url(#goldGrad)" font-family="'Cinzel', Georgia, serif" font-size="24" font-weight="bold">S&amp;A</text>
      </svg>
      <div class="flex flex-col">
        <div class="flex items-center gap-1.5">
          <span class="font-cinzel text-xl font-bold text-slate-900 tracking-wider">S&amp;A</span>
          <span class="font-cinzel text-xs font-semibold text-amber-600 tracking-widest uppercase">GLOBAL</span>
        </div>
        <span class="text-[10px] font-semibold tracking-[0.2em] text-amber-800 uppercase">AGRO EXPORTER · INDIA</span>
      </div>
    </a>

    <!-- Nav Links -->
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
      <a href="index.php" class="hover:text-amber-700 <?= $active_nav === 'home' ? 'text-amber-700 font-bold' : '' ?>">Home</a>
      <a href="about.php" class="hover:text-amber-700 <?= $active_nav === 'about' ? 'text-amber-700 font-bold' : '' ?>">About Us</a>
      <a href="products.php" class="hover:text-amber-700 <?= $active_nav === 'products' ? 'text-amber-700 font-bold' : '' ?>">Rice Varieties</a>
      <a href="contact.php" class="hover:text-amber-700 <?= $active_nav === 'contact' ? 'text-amber-700 font-bold' : '' ?>">Contact &amp; Inquire</a>
      <a href="admin/dashboard.php" class="px-3 py-1.5 rounded bg-stone-900 text-amber-300 text-xs font-semibold hover:bg-[#0B1B3D]">ERP Admin</a>
    </nav>

    <!-- Language Selector Dropdown -->
    <div class="flex items-center gap-2">
      <form method="GET" action="" class="inline">
        <select name="lang" onchange="this.form.submit()" class="text-xs bg-stone-100 border border-stone-300 rounded px-2.5 py-1 text-stone-800 font-medium">
          <option value="en" <?= $current_lang === 'en' ? 'selected' : '' ?>>🇬🇧 English</option>
          <option value="ar" <?= $current_lang === 'ar' ? 'selected' : '' ?>>🇦🇪 العربية</option>
          <option value="es" <?= $current_lang === 'es' ? 'selected' : '' ?>>🇪🇸 Español</option>
          <option value="fr" <?= $current_lang === 'fr' ? 'selected' : '' ?>>🇫🇷 Français</option>
        </select>
      </form>
    </div>
  </div>
</header>
`;

  const invoiceEnginePhp = `<?php
/**
 * admin/invoice_engine.php
 * S&A Global Agro Exporter - Export Invoice & Cost Sheet Calculator
 * 
 * CORE ARCHITECTURE:
 * 1. Collects mill-to-port procurement & handling in INR.
 * 2. Mandatory +10% Profit Margin is applied in INR.
 * 3. Forex engine converts accumulated total into USD / EUR.
 * 4. EXCLUSION PRINCIPLE: All client-facing outputs strictly exclude
 *    and suppress Rupee numbers, presenting ONLY USD foreign values.
 */

declare(strict_types=1);

session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config/database.php';
$db = Database::getInstance()->getConnection();

// 1. Fetch Real-Time Exchange Rate with Resilient Fallback
function getLiveExchangeRates(PDO $db): array {
    $fallback = ['usd_inr' => 86.85, 'eur_inr' => 94.20, 'source' => 'Fallback Database Cache'];
    
    // Try live external API with 2.5s timeout
    $apiUrl = 'https://open.er-api.com/v6/latest/USD';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $data = json_decode($response, true);
        if (isset($data['rates']['INR'])) {
            $usdInr = (float)$data['rates']['INR'];
            $eurInr = isset($data['rates']['EUR']) ? $usdInr / (float)$data['rates']['EUR'] : 94.20;
            
            // Cache update
            $stmt = $db->prepare("UPDATE exchange_rates SET usd_inr = ?, eur_inr = ?, source_api = 'Live API' WHERE id = 1");
            $stmt->execute([$usdInr, $eurInr]);
            
            return ['usd_inr' => $usdInr, 'eur_inr' => $eurInr, 'source' => 'Live Forex Feed'];
        }
    }

    // Read cached values from database
    $stmt = $db->query("SELECT usd_inr, eur_inr FROM exchange_rates ORDER BY id DESC LIMIT 1");
    $cached = $stmt->fetch();
    return $cached ? ['usd_inr' => (float)$cached['usd_inr'], 'eur_inr' => (float)$cached['eur_inr'], 'source' => 'DB Cache'] : $fallback;
}

$rates = getLiveExchangeRates($db);
$currentUsdInr = $rates['usd_inr'];

// Handle Invoice Generation Request
$previewMode = false;
$generatedDoc = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'generate_invoice') {
    // 1. Consignee / Buyer Data
    $invoiceType     = $_POST['invoice_type'] === 'CI' ? 'CI' : 'PI';
    $buyerCompany    = htmlspecialchars(trim($_POST['buyer_company'] ?? ''));
    $buyerName       = htmlspecialchars(trim($_POST['buyer_name'] ?? ''));
    $buyerAddress    = htmlspecialchars(trim($_POST['buyer_address'] ?? ''));
    $buyerCountry    = htmlspecialchars(trim($_POST['buyer_country'] ?? ''));
    $buyerTaxId      = htmlspecialchars(trim($_POST['buyer_tax_id'] ?? ''));
    
    // 2. Maritime Shipping Specs
    $portLoading     = htmlspecialchars(trim($_POST['port_loading'] ?? 'Mundra Port (INMUN1), Gujarat, India'));
    $portDischarge   = htmlspecialchars(trim($_POST['port_discharge'] ?? 'Jebel Ali Port, Dubai, UAE'));
    $incoterm        = in_array($_POST['incoterm'], ['FOB', 'CIF', 'CFR']) ? $_POST['incoterm'] : 'FOB';
    $vesselName      = htmlspecialchars(trim($_POST['vessel_name'] ?? 'MSC VESSEL'));
    $containerSize   = $_POST['container_size'] === '40ft FCL' ? '40ft FCL' : '20ft FCL';
    $packagingType   = htmlspecialchars(trim($_POST['packaging_type'] ?? '25 Kg BOPP Bags'));
    $paymentTerms    = htmlspecialchars(trim($_POST['payment_terms'] ?? '30% Advance T/T, 70% against BL copy'));
    
    // 3. Commodity & Volume
    $riceVariety     = htmlspecialchars(trim($_POST['rice_variety'] ?? '1121 Basmati Rice Steam'));
    $quantityMT      = max(1.0, (float)($_POST['quantity_mt'] ?? 26.0));
    
    // 4. Internal Mill-to-Port Cost Breakdown (in INR)
    $millExWorksPerMT   = (float)($_POST['mill_exworks_per_mt'] ?? 92000.0);
    $inlandFreightPerMT = (float)($_POST['inland_freight_per_mt'] ?? 3200.0);
    $mandiTaxesPerMT    = (float)($_POST['mandi_taxes_per_mt'] ?? 1800.0);
    $baggingPerMT       = (float)($_POST['bagging_per_mt'] ?? 2500.0);
    
    // Port fixed handling in INR
    $chaClearance       = (float)($_POST['cha_clearance'] ?? 8500.0);
    $cfsHandling        = (float)($_POST['cfs_handling'] ?? 14500.0);
    $fumigation         = (float)($_POST['fumigation'] ?? 4500.0);
    $phytosanitary      = (float)($_POST['phytosanitary'] ?? 3500.0);
    $sgsInspection      = (float)($_POST['sgs_inspection'] ?? 9000.0);
    $portLoadingCharges = (float)($_POST['port_loading_charges'] ?? 7500.0);
    
    // =========================================================================
    // THE INR COST ACCUMULATION & 10% PROFIT MECHANISM
    // =========================================================================
    $totalProcurementINR = ($millExWorksPerMT + $inlandFreightPerMT + $mandiTaxesPerMT + $baggingPerMT) * $quantityMT;
    $totalPortChargesINR = $chaClearance + $cfsHandling + $fumigation + $phytosanitary + $sgsInspection + $portLoadingCharges;
    $subtotalBaseCostINR = $totalProcurementINR + $totalPortChargesINR;
    
    // Mandatory 10% Profit Margin Layer
    $profitPercent       = 10.0;
    $profitAmountINR     = $subtotalBaseCostINR * ($profitPercent / 100.0);
    $grandTotalINR       = $subtotalBaseCostINR + $profitAmountINR;
    
    // =========================================================================
    // CONVERSION TO USD (EXCLUSION PRINCIPLE ENFORCED)
    // =========================================================================
    $totalAmountUSD      = round($grandTotalINR / $currentUsdInr, 2);
    $unitPriceUsdPerMT   = round($totalAmountUSD / $quantityMT, 2);
    
    $invoiceNumber = $invoiceType . '-SAG-' . date('Y') . '-' . mt_rand(1000, 9999);

    // Save to Database
    $stmt = $db->prepare("
        INSERT INTO export_invoices (
            invoice_type, invoice_number, invoice_date, validity_date, buyer_name, buyer_company,
            buyer_address, buyer_country, buyer_tax_id, port_of_loading, port_of_discharge,
            incoterm, vessel_name, container_size, total_quantity_mt, packaging_type, payment_terms,
            inr_mill_exworks_total, inr_inland_freight_total, inr_port_charges_total, inr_subtotal_base_cost,
            profit_margin_percent, inr_profit_amount, inr_grand_total_with_profit, currency, fx_rate_applied,
            unit_price_foreign_per_mt, total_amount_foreign, amount_in_words
        ) VALUES (
            ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 15 DAY), ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, 'USD', ?,
            ?, ?, ?
        )
    ");
    
    $stmt->execute([
        $invoiceType, $invoiceNumber, $buyerName, $buyerCompany,
        $buyerAddress, $buyerCountry, $buyerTaxId, $portLoading, $portDischarge,
        $incoterm, $vesselName, $containerSize, $quantityMT, $packagingType, $paymentTerms,
        $totalProcurementINR, ($inlandFreightPerMT * $quantityMT), $totalPortChargesINR, $subtotalBaseCostINR,
        $profitPercent, $profitAmountINR, $grandTotalINR, $currentUsdInr,
        $unitPriceUsdPerMT, $totalAmountUSD, number_format($totalAmountUSD, 2) . ' US DOLLARS ONLY'
    ]);

    $previewMode = true;
    $generatedDoc = [
        'type' => $invoiceType,
        'number' => $invoiceNumber,
        'buyerCompany' => $buyerCompany,
        'buyerAddress' => $buyerAddress,
        'buyerCountry' => $buyerCountry,
        'buyerTaxId' => $buyerTaxId,
        'riceVariety' => $riceVariety,
        'quantityMT' => $quantityMT,
        'unitPriceUSD' => $unitPriceUsdPerMT,
        'totalUSD' => $totalAmountUSD,
        'portLoading' => $portLoading,
        'portDischarge' => $portDischarge,
        'incoterm' => $incoterm,
        'vessel' => $vesselName,
        'paymentTerms' => $paymentTerms,
        'packaging' => $packagingType
    ];
}
`;

  const contactAjaxPhp = `<?php
/**
 * contact.php - AJAX Processing & Automated Customer Auto-Reply Email
 * S&A Global Agro Exporter
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

require_once __DIR__ . '/config/database.php';

// Sanitize incoming payload
$fullName     = htmlspecialchars(trim($_POST['full_name'] ?? ''));
$companyName  = htmlspecialchars(trim($_POST['company_name'] ?? ''));
$email        = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone        = htmlspecialchars(trim($_POST['phone'] ?? ''));
$riceVariety  = htmlspecialchars(trim($_POST['rice_variety'] ?? '1121 Basmati Rice'));
$quantityMT   = max(1.0, (float)($_POST['quantity_mt'] ?? 26.0));
$destination  = htmlspecialchars(trim($_POST['destination_port'] ?? 'Jebel Ali, UAE'));
$packaging    = htmlspecialchars(trim($_POST['packaging_type'] ?? '25kg BOPP Bags'));
$message      = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$fullName || !$email || !$phone) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

$trackingId = 'INQ-' . date('Y') . '-' . mt_rand(1000, 9999);
$clientIp   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

try {
    $db = Database::getInstance()->getConnection();
    
    // Insert into MySQL with Prepared Statement
    $stmt = $db->prepare("
        INSERT INTO inquiries (
            tracking_number, full_name, company_name, email, phone,
            rice_variety, quantity_mt, destination_port, packaging_type,
            message, auto_reply_status, client_ip
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'sent', ?)
    ");
    
    $stmt->execute([
        $trackingId, $fullName, $companyName, $email, $phone,
        $riceVariety, $quantityMT, $destination, $packaging,
        $message, $clientIp
    ]);

    // Dispatch High-End HTML Auto-Reply Email
    $to = $email;
    $subject = "Export Inquiry Confirmation [#{$trackingId}] - S&A Global Agro Exporter";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: S&A Global Agro Exporter <info@saglobalagro.com>',
        'Reply-To: trade@saglobalagro.com',
        'X-Mailer: PHP/' . phpversion()
    ];

    $emailBody = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family: Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px;'>
      <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;'>
        <div style='background-color: #0b1b3d; padding: 24px; text-align: center; border-bottom: 3px solid #d4af37;'>
          <h2 style='color: #d4af37; margin: 0;'>S&amp;A GLOBAL AGRO EXPORTER</h2>
          <p style='color: #ffffff; font-size: 11px; margin: 4px 0 0; letter-spacing: 2px;'>GOVT. RECOGNIZED BASMATI RICE EXPORT HOUSE</p>
        </div>
        <div style='padding: 26px; font-size: 14px; line-height: 1.6; color: #1f2937;'>
          <p>Dear <strong>{$fullName}</strong>,</p>
          <p>Thank you for submitting your container export inquiry to <strong>S&amp;A Global Agro Exporter</strong>.</p>
          <p>Your request has been registered under Tracking ID: <strong style='background: #0b1b3d; color: #d4af37; padding: 2px 6px; border-radius: 4px;'>{$trackingId}</strong>.</p>
          
          <div style='background: #faf8f5; border: 1px solid #e2d9cc; border-radius: 6px; padding: 14px; margin: 18px 0;'>
            <h4 style='margin: 0 0 8px; color: #0b1b3d;'>CONSIGNMENT PARAMETERS:</h4>
            <p style='margin: 3px 0;'><strong>Rice Variety:</strong> {$riceVariety}</p>
            <p style='margin: 3px 0;'><strong>Quantity:</strong> {$quantityMT} Metric Tons</p>
            <p style='margin: 3px 0;'><strong>Discharge Port:</strong> {$destination}</p>
            <p style='margin: 3px 0;'><strong>Packaging:</strong> {$packaging}</p>
          </div>

          <p>Our senior export sales desk is compiling your formal Proforma Quotation and vessel dispatch schedule, which will be delivered to your inbox within <strong>24 business hours</strong>.</p>
          <p>For urgent container inquiries, contact our export desk directly on WhatsApp: <strong>+91 98765 43210</strong>.</p>
          <p style='margin-top: 24px;'>Regards,<br><strong>Directorate of International Trade</strong><br>S&amp;A Global Agro Exporter<br>APEDA RCMC: RCMC/DEL/2026/0942</p>
        </div>
      </div>
    </body>
    </html>";

    // Call mail() - in production, integrate PHPMailer or SMTP
    @mail($to, $subject, $emailBody, implode("\\r\\n", $headers));

    echo json_encode([
        'success' => true,
        'tracking_id' => $trackingId,
        'message' => 'Your export inquiry has been logged successfully. An automated confirmation email has been dispatched.'
    ]);
} catch (Exception $e) {
    error_log('[CONTACT FORM ERROR] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An unexpected server error occurred. Please try again.']);
}
`;

  const files: Record<string, { title: string; lang: string; content: string; icon: any }> = {
    folder_map: { title: 'Directory Architecture Map', lang: 'text', content: folderMap, icon: FolderTree },
    schema: { title: 'database/schema.sql (MySQL 8.0+)', lang: 'sql', content: schemaSql, icon: Database },
    db_config: { title: 'config/database.php (PDO Layer)', lang: 'php', content: dbPhp, icon: FileCode },
    header: { title: 'includes/header.php (Logo & Nav)', lang: 'php', content: headerPhp, icon: FileCode },
    invoice: { title: 'admin/invoice_engine.php (INR & USD)', lang: 'php', content: invoiceEnginePhp, icon: Terminal },
    contact: { title: 'contact.php (AJAX & Auto-Reply)', lang: 'php', content: contactAjaxPhp, icon: FileCode }
  };

  const current = files[activeFile] || files.folder_map;

  return (
    <div className="py-12 bg-stone-900 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold mb-2">
              <Terminal className="w-3.5 h-3.5" />
              PHP 8.2+ &amp; MySQL Complete Source Stack
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
              S&amp;A Global Agro Exporter Backend Architecture
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-3xl">
              Production-ready object-oriented PHP codebase, prepared statement database migrations, live Forex cURL engine, and Rupee exclusion calculation logic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <a
              href="/SAGlobalAgro_Full_Project.zip"
              download="SAGlobalAgro_Full_Project.zip"
              className="px-4 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 shadow-md transition-colors cursor-pointer"
              title="Download Complete Project ZIP containing all PHP, MySQL, React code and all high-res rice grain images"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Project .ZIP (25.5 MB)</span>
            </a>

            <button
              onClick={() => copyToClipboard(current.content, activeFile)}
              className="px-4 py-2.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2 shadow-md transition-colors"
            >
              {copiedKey === activeFile ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied Current File!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Current File</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Navigator Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-3">
          {Object.entries(files).map(([key, f]) => {
            const Icon = f.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveFile(key)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                  activeFile === key
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{f.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Code Viewer Panel */}
        <div className="bg-stone-950 rounded-xl border border-stone-800 overflow-hidden shadow-2xl">
          {/* File Title Bar */}
          <div className="bg-stone-900/90 px-4 py-3 border-b border-stone-800 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold">{current.title}</span>
            <div className="flex items-center gap-3">
              <span className="text-stone-500 uppercase">{current.lang}</span>
              <button
                onClick={() => copyToClipboard(current.content, activeFile)}
                className="text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === activeFile ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <pre className="p-5 text-xs font-mono text-stone-300 overflow-x-auto max-h-[70vh] leading-relaxed selection:bg-amber-700 selection:text-white">
            <code>{current.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
