# Python AdminUI

[Documentation](https://python-adminui.readthedocs.io/en/latest/index.html)
[中文文档](https://python-adminui.readthedocs.io/zh_CN/latest/index.html)

Write professional web interface with Python.

If you need a simple web interface and you don't want to mess around with
HTML, CSS, React, Angular, Webpack or other fancy Javascript frontend stuff, 
this project is for you. Now you can write web pages, forms, charts and dashboards with only Python.

This library is good for: data projects, tools and scripts, small IT systems and management systems,
Hacker or Hackathon projects. Basically if you need an interface for your system and you don't 
care much about customizing the style or performance for large traffic, consider this package.

This project is based on Flask and Ant Design Pro.

![Screen Shot](./screenshot.png)

## Features
- No HTML, CSS, JS needed
- Database agnostic: feed content at your own, no matter it's MySql, Sqlite, Excel tables, Firebase or some IoT hardware
- JWT based authentication/login system with a neat login page
- Forms and detail pages 
- Line and Bar Chart
- Create decent looking menus
- Data tables with pagination
- Adaptive to small screens and mobile devices

# Installation and quick start

install the package with pip: 

```
pip install adminui
```

The basic "form page" example:

```
# example_form.py
from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, content = [
            TextField('Title', required=True),
            TextArea('Description'),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()
```

Run the Python file:

```
python example_form.py
```

Then visit http://127.0.0.1:5000/ to see the result.


# Documentation

Hosted on [Read the Docs](https://python-adminui.readthedocs.io/en/latest/index.html)


# Contributing and Development

This is a personal project. So please create issues to tell me what you need from this project.

You may also give stars to let me know if this project is worthy to invest more time on.

To work with the source code:

This project has a Typescript front-end and a Python backend.  
The front-end is in the `/src` folder.  
The back-end is in the `/python` folder.  
To start developing:

- cd into `/python` folder and run `pip install -r requirements.txt` to install requirements
- run one of the example_xxx.py file in the `/python` folder
- Open another terminal, run `npm install` & `npm start` at the root folder to start the frontend; 

Under this development mode, requests from front-end will forward to the backend.

When you are done with developing: 
- run `npm run build` will build the project. 

The front-end is based on the amazing [Ant Design Pro](https://pro.ant.design/docs/getting-started) library, you may consult their documentation during the development.

The Python backend is located in `/python/adminui`. It is Flask based. There are some examples in the `/python` folder.

# Release log for early preview

0.2.0: added authentication system