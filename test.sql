DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `status` tinyint(4) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL COMMENT '电话',
  `order_sn` varchar(255) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `hotel_creater` int(11) DEFAULT NULL,
  `info` text,
  `type` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `hotel_name` varchar(255) DEFAULT NULL,
  `id_card` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `spot`;
CREATE TABLE `spot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '景点名称',
  `price` decimal(10,2) DEFAULT NULL COMMENT '景点价格',
  `introduction` text COMMENT '景点介绍',
  `number` int(11) DEFAULT NULL COMMENT '门票数量',
  `uid` int(11) DEFAULT NULL COMMENT '创建人',
  `image` varchar(255) DEFAULT NULL COMMENT '封面图',
  `address` varchar(255) DEFAULT NULL,
  `summary` text COMMENT '摘要',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;