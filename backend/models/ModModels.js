const connectdb = require('../connectdb.js');
const mysql = require('mysql');

class ModModels {
    constructor() {
    }

    getAllPosts(){
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };
    deletePost(sqlInserts){
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post supprimé !'});
            })
        })
    };
    getAllComments(sqlInserts){
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    };
    deleteComment(sqlInserts){
        let sql = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Commentaire supprimé !'});
            })
        })
    };
    getAllUsers(){
        let sql = "SELECT users.id, users.lastName, users.firstName, users.email FROM users ORDER BY users.lastName ASC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };
    deleteUser(sqlInserts){
        let sql = 'DELETE FROM users WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Utilisateur supprimé !'});
            })
        })
    };

}

module.exports = ModModels;