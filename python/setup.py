import setuptools

with open("./README_PIP.md", "r", encoding='utf-8') as fh:
    long_description = fh.read()

setuptools.setup(
    name="adminui", # Replace with your own username
    version="1.4.3",
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
        'Flask',
        'PyJWT',
        'werkzeug' 
    ],
    include_package_data = True,
    python_requires='>=3.6',
)