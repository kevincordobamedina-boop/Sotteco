FROM php:8.2-apache

# Activar mod_rewrite
RUN a2enmod rewrite

# Copiar archivos
COPY . /var/www/html/

# Configurar Apache para permitir .htaccess
RUN echo '<Directory /var/www/html>\n\
    AllowOverride All\n\
</Directory>' >> /etc/apache2/apache2.conf

# (Opcional pero recomendado si usarás /public)
# RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80