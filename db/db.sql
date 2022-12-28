create database if not exists company;

use company;

create table employees(
id int primary key not null auto_increment,
name varchar(45) default null,
salary int(11) default null
);

describe employees;

insert into employees values
(1,"Ryan Ray",20000),
(2,"Joe McMilian",40000),
(3,"Jhon Carter",50000);

select * from employees; 

