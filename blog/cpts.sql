/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : 127.0.0.1:3306
 Source Schema         : cpts

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 26/07/2019 12:07:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_table
-- ----------------------------
DROP TABLE IF EXISTS `article_table`;
CREATE TABLE `article_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `catalog_ID` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `author` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `view` int(11) NOT NULL,
  `comment` int(11) NOT NULL,
  `summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `list_img_src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banner_img_src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_table
-- ----------------------------
INSERT INTO `article_table` VALUES (1, '1234', 1, 1564099200, 'bamboo', 0, 0, 'grgdf', 'Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。\r\n\r\n语法节\r\nObject.defineProperty(obj, prop, descriptor)\r\n参数节\r\nobj\r\n要在其上定义属性的对象。\r\nprop\r\n要定义或修改的属性的名称。\r\ndescriptor\r\n将被定义或修改的属性描述符。\r\n返回值节\r\n    被传递给函数的对象。', 'upload_8a91bb08ebd264abc65c80c9f141cdf9', 'upload_5612112a133fcf345a10324b452fe061');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `href` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `serial` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES (9, '2', 'upload_9796378c37c20f62dc5c1aef9d228af3', 'https://baidu.com/', 2);
INSERT INTO `banner_table` VALUES (8, '1', 'upload_ad552b8da1346c3afc15ce3ec383103f', 'http://bing.cn/', 1);
INSERT INTO `banner_table` VALUES (10, '3', 'upload_b8b225e015e44cf5aa5b584b6c5eba8a', 'http://bing.cn/', 3);

-- ----------------------------
-- Table structure for catalog_table
-- ----------------------------
DROP TABLE IF EXISTS `catalog_table`;
CREATE TABLE `catalog_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalog_table
-- ----------------------------
INSERT INTO `catalog_table` VALUES (1, 'node');
INSERT INTO `catalog_table` VALUES (2, 'js');

-- ----------------------------
-- Table structure for comment_table
-- ----------------------------
DROP TABLE IF EXISTS `comment_table`;
CREATE TABLE `comment_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `article_ID` int(11) NOT NULL,
  `nickname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
