# Expense-Tracker-Application
Thank you for visiting this MERN Stack Application.

In order to run the above files on your system(in development mode), 
1. Please replace the part: https://finer.netlify.app with http://localhost:3000 in index.js of server folder.
2. Replace the part: https://expense-tracker-backend-4gsv.onrender.com with http://localhost:3001 in all the files of client/src folder.
   Please note that only the above part of the links must be replaced by the given link. The rest of the link will remain as it is.(i.e. /api/...  part will remain as it is appended after the newly replaced link).
3. Replace the lines: process.env.--- (except for process.env.PORT) in index.js of server folder with the values you are using for those fields.
4. There are 2 mysql database schemas used in this project namely: users & money_additions.
   - money_additions columns: person_id, trans_id, Task, Amount, Type, added_date
   - users columns: person_id, username, password
Please create a mysql database with the above two schemas in order to connect the application.
5. After performing the above four steps, run the command: npm install (on cmd terminal) in both client and server folders thereby installing all the packages used in the project.
6. - Visit the server folder using the cmd terminal and type: npm run devStart to run the server.
   - Now visit the client folder (keeping the server side running) on a seperate cmd terminal and type: npm start to run the application.

Note: Now you are running the application in development environment.
