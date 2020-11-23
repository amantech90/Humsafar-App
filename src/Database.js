import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = 'Humsafar.db';
const database_version = '1.0';
const database_displayname = 'Humsafar Database Name';
const database_size = 200000;

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;

              db.executeSql('SELECT 1 FROM Memories LIMIT 1')
                .then(() => {
                  //consolelog('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Memories (primaryId TEXT PRIMARY KEY, title, desc, like, day, month,year,imagePath,audioPath)',
                    );
                  })
                    .then(() => {
                      //consolelog('Table created successfully');
                    })
                    .catch(error => {
                      //consolelog(error);
                    });
                });
              db.executeSql('SELECT 1 from Reminders LIMIT 1')
                .then(() => {
                  //consolelog('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Reminders (time,calenderId,eventId)',
                    );
                  })
                    .then(() => {
                      //consolelog('Table created successfully');
                    })
                    .catch(error => {
                      //consolelog(error);
                    });
                });
              db.executeSql('SELECT 1 from ImagesPath LIMIT 1')
                .then(() => {
                  //consolelog('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS ImagesPath (memoriesId , path)',
                    );
                  })
                    .then(() => {
                      //consolelog('Table created successfully');
                    })
                    .catch(error => {
                      //consolelog(error);
                    });
                });
              db.executeSql('SELECT 1 from AudioPath LIMIT 1')
                .then(() => {
                  //consolelog('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS AudioPath (memoriesId , path)',
                    );
                  })
                    .then(() => {
                      //consolelog('Table created successfully');
                    })
                    .catch(error => {
                      //consolelog(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              //consolelog(error);
            });
        })
        .catch(error => {
          //consolelog('echoTest failed - plugin not functional');
        });
    });
  }
  closeDatabase(db) {
    if (db) {
      db.close()
        .then(status => {
          //consolelog('Database CLOSED');
        })
        .catch(error => {
          //consolelog(error);
        });
    } else {
      //consolelog('Database was not OPENED');
    }
  }
  listMemories() {
    return new Promise(resolve => {
      const memories = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Memories', []).then(
              ([tx, results]) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);

                  const {
                    primaryId,
                    title,
                    desc,
                    like,
                    day,
                    month,
                    year,
                    imagePath,
                    audioPath,
                  } = row;
                  memories.push({
                    primaryId,
                    title,
                    desc,
                    like,
                    day,
                    month,
                    year,
                    imagePath,
                    audioPath,
                  });
                }

                resolve(memories);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  getMemoriesById(data) {
    console.log(data, 'from dat');
    return new Promise(resolve => {
      const memories = [];
      // this.initDB()
      //   .then(db => {
      //     db.transaction(tx => {
      //       tx.executeSql('SELECT * FROM Memories WHERE primaryId = ?', [
      //         data.primaryId,
      //       ]).then(([tx, results]) => {
      //         var len = results.rows.length;
      //         for (let i = 0; i < len; i++) {
      //           let row = results.rows.item(i);

      //           const {
      //             primaryId,
      //             title,
      //             desc,
      //             like,
      //             day,
      //             month,
      //             year,
      //             imagePath,
      //             audioPath,
      //           } = row;
      //           memories.push({
      //             primaryId,
      //             title,
      //             desc,
      //             like,
      //             day,
      //             month,
      //             year,
      //             imagePath,
      //             audioPath,
      //           });
      //         }

      //         resolve(memories);
      //       });
      //     })
      //       .then(result => {
      //         this.closeDatabase(db);
      //       })
      //       .catch(err => {
      //         //consolelog(err);
      //       });
      //   })
      //   .catch(err => {
      //     //consolelog(err);
      //   });
    });
  }
  getPhotos(id) {
    let images = [];
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM ImagesPath WHERE memoriesId = ? ', [
              id,
            ]).then(([tx, results]) => {
              //consolelog(results);
              if (results.rows.length > 0) {
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);

                  const {path, memoriesId} = row;
                  images.push({
                    path,
                    memoriesId,
                  });
                }

                resolve(images);
              } else {
                resolve(images);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  addMemories(data) {
    for (let i = 0; i < data.imagesPaths.length; i++) {
      this.addImage(data.imagesPaths[i].memoriesId, data.imagesPaths[i].path);
    }
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO Memories VALUES (?, ?, ?, ?, ?,?,?,?,?)',
              [
                data.primaryId,
                data.title,
                data.desc,
                data.like,
                data.day,
                data.month,
                data.year,
                data.imagePath,
                data.audioPath,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  updateMemories(id, data) {
    for (let i = 0; i < data.imagesPaths.length; i++) {
      this.addImage(data.imagesPaths[i].memoriesId, data.imagesPaths[i].path);
    }
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Memories SET title = ?, desc = ?, like = ?,day=?,month=?,year=?,imagePath=?,audioPath=? WHERE primaryId = ?',
              [
                data.title,
                data.desc,
                data.like,
                data.day,
                data.month,
                data.year,
                data.imagePath,
                data.audioPath,
                id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  deleteMemories(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Memories WHERE primaryId = ?', [
              id,
            ]).then(([tx, results]) => {
              //consolelog(results);
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  deleteImage(data) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'DELETE FROM ImagesPath WHERE memoriesId = ? and path=?',
              [data.primaryId, data.path],
            ).then(([tx, results]) => {
              //consolelog(results);
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  getMemoriesByMonthName(month) {
    return new Promise(resolve => {
      const memories = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Memories WHERE month = ?', [
              month,
            ]).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);

                const {
                  primaryId,
                  title,
                  desc,
                  like,
                  day,
                  month,
                  year,
                  imagePath,
                  audioPath,
                } = row;
                memories.push({
                  primaryId,
                  title,
                  desc,
                  like,
                  day,
                  month,
                  year,
                  imagePath,
                  audioPath,
                });
              }

              resolve(memories);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              resolve([]);
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  toggleLikeMemories(id, data) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('UPDATE Memories SET  like = ? WHERE primaryId = ?', [
              data.like,
              id,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  addImage(id, path) {
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO ImagesPath (memoriesId , path) VALUES (?, ?)',
            [id, path],
          ).then(([tx, results]) => {
            return true;
          });
        })
          .then(result => {
            // this.closeDatabase(db);
            return true;
          })
          .catch(err => {
            //consolelog(err);
          });
      })
      .catch(err => {
        //consolelog(err);
      });
  }
  getReminder() {
    return new Promise(resolve => {
      const reminders = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Reminders', []).then(
              ([tx, results]) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);

                  const {calenderId, eventId, time} = row;
                  reminders.push({
                    calenderId,
                    eventId,
                    time,
                  });
                }

                resolve(reminders[0]);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
  uploadImage(data) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Reminders VALUES (?, ?, ?)', [
              data.time,
              data.calenderId,
              data.eventId,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              //consolelog(err);
            });
        })
        .catch(err => {
          //consolelog(err);
        });
    });
  }
}
