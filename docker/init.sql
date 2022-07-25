drop table if exists lilshop.order_product;
drop table if exists lilshop.order;
drop table if exists lilshop.coupon;
drop table if exists lilshop.product;
drop schema if exists lilshop;

create schema lilshop;

create table lilshop.product (
	id_product serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into lilshop.product (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 30, 10, 3);
insert into lilshop.product (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 20);
insert into lilshop.product (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);

create table lilshop.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into lilshop.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-10-10T10:00:00');
insert into lilshop.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table lilshop.order (
	id_order serial,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table lilshop.order_product (
	id_order integer references lilshop.order (id_order),
	id_product integer references lilshop.product (id_product),
	price numeric,
	quantity integer,
	primary key (id_order, id_product)
);