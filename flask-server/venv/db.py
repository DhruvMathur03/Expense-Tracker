import sqlite3 as sql
import sys

class DB:
    cur = None
    con = None

    def __init__(self):
        try:
            self.con = sql.connect("Expenses")
            self.cur = self.con.cursor()
        except sql.Error:
            print("Error")
            sys.exit
    
    def __del__(self):
        if self.con:
            print("Closing connection to DB")
            self.con.close()
    
    def display_all(self):
        statement = "select * from Expenses"
        data = self.cur.execute(statement)
        return data
    
    def insert(self, values):
        s = ","
        col_name = s.join(values.keys())
        mapped_vals = map(lambda x: f'"{x}"', values.values())
        vals = s.join(list(mapped_vals))
        statement = f'insert into Expenses({col_name} values({vals})'
        self.cur.execute(statement)
        self.con.commit()

    


