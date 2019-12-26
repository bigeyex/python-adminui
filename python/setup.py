import setuptools

with open("../README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="adminui", # Replace with your own username
    version="0.1.4",
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
        'Flask'
    ],
    include_package_data = True,
    python_requires='>=3.6',
)