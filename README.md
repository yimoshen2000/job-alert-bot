# job-alert-bot

Job alert bot that pulls most recent job postings (posted within last 24 hours) from company careers sites.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

This project is a job alert bot that scrapes the most recent job postings from company careers sites. It pulls data from various websites and sends notifications when new job postings are available.

## Features

- Scrapes job postings from company careers sites
- Filters postings based on specified criteria (e.g., job title, company name)
- Sends notifications via email or Slack

## Installation

1. Clone the repository: 
```
git clone https://github.com/yimoshen2000/job-alert-bot.git
```

2. Create a virtual environment:
```
python -m venv env
```

3. Activate the virtual environment:
- For Windows:
  ```
  env\Scripts\activate
  ```
- For macOS/Linux:
  ```
  source env/bin/activate
  ```

4. Install the required dependencies:
```
pip install -r requirements.txt
```
## Usage

1. Configure the bot by modifying the `config.ini` file with your email or Slack API credentials.

2. Run the bot:
 ```
 python main.py
 ```
 
3. The bot will start scraping job postings and sending notifications when new postings are available.
