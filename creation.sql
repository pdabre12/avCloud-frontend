-- drop database if exists avCloud_db;
-- create database avCloud_db;
use avCloud_db;

drop TABLE if exists cars;
CREATE TABLE cars (
car_id varchar(9) not null PRIMARY KEY,
use_state varchar(20) not null,
car_type varchar(20) not null,
-- need to confirm
car_loc_x float(4) not null,
car_loc_y float(4) not null
);

drop TABLE if exists admins;
CREATE TABLE admins (
admin_id varchar(9) not null PRIMARY KEY,
admin_pw varchar(40) not null
-- foreign key (a_car_id) references cars(car_id) on update cascade
);

INSERT INTO admins VALUES('MAN101', sha1('testpw'));
INSERT INTO admins VALUES('MAN102', sha1('testpw2'));
select * from admins;

drop TABLE if exists manage;
CREATE TABLE manage (
m_admin_id varchar(9) not null,
m_car_id varchar(9) not null,
PRIMARY KEY (m_admin_id, m_car_id),
foreign key (m_admin_id) references admins(admin_id) on update cascade,
foreign key (m_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists users;
CREATE TABLE users (
user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_name varchar(20) not null unique,
user_pw varchar(40) not null,
user_email varchar(30) not null,
user_phone varchar(10) not null
);

SET SQL_SAFE_UPDATES = 0;
delete from users;
INSERT INTO users VALUES('','user1', sha1('userpw1'), 'user1@gmail.com', '6668889999');
INSERT INTO users VALUES('','user2', sha1('userpw2'), 'user2@gmail.com', '6667779999');
INSERT INTO users(user_name, user_pw, user_email, user_phone) VALUES ('user3', 'userpw3', 'user3@gmail.com', '6667772222');
SELECT * FROM users;


drop TABLE if exists bookings;
CREATE TABLE bookings (
booking_id varchar(9) not null PRIMARY KEY,
start_loc_x float(4) not null,
start_loc_y float(4) not null,
destination_loc_x float(4) not null,
destination_loc_y float(4) not null,
customer_id int not null,
b_car_id varchar(9) not null, 
foreign key (customer_id) references users(user_id) on update cascade,
foreign key (b_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists orders;
CREATE TABLE orders (
order_id varchar(9) not null PRIMARY KEY,
start_time varchar(14) not null,
pickup_time varchar(14) not null,
finish_time varchar(14) not null,
cost float(6) not null,
distance float(6) not null,
o_booking_id varchar(9) not null, 
foreign key (o_booking_id) references bookings(booking_id) on update cascade
);
