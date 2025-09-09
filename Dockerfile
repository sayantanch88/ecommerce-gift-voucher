# Dockerfile for PHP Gift Voucher App
FROM php:8.2-apache
COPY src/ /var/www/html/src/
EXPOSE 80
