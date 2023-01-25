create database if not exists company;

use company;

create table employees(
id int primary key not null auto_increment,
img varchar(200),
name varchar(45) default null,
salary int(11) default null
);

describe employees;

select * from employees; 

