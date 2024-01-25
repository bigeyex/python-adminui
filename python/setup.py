import setuptools

with open("./README_PIP.md", "r", encoding='utf-8') as fh:
    long_description = fh.read()

setuptools.setup(
    name="adminui", # Replace with your own username
    version="1.5.1",
    author="Yu Wang (bigeyex)",
    author_email="bigeyex@gmail.com",
    description="Write professional web interface with Python",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/bigeyex/python-adminui",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires=[      
        'aioflask==0.4.0',
        'asgiref==3.5.2',
        'click==8.1.3',
        'flask==2.1.0',
        'greenlet==1.1.3',
        'greenletio==0.9.0',
        'gunicorn==20.1.0',
        'h11==0.13.0',
        'importlib-metadata==4.12.0',
        'itsdangerous==2.1.2',
        'Jinja2==3.1.2',
        'MarkupSafe==2.1.1',
        'PyJWT==2.3.0',
        'python-multipart==0.0.5',
        'six==1.16.0',
        'uvicorn==0.18.0',
        'Werkzeug==2.3.8',
        'zipp==3.8.1'
    ],
    include_package_data = True,
    python_requires='>=3.6',
)
