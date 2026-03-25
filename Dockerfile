FROM php:8.2-apache

# Activar mod_rewrite (para rutas)
RUN a2enmod rewrite

# Copiar archivos del proyecto
COPY . /var/www/html/

# Permisos
RUN chown -R www-data:www-data /var/www/html

# Puerto
EXPOSE 80