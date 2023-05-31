from flask import Blueprint, request, render_template, jsonify

login_bp = Blueprint('login_bp', __name__)

users = {'capyadmin': 'capyadmin'}

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username in users and users[username] == password:
            return render_template('index.html')
        else:
            return render_template('login.html'), 401
    return render_template('login.html')

@login_bp.route('/signup', methods=['GET','POST'])
def add_user():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username == '' and not password == '':
            users[username] = password
            return "Success", 200
        else:
            return "Failed", 400
    
    return render_template('signup.html')

@login_bp.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)