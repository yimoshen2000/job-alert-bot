from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job_alerts.db'
db = SQLAlchemy(app)

class JobAlert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    company = db.Column(db.String(100))
    url = db.Column(db.String(200))
    duration = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'url': self.url,
            'duration': self.duration
        }

@app.route('/job_alerts', methods=['GET'])
def get_job_alerts():
    job_alerts = JobAlert.query.filter(JobAlert.duration > 0).all()
    return jsonify([alert.to_dict() for alert in job_alerts])

@app.route('/job_alerts', methods=['POST'])
def create_job_alert():
    data = request.get_json()
    title = data.get('title')
    company = data.get('company')
    url = data.get('url')
    duration = data.get('duration')

    job_alert = JobAlert(title=title, company=company, url=url, duration=duration)
    db.session.add(job_alert)
    db.session.commit()

    return jsonify(job_alert.to_dict()), 201

@app.route('/job_alerts/<int:alert_id>', methods=['DELETE'])
def delete_job_alert(alert_id):
    job_alert = JobAlert.query.get(alert_id)
    if job_alert:
        db.session.delete(job_alert)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'error': 'Job alert not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)