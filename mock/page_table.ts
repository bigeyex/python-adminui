export default {
    'GET /api/page_layout/table': {
        "content": [
            {
                "content": [
                    {
                        "columns": [
                            {
                                "dataIndex": "name",
                                "title": "Rule Name"
                            },
                            {
                                "dataIndex": "desc",
                                "title": "Description"
                            },
                            {
                                "dataIndex": "callNo",
                                "title": "# of Calls"
                            },
                            {
                                "dataIndex": "status",
                                "title": "Status"
                            },
                            {
                                "dataIndex": "updatedAt",
                                "title": "Updated At"
                            }
                        ],
                        "data": {
                            "list": [
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 76,
                                    "desc": "Description of Operation",
                                    "id": 0,
                                    "name": "Alpha",
                                    "status": 3,
                                    "updatedAt": "2019-12-13"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 518,
                                    "desc": "Description of Operation",
                                    "id": 1,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-12"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 786,
                                    "desc": "Description of Operation",
                                    "id": 2,
                                    "name": "Alpha",
                                    "status": 3,
                                    "updatedAt": "2019-12-2"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 319,
                                    "desc": "Description of Operation",
                                    "id": 3,
                                    "name": "Alpha",
                                    "status": 1,
                                    "updatedAt": "2019-12-3"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 379,
                                    "desc": "Description of Operation",
                                    "id": 4,
                                    "name": "Alpha",
                                    "status": 3,
                                    "updatedAt": "2019-12-6"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 441,
                                    "desc": "Description of Operation",
                                    "id": 5,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-21"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 603,
                                    "desc": "Description of Operation",
                                    "id": 6,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-12"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 148,
                                    "desc": "Description of Operation",
                                    "id": 7,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-13"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 901,
                                    "desc": "Description of Operation",
                                    "id": 8,
                                    "name": "Alpha",
                                    "status": 3,
                                    "updatedAt": "2019-12-1"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 188,
                                    "desc": "Description of Operation",
                                    "id": 9,
                                    "name": "Alpha",
                                    "status": 2,
                                    "updatedAt": "2019-12-9"
                                }
                            ],
                            "pagination": {
                                "current": 1,
                                "pageSize": 10,
                                "total": 1000
                            }
                        },
                        "on_data": "ee851859-27d0-11ea-a31f-f832e48a5c0e",
                        "row_actions": [
                            {
                                "id": "edit",
                                "on_click": "ee851855-27d0-11ea-9c2c-f832e48a5c0e",
                                "title": "Edit",
                                "type": "TableRowAction",
                                "uuid": "138b42cd-27d1-11ea-8d4a-f832e48a5c0e"
                            }
                        ],
                        "table_actions": [
                            {
                                "on_click": "ee851857-27d0-11ea-b7ff-f832e48a5c0e",
                                "style": "primary",
                                "title": "New",
                                "type": "Button",
                                "uuid": "138b42ce-27d1-11ea-a878-f832e48a5c0e"
                            }
                        ],
                        "title": "Example Table",
                        "type": "DataTable",
                        "uuid": "138b42cf-27d1-11ea-a2ec-f832e48a5c0e"
                    }
                ],
                "type": "Card",
                "uuid": "138b42d0-27d1-11ea-ab0d-f832e48a5c0e"
            }
        ],
        "name": "Table"
    },

    'POST /api/page_action': {
        result: 'ok'
    }
};
