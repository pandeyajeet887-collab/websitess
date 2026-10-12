# Complete Deployment Guide — S&A Global Agro Exporter

This guide provides end-to-end deployment instructions for:
1. **PHP 8.2+ & MySQL 8.0+ Backend / Full-Stack** (cPanel, Shared Hosting, VPS, Ubuntu LAMP/LEMP, AWS EC2, DigitalOcean)
2. **React 19 + TypeScript + Vite Frontend** (Vercel, Netlify, Cloudflare Pages, Nginx)
3. **Production Security & Cron Configuration**

---

## 1. PHP (8.2+) & MySQL Deployment

### A. cPanel / Shared Hosting (Hostinger, Bluehost, GoDaddy, SiteGround)

#### Step 1: Create the MySQL Database
1. Log in to your **cPanel** dashboard.
2. Go to **MySQL Database Wizard** (or **phpMyAdmin**).
3. Create a new database: e.g. `youruser_saglobalagro`.
4. Create a new MySQL user and set a strong password.
5. Assign the user to the database with **ALL PRIVILEGES**.
6. Open **phpMyAdmin**, select `youruser_saglobalagro`, click the **Import** tab, choose `php-backend/database/schema.sql`, and click **Go**.

#### Step 2: Upload Files
1. Open cPanel **File Manager**.
2. Navigate to `public_html/` (or your subdomain directory).
3. Upload the contents of `php-backend/` into `public_html/`.
4. Ensure the `assets/images/` folder contains all the high-resolution rice photos.

#### Step 3: Configure Database Credentials
Edit `config/database.php` with your cPanel database details:
```php
class Database {
    private string $host = 'localhost';
    private string $db_name = 'youruser_saglobalagro';
    private string $username = 'youruser_dbuser';
    private string $password = 'YourStrongPassword123!';
    ...
```

#### Step 4: Configure Email Auto-Reply (SMTP)
Ensure your cPanel email `info@saglobalagro.com` is active under **Email Accounts**.

---

### B. Linux VPS / Cloud Server (Ubuntu 22.04 / 24.04 with LAMP/LEMP)

#### Step 1: Install Required Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apache2 mysql-server php8.2 php8.2-mysql php8.2-curl php8.2-mbstring php8.2-xml php8.2-zip unzip git
sudo a2enmod rewrite ssl headers
sudo systemctl restart apache2
```

#### Step 2: Set Up MySQL
```bash
sudo mysql -u root
```
```sql
CREATE DATABASE sa_global_agro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'agro_user'@'localhost' IDENTIFIED BY 'StrongAgroPass2026!';
GRANT ALL PRIVILEGES ON sa_global_agro.* TO 'agro_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
Import schema:
```bash
mysql -u agro_user -p sa_global_agro < /path/to/php-backend/database/schema.sql
```

#### Step 3: Deploy Files to Web Root
```bash
sudo cp -r /path/to/php-backend/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

#### Step 4: Configure Apache VirtualHost
Create `/etc/apache2/sites-available/saglobalagro.conf`:
```apache
<VirtualHost *:80>
    ServerName saglobalagro.com
    ServerAlias www.saglobalagro.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/agro_error.log
    CustomLog ${APACHE_LOG_DIR}/agro_access.log combined
</VirtualHost>
```
Enable site and restart:
```bash
sudo a2ensite saglobalagro.conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

#### Step 5: Install Free SSL Certificate (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d saglobalagro.com -d www.saglobalagro.com
```

#### Step 6: Automated Forex Sync Cron Job
To automatically sync USD and EUR exchange rates daily at 09:00 AM:
```bash
sudo crontab -e
```
Add:
```cron
0 9 * * 1-5 /usr/bin/php /var/www/html/cron/sync_forex.php >> /var/log/forex_sync.log 2>&1
```

---

## 2. React (Vite + TypeScript) Deployment

### A. Vercel (Recommended for React SPA)
1. Push `react-frontend` to your GitHub / GitLab repository.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. Set **Framework Preset**: `Vite`.
5. Set **Root Directory**: `react-frontend` (or project root).
6. Build settings are auto-detected:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **Deploy**.

### B. Netlify
1. Drag and drop the `dist/` folder into Netlify, OR connect your GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/`:
   ```text
   /*    /index.html   200
   ```

### C. Self-Hosted Static Web Server (Nginx)
```bash
cd react-frontend
npm install
npm run build
```
Copy `dist/` to `/var/www/saglobalagro-app/`:
```nginx
server {
    listen 80;
    server_name saglobalagro.com;

    root /var/www/saglobalagro-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 3. Production Security Checklist

1. **Change Default Admin Password**:
   - Run `password_hash('YourNewSecurePass!', PASSWORD_BCRYPT)` in PHP and update the `admins` table.
2. **Hide PHP Errors in Production**:
   - In `php.ini`, ensure:
     ```ini
     display_errors = Off
     log_errors = On
     error_reporting = E_ALL
     ```
3. **Database Port Protection**:
   - Ensure MySQL port `3306` is bound strictly to `127.0.0.1` and not accessible to the public internet.
4. **HTTPS / HSTS**:
   - Enforce HTTPS redirect so all export quotes and invoices are transmitted over TLS 1.3 encryption.
