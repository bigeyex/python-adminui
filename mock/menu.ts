export default {
    'GET /api/main_menu': {
        menu: [
        {
            "path": "/",
            "name": "Home",
            "icon": "dashboard",
            "component": "./index",
            "children": [
            {
                "path": "/form",
                "name": "Form",
                "component": "./index"
            },
            {
                "path": "/table",
                "name": "Table",
                "component": "./index",
                "exact": true
            },
            {
                "path": "/detail",
                "name": "Detail",
                "component": "./index",
                "exact": true
            }
            ]
        }
        ]
    },
};
