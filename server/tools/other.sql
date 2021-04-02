drop table if exists `opinions`;

create table `opinions`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`src` text default null,
	`wechat` varchar(100) default null,
	`opinion` text not null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;

drop table if exists `records`;

create table `records`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`start_date` date not null,
	`start_time` time not null,
	`end_date` date not null,
	`end_time` time not null,
	`note` varchar(100) default null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;

drop table if exists `reservations`;

create table `reservations`(
	`id` int(11) not null auto_increment,
	`location` text not null,
	`topic` text not null,
	`content` text not null,
	`start_date` date not null,
	`start_time` time not null,
	`end_time` time not null,
	`participant` varchar(100) not null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;

drop table if exists `reservations`;

create table `groups`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`group_id` varchar(100) not null,
	`leader` int(4) default null,
	primary key(`id`)
)default charset=`utf8mb4`;