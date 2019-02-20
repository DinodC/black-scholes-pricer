from nose.tools import *
from app import app


app.config['TESTING'] = True
web = app.test_client()

def test_bonus():
    rv = web.get('/Bonus/', follow_redirects=True)
    assert_equal(rv.status_code, 404)

def test_index():
    rv = web.get('/', follow_redirects=True)
    assert_equal(rv.status_code, 200)
    assert_in(b'Contract Parameters', rv.data)
    assert_in(b'Price and Greeks', rv.data)

def test_about():
    rv = web.get('/About/', follow_redirects=True)
    assert_equal(rv.status_code, 200)
    assert_in(b'The Black-Scholes Model', rv.data)
    assert_in(b'The Black-Scholes Pricing Formulae', rv.data)
    assert_in(b'The Black-Scholes Greeks', rv.data)

def test_contact():
    rv = web.get('/Contact/', follow_redirects=True)
    assert_equal(rv.status_code, 200)
    assert_in(b'Contact', rv.data)
