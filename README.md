# Black-Scholes Pricer
The web application provides a calculator of call and put values, and sensitivities (delta, gamma, vega, theta and rho) under the Black-Scholes model. Also, the model is generalised - the user can choose the underlying asset: stock, future, or currency. Check it out on http://black-scholes.info.

## Getting Started
To get started, clone the repository https://github.com/DinodC/black_scholes_pricer.

### Prerequisites
You will need to install: Python3, Flask, gunicorn and nose.

### Installing
Install virtual environment
```
$ cd black_scholes_pricer
$ virtualenv -p python3 .env
```
Activate the virtual environment
```
$ source .env/bin/activate
```
Install Flask, Gunicorn, and nose
```
(.env) $ pip install -r requirements.txt
```

## Running the tests
Run tests
```
(.env) nosetests -v
```

## Deployment
Serve using Flask, and then with Gunicorn

### Serving with Flask
Serve with Flask
```
(.env) $ python app
```
Check on http://127.0.0.1:5000/

### Serving with Gunicorn
Serve with Gunicorn
```
(.env) $ gunicorn -b 127.0.0.1:5000 -w 2 app:app
```
Check on http://127.0.0.1:5000/


## Built With
* [Flask](http://flask.pocoo.org) - web framework used
* [Gunicorn](https://gunicorn.org) - application server used
* [Nginx](https://www.nginx.com) - front end reverse proxy used

## Versioning
For the versions available see the [tags on this repository](https://github.com/DinodC/black_scholes_pricer).

## Author
* **Dino de Castro** - *Initial work* - [DinodC] (https://github.com/DinodC)

## License
This project is licensed under the author.

## Acknowledgments
A big thank you to the fam - dad, mom, Bok, Anton, Brye and Livia.
