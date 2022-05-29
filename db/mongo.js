db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932ec6dd86417c066ab268"),

    createTime: "1653812716340",

    icon: "el-icon-user",

    id: NumberInt("2"),

    menuType: NumberInt("1"),

    name: "User Management",

    orderNum: NumberInt("1"),

    parentId: null,

    updateTime: "1653812716340",

    url: "/sys/user"

} );
db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932f53dd86417c066ab28e"),

    createTime: "1653812716340",

    icon: "el-icon-s-custom",

    id: NumberInt("3"),

    menuType: NumberInt("1"),

    name: "Role Management",

    orderNum: NumberInt("2"),

    parentId: null,

    updateTime: "1653812716340",

    url: "/sys/role"

} );
db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62933b0ac803d734d227cafd"),

    createTime: "1653815516411",

    icon: "el-icon-menu",

    id: NumberInt("0"),

    menuType: NumberInt("1"),

    name: "Menu management",

    orderNum: NumberInt("999"),

    parentId: null,

    updateTime: "1653815516411",

    url: "/sys/menu"

} );
db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("6293448ec803d734d227cbcf"),

    createTime: "1653815516411",

    icon: "",

    id: NumberInt("4"),

    menuType: NumberInt("2"),

    name: "User Edit",

    orderNum: null,

    parentId: null,

    updateTime: "1653815516411",

    url: "user-edit"

} );
db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("629344a0c803d734d227cbd6"),

    createTime: "1653815516411",

    icon: "",

    id: NumberInt("5"),

    menuType: NumberInt("2"),

    name: "User Del",

    orderNum: null,

    parentId: null,

    updateTime: "1653815516411",

    url: "user-del"

} );
db.getCollection("menus").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("629344b9c803d734d227cbdd"),

    createTime: "1653815516411",

    icon: "",

    id: NumberInt("6"),

    menuType: NumberInt("2"),

    name: "User Add",

    orderNum: null,

    parentId: null,

    updateTime: "1653815516411",

    url: "user-add"

} );

db.getCollection("roles").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932fd0dd86417c066ab2c2"),

    checkedKeys: [

        "6293448ec803d734d227cbcf",

        "62932ec6dd86417c066ab268"

    ],

    createTime: ISODate("2022-05-29T08:25:16.286Z"),

    permId: [

        "6293448ec803d734d227cbcf",

        "62932ec6dd86417c066ab268"

    ],

    permSign: [

        null

    ],

    roleName: "test",

    updateTime: ISODate("2022-05-29T08:25:16.286Z")

} );

db.getCollection("counters").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932ec6dd86417c066ab265"),

    id: "menuId",

    "sequence_value": NumberInt("6")

} );
db.getCollection("counters").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932faddd86417c066ab2b1"),

    id: "userId",

    "sequence_value": NumberInt("4")

} );
db.getCollection("counters").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932fd0dd86417c066ab2bf"),

    id: "roleid",

    "sequence_value": NumberInt("0")

} );

db.getCollection("users").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62932faddd86417c066ab2b4"),

    createTime: "1653812716271",

    mobile: "18538303820",

    password: "123123",

    realname: "GiaGeeYuan",

    roleNames: [

        "62932fd0dd86417c066ab2c2"

    ],

    sex: NumberInt("0"),

    updateTime: "1653812716271",

    userEmail: "colorjjy@foxmail.com",

    userId: NumberInt("2"),

    username: "color"

} );
db.getCollection("users").insert( {

    __v: NumberInt("0"),

    _id: ObjectId("62935855f02d2d2f51cfb7ad"),

    createTime: "1653823501069",

    mobile: "18538303820",

    password: "123123",

    realname: null,

    roleNames: [ ],

    sex: NumberInt("0"),

    updateTime: "1653823501069",

    userEmail: "colorjjy@126.com",

    userId: NumberInt("4"),

    username: "admin"

} );

