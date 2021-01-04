# 電影訂票系統

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
  - [Framework](#framework)
  - [Package](#package)
- [環境資訊](#環境資訊)
- [環境安裝](#環境安裝)
- [修改資料庫設定檔](#修改資料庫設定檔)
- [執行專案](#執行專案)
  - [Run Back-end](#run-back-end)
  - [Run Front-end](#run-front-end)

## About The Project

本課程為資料庫系統，但是區區理論與課本上的知識是不夠的，俗話說的好只會紙上談兵的軍師不是好軍師，唯有那些親自征戰沙場，於帷幕後為將士出謀劃策的才能撐得上一聲「軍師」，所以，為了避免我們缺乏實踐能力，我們決定製作一個結合資料庫的網站，而網路上常見的購物網站或是售票類型的網站都是背後有著大量的資料所組成的資料庫系統去支持其網站運作，再加上組員閒暇時刻都會去訂票看電影，要理解整個電影訂票網站運作相對容易一些，因此我們的目標是要模擬一個完整的電影售票系統，名稱 為：「哭阿電影售票系統（Cry A Moive Ticket Selling System）」，能讓使用者可以在網上做到訂位、查詢各個電影放映時間等等。

## Built With

### Framework

* [Vue.js](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vue CLI](https://cli.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [BootstrapVue](https://bootstrap-vue.org/)
* [Express](https://expressjs.com/)

### Package

* [aios](https://www.npmjs.com/package/axios)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [Konva](https://konvajs.org/)
* [Lodash](https://lodash.com/)
* [sass-loader](https://www.npmjs.com/package/sass-loader)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [moment](https://momentjs.com/)
* [mysql](https://www.npmjs.com/package/mysql)
* [uid-generator](https://www.npmjs.com/package/uid-generator)


## 環境資訊

* OS：Win10, MacOS catalina
* 瀏覽器：Chrome
* Node.js 版本：6.14.5以上
* Vue.js 版本：2.6.12以上
* MySql 版本：8.0以上

## 環境安裝

1. 從[Node.js](https://nodejs.org/)頁面下載Node.js並安裝，安裝設定都是預設
2. 下載前端[Front-end](https://github.com/fantong11/movie-ticket-frontend)的部分
    ```sh
    git clone https://github.com/fantong11/movie-ticket-frontend.git
    ```
3. 下載前端[Back-end](https://github.com/fantong11/movie-ticket-frontend)的部分
    ```sh
    git clone https://github.com/fantong11/movie-ticket-backend.git
    ```
4. 下載資料庫 MySQL8.0，在localhost資料庫建立`movie` 的database，並執行movie-ticket-backend/movie.sql來把資料都建立
5.  在兩個專案的路徑下執行下列指令來安裝專案所需套件
    ```sh
    npm install
    ```


## 修改資料庫設定檔

在movie-ticket-backend/app/config/db.config.js中，設定成自己資料庫，DB為database名字，範例如下：

```js
module.exports = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "1234",
    DB: "movie",
    PORT: "3306"
};
```
- `HOST`: The hostname of the database you are connecting to. (Default: `localhost`)
- `USER`: The MySQL user to authenticate as.
- `PASSWORD`: The password of that MySQL user.
- `DB`: Name of the database to use for this connection.
- `PORT`: The port number to connect to. (Default: `3306`)

## 執行專案

在兩個專案的路徑下執行下列指令來執行前端與後端

### Run Back-end
```sh
node server
```

### Run Front-end
```sh
npm run serve
```
