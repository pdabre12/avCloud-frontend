-- drop database if exists avCloud_db;
-- create database avCloud_db;
use avCloud_db;

drop TABLE if exists cars;
CREATE TABLE cars (
car_id int not null AUTO_INCREMENT PRIMARY KEY,
use_state varchar(20) not null,
car_type varchar(20) not null,
-- need to confirm
car_loc_x float(4) not null,
car_loc_y float(4) not null
);

delete from cars;
INSERT INTO cars(use_state, car_type, car_loc_x, car_loc_y) VALUES('idle', 'SUV', 1234.123, 222.2);
INSERT INTO cars(use_state, car_type, car_loc_x, car_loc_y) VALUES('in use', 'audi.a2', 1234.123, 222.2);
SELECT * FROM cars;

drop TABLE if exists admins;
CREATE TABLE admins (
admin_id varchar(9) not null PRIMARY KEY,
admin_pw varchar(45) not null
-- foreign key (a_car_id) references cars(car_id) on update cascade
);

INSERT INTO admins VALUES('MAN101', sha1('testpw'));
INSERT INTO admins VALUES('MAN102', sha1('testpw2'));
select * from admins;

drop TABLE if exists manage;
CREATE TABLE manage (
m_admin_id varchar(9) not null,
m_car_id int not null,
PRIMARY KEY (m_admin_id, m_car_id),
foreign key (m_admin_id) references admins(admin_id) on update cascade,
foreign key (m_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists users;
CREATE TABLE users (
user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_name varchar(20) not null unique,
user_pw varchar(45) not null,
user_email varchar(30) not null,
user_phone varchar(10) not null
);

SET SQL_SAFE_UPDATES = 0;
delete from users;
INSERT INTO users VALUES('','user1', 'juehqhwrwFbsM/O4yA7oag==', 'user1@gmail.com', '6668889999');
INSERT INTO users VALUES('','user2', '93Gow7kd/lywdRya3QH3IepTIgkEXLfCKSo1ob/Kr2M=', 'user2@gmail.com', '6667779999');
-- INSERT INTO users(user_name, user_pw, user_email, user_phone) VALUES ('user3', 'userpw3', 'user3@gmail.com', '6667772222');
SELECT * FROM users;


drop TABLE if exists bookings;
CREATE TABLE bookings (
booking_id int not null AUTO_INCREMENT PRIMARY KEY,
reserve_time TIMESTAMP not null,
start_loc_x float(4) not null,
start_loc_y float(4) not null,
destination_loc_x float(4) not null,
destination_loc_y float(4) not null,
customer_name varchar(20) not null,
b_car_id int not null, 
foreign key (customer_name) references users(user_name) on update cascade,
foreign key (b_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists orders;
CREATE TABLE orders (
order_id int not null AUTO_INCREMENT PRIMARY KEY,
start_time TIMESTAMP not null default "2000-01-01 00:00:00",
pickup_time TIMESTAMP not null default "2000-01-01 00:00:00",
finish_time TIMESTAMP not null default "2000-01-01 00:00:00",
cost float(6) not null default 0,
distance float(6) not null default 0,
customer_name varchar(20) not null,
o_booking_id int not null unique, 
foreign key (customer_name) references users(user_name) on update cascade,
foreign key (o_booking_id) references bookings(booking_id) on update cascade
);

truncate table orders;
