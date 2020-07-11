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
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Memories (primaryId INTEGER PRIMARY KEY AUTOINCREMENT, title, desc, like, day, month,year,imagePath,audioPath)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              db.executeSql('SELECT 1 from Reminders LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Reminders (time,calenderId,eventId)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              db.executeSql('SELECT 1 from ImagesPath LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS ImagesPath (memoriesId , path)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              db.executeSql('SELECT 1 from AudioPath LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS AudioPath (memoriesId , path)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }
  closeDatabase(db) {
    if (db) {
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Database was not OPENED');
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  memoriesById(id) {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Memories WHERE primaryId = ?', [
              id,
            ]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
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
  addMemories(data) {
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  updateMemories(id, data) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Memories SET primaryId = ?, title = ?, desc = ?, like = ?,day=?,month=?,year=?,imagePath=?,audioPath? WHERE primaryId = ?',
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
              console.log(results);
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  addImage(data) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Reminders VALUES (?, ?)', [
              data.id,
              data.path,
            ]).then(([tx, results]) => {
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
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
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
