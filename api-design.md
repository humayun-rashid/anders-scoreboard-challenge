
GET
/ => Get all players data ( non sorted)
/h2l => Get all player data ( high to low)
/l2h => Get all player data (low to high)
/date => get all player data (sorted by time and date)

POST and UPDATE
/update => Player name , Score
if player is not available , player will be created and score will be stored.
If player is available, score will be updated.

DELETE
/delete  => Player will be deleted
