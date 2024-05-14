#!/usr/bin/env python3
"""
Flask app with Babel, locale selector, user login emulation, and template messages
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, _, gettext


class Config:
    """
    Config class for Babel
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """
    Get user by ID
    """
    user_id = request.args.get('login_as')
    if user_id:
        user = users.get(int(user_id))
        return user
    return None


@app.before_request
def before_request():
    """
    Function to be executed before all requests
    """
    g.user = get_user()


@babel.localeselector
def get_locale():
    """
    Determine the best match for supported languages or use the URL parameter
    """
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    Route for the index page
    """
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
