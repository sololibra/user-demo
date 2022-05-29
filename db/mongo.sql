/*
 Navicat Premium Data Transfer

 Source Server         : color-mongo
 Source Server Type    : MongoDB
 Source Server Version : 40113
 Source Host           : 127.0.0.1:27017
 Source Schema         : color

 Target Server Type    : MongoDB
 Target Server Version : 40113
 File Encoding         : 65001

 Date: 29/05/2022 20:53:19
*/


// ----------------------------
// Collection structure for counters
// ----------------------------
db.getCollection("counters").drop();
db.createCollection("counters");

// ----------------------------
// Documents of counters
// ----------------------------
db.getCollection("counters").insert([ {
    _id: ObjectId("62932ec6dd86417c066ab265"),
    id: "menuId",
    "sequence_value": NumberInt("6"),
    __v: NumberInt("0")
} ]);
db.getCollection("counters").insert([ {
    _id: ObjectId("62932faddd86417c066ab2b1"),
    id: "userId",
    "sequence_value": NumberInt("4"),
    __v: NumberInt("0")
} ]);
db.getCollection("counters").insert([ {
    _id: ObjectId("62932fd0dd86417c066ab2bf"),
    id: "roleid",
    "sequence_value": NumberInt("0"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for menus
// ----------------------------
db.getCollection("menus").drop();
db.createCollection("menus");

// ----------------------------
// Documents of menus
// ----------------------------
db.getCollection("menus").insert([ {
    _id: ObjectId("62932ec6dd86417c066ab268"),
    id: NumberInt("2"),
    menuType: NumberInt("1"),
    name: "User Management",
    url: "/sys/user",
    icon: "el-icon-user",
    parentId: null,
    orderNum: NumberInt("1"),
    createTime: "1653812716340",
    updateTime: "1653812716340",
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62932f53dd86417c066ab28e"),
    id: NumberInt("3"),
    menuType: NumberInt("1"),
    name: "Role Management",
    url: "/sys/role",
    icon: "el-icon-s-custom",
    parentId: null,
    orderNum: NumberInt("2"),
    createTime: "1653812716340",
    updateTime: "1653812716340",
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62933b0ac803d734d227cafd"),
    id: NumberInt("0"),
    menuType: NumberInt("1"),
    name: "Menu management",
    url: "/sys/menu",
    icon: "el-icon-menu",
    parentId: null,
    orderNum: NumberInt("999"),
    createTime: "1653815516411",
    updateTime: "1653815516411",
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("6293448ec803d734d227cbcf"),
    id: NumberInt("4"),
    menuType: NumberInt("2"),
    name: "User Edit",
    url: "user-edit",
    icon: "",
    parentId: null,
    orderNum: null,
    createTime: "1653815516411",
    updateTime: "1653815516411",
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("629344a0c803d734d227cbd6"),
    id: NumberInt("5"),
    menuType: NumberInt("2"),
    name: "User Del",
    url: "user-del",
    icon: "",
    parentId: null,
    orderNum: null,
    createTime: "1653815516411",
    updateTime: "1653815516411",
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("629344b9c803d734d227cbdd"),
    id: NumberInt("6"),
    menuType: NumberInt("2"),
    name: "User Add",
    url: "user-add",
    icon: "",
    parentId: null,
    orderNum: null,
    createTime: "1653815516411",
    updateTime: "1653815516411",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for roles
// ----------------------------
db.getCollection("roles").drop();
db.createCollection("roles");

// ----------------------------
// Documents of roles
// ----------------------------
db.getCollection("roles").insert([ {
    _id: ObjectId("62932fd0dd86417c066ab2c2"),
    roleName: "test",
    permSign: [
        null
    ],
    permId: [
        "6293448ec803d734d227cbcf",
        "62932ec6dd86417c066ab268"
    ],
    checkedKeys: [
        "6293448ec803d734d227cbcf",
        "62932ec6dd86417c066ab268"
    ],
    updateTime: ISODate("2022-05-29T08:25:16.286Z"),
    createTime: ISODate("2022-05-29T08:25:16.286Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("62932faddd86417c066ab2b4"),
    userId: NumberInt("2"),
    username: "color",
    password: "123123",
    realname: "GiaGeeYuan",
    userEmail: "colorjjy@foxmail.com",
    mobile: "18538303820",
    sex: NumberInt("0"),
    roleNames: [
        "62932fd0dd86417c066ab2c2"
    ],
    createTime: "1653812716271",
    updateTime: "1653812716271",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("62935855f02d2d2f51cfb7ad"),
    userId: NumberInt("4"),
    username: "admin",
    password: "123123",
    userEmail: "colorjjy@126.com",
    mobile: "18538303820",
    sex: NumberInt("0"),
    roleNames: [ ],
    createTime: "1653823501069",
    updateTime: "1653823501069",
    __v: NumberInt("0")
} ]);
