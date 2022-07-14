const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var port = process.env.PORT || 3001;

const db = require('./DatabaseRoute');

const options = {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_USER,
    host: process.env.DB_HOST,
    createDatabaseTable: true
}

const pool = mysql.createPool(options);

const sessionStore = new mysqlStore(options, pool);

app.use(cors({
	origin: [process.env.URL],
	methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
	credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	name: process.env.SESS_NAME,
	secret: process.env.SESS_SECRET,
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		httpOnly: true,
		secure: process.env.NODE_ENV == 'production' ? true : false,
		sameSite: 'none'
	}
}));

app.post('/api/signup', (req, res) => {

	let person_id = req.body.person_id;
	let username = req.body.username;
	let password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		let sqlInsert = "insert into users (person_id, username, password) values (?, ?, ?)"
		db.query(sqlInsert, [person_id, username, hash], (err, result) => {
			if (err) {
				console.log(err);
			}
			res.status(200).json({});
		})
	})
});

app.post('/api/login', (request, response) => {
	let person_id = request.body.person_id;
	let password = request.body.password;
	if (person_id && password) {
		db.query('SELECT * FROM users WHERE person_id = ?', person_id, function (error, results) {
			if (error) {
				response.send({ error: error });
			}
			if (results.length > 0) {
				bcrypt.compare(password, results[0].password, (err, res) => {
					if (res) {
						request.session.user = results;
						response.send(results);
					}
					else {
						response.send({ message: " Wrong ID or password." });
					}
				})
			}
			else {
				response.send({ message: "User doesn't exist." });
			}
		});
	}
});

app.get('/api/login', function (request, response) {
	let sqlSelect = "select * from users where person_id = ?";
	if(request.session.user){
		db.query(sqlSelect, request.session.user[0].person_id, (error, results) => {
			if(results.length > 0){
				if(request.session.user[0].password === results[0].password){
					response.send(request.session.user);
				}
				else{
					response.send({message: "Your account details were modified. Please login using new credentials."});
				}
			}
			else{
				response.send({message: "This account was deleted. So, the request was not completed. Press OK to login/register your account."});
			}
		})
	}
	else{
		response.send({error: "Please login to your account."});
	}
});

app.put('/api/forgot', (request, res) => {
	let person_id = request.body.person_id;
	let newpassword = request.body.newpassword;
	bcrypt.hash(newpassword, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		let sqlSelect = "select * from users where person_id = ?";
		let sqlUpdate = "update users set password = ? where person_id = ?";
		db.query(sqlSelect, person_id, (error, ress) => {
			if (ress.length > 0) {
				db.query(sqlUpdate, [hash, person_id], (err, result) => {
					if (err) {
						console.log(err);
					}
					else {
						res.status(200).json({});
					}
				})
			}
			else {
				res.send({ message: "ID doesn't exist." });
			}
		})
	})
});

app.get('/api/logout', (request, res) => {
	if (request.session.user) {
		request.session.destroy();
		res.send({ loggedIn: "false" });
		res.end();
	}
});

app.post('/api/insert', (request, res) => {

	if (request.session.user) {
		const amount = request.body.amount;
		const task = request.body.task;
		const type = request.body.type;
		const date = request.body.date;
		const sqlInsert = "insert into money_additions (person_id, trans_id, Amount, Task, Type, added_date) values (?, uuid(), ?, ?, ?, ?)"
		db.query(sqlInsert, [request.session.user[0].person_id, amount, task, type, date], (err, result) => {
			if (err) {
				console.log(err);
			}
			res.status(200).json({});
		})
	}
});

app.delete('/api/delete/:trans_id', (request, res) => {
	if (request.session.user) {
		const id = request.params.trans_id;
		const sqlDelete = "delete from money_additions where trans_id = ? and person_id = ?";
		db.query(sqlDelete, [id, request.session.user[0].person_id], (err, result) => {
			if (err)
				console.log(err);
				res.status(200).json({});
		})
	}
});

app.put('/api/update', (request, res) => {
	if (request.session.user) {
		const task_name = request.body.task;
		const new_amount = request.body.amount;
		const id = request.body.trans_id;
		const sqlUpdate = "update money_additions set Task = ?, Amount = ? where trans_id = ? and person_id = ?";

		db.query(sqlUpdate, [task_name, new_amount, id, request.session.user[0].person_id], (err, result) => {
			if (err)
				console.log(err);
			res.status(200).json({});
		})
	}
});

app.get('/api/getmonthtrans', (request, res) => {
	if (request.session.user) {
		const sqlSelect = "select * from money_additions where person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
		db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.get('/api/getmonthincome', (request, res) => {
	if (request.session.user) {
		const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Income' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
		db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.get('/api/getmonthexpense', (request, res) => {
	if (request.session.user) {
		const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Expense' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
		db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.get('/api/getincome', (request, res) => {
	if (request.session.user) {
		const sqlSelect = "select * from money_additions where Type = 'Income' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
		db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});
app.get('/api/getexpense', (request, res) => {
	if (request.session.user) {
		const sqlSelect = "select * from money_additions where Type = 'Expense' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
		db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});


app.get('/api/get', (request, res) => {
	if (request.session.user) {
		const sqlSelect = "select * from money_additions where person_id = ?";
		db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.get('/api/gettotalincome', (request, res) => {
	if (request.session.user) {
		const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Income' and person_id = ?";
		db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.get('/api/gettotalexpense', (request, res) => {
	if (request.session.user) {
		const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Expense' and person_id = ?";
		db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
			res.send(result);
		})
	}
});

app.post('/api/filter', (request, res) => {
	if (request.session.user) {
		let month = request.body.month;
		let year = request.body.year;
		const sqlFilter = "select * from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ?";
		db.query(sqlFilter, [request.session.user[0].person_id, month, year], (err, result) => {
			res.send(result);
		})
	}
});

app.post('/api/filterincome', (request, res) => {
	if (request.session.user) {
		let month = request.body.month;
		let year = request.body.year;
		const sqlIncome = "select sum(Amount) as amTotal from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ? and Type = 'Income'";
		db.query(sqlIncome, [request.session.user[0].person_id, month, year], (err, result) => {
			res.send(result);
		})
	}
});

app.post('/api/filterexpense', (request, res) => {
	if (request.session.user) {
		let month = request.body.month;
		let year = request.body.year;
		const sqlIncome = "select sum(Amount) as amTotal from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ? and Type = 'Expense'";
		db.query(sqlIncome, [request.session.user[0].person_id, month, year], (err, result) => {
			res.send(result);
		})
	}
	else {
		res.send({ message: "Please login to continue." });
	}
});

app.listen(port, () => {
	console.log('running on port ' + port);
});