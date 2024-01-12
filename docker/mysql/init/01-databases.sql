# create databases
CREATE DATABASE IF NOT EXISTS `db`;
CREATE DATABASE IF NOT EXISTS `test`;

# create root user and grant rights
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';