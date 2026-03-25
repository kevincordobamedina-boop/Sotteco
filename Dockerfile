FROM php:8.2-apache

# Activar mod_rewrite
RUN a2enmod rewrite

# Instalar extensiones necesarias para MySQL
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Copiar archivos
COPY . /var/www/html/

# Permitir .htaccess
RUN printf '<Directory /var/www/html>\nAllowOverride All\n</Directory>\n' >> /etc/apache2/apache2.conf

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80