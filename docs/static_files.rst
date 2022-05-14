Serve Static Files
==================

If you have static files, like images, to serve, 
or you want to let the users access the upload folder, 
you can add more static path with::

    app.static_files = {'/upload': os.path.join(Path(__file__).parent.absolute(), 'upload')}

then the user can access the files in the upload folder (of the starting python file's path), 
with urls like ``/upload/...``. ``app.static_files`` takes a dictionary, with the key as the 
path in the URL, and the value as the path in your file system.