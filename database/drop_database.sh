echo "Droping database ipark_db_dev from mongo"
#Drop mongo db ipark_db_dev
mongo ipark_db_dev --eval "db.dropDatabase()"
