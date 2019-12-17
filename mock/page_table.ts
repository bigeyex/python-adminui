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
                                    "callNo": 301,
                                    "desc": "Description of Operation",
                                    "id": 1,
                                    "name": "Alpha",
                                    "status": 1,
                                    "updatedAt": "2019-12-17"
                                },
                                {
                                    "callNo": 206,
                                    "desc": "Description of Operation",
                                    "id": 2,
                                    "name": "Alpha",
                                    "status": 3,
                                    "updatedAt": "2019-12-28"
                                },
                                {
                                    "_actions": [
                                        "view"
                                    ],
                                    "callNo": 282,
                                    "desc": "Description of Operation",
                                    "id": 3,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-18"
                                },
                                {
                                    "_actions": [
                                        "view",
                                        "edit"
                                    ],
                                    "callNo": 838,
                                    "desc": "Description of Operation",
                                    "id": 4,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-16"
                                },
                                {
                                    "_actions": [],
                                    "callNo": 395,
                                    "desc": "Description of Operation",
                                    "id": 5,
                                    "name": "Alpha",
                                    "status": 0,
                                    "updatedAt": "2019-12-5"
                                }
                            ],
                            "pagination": {
                                "current": 1,
                                "pageSize": 5,
                                "total": 15
                            }
                        },
                        "row_actions": [
                            {
                                "id": "view",
                                "on_click": "693be031-1fdf-11ea-83f0-f832e48a5c0e",
                                "title": "View",
                                "type": "TableRowAction",
                                "uuid": "693be032-1fdf-11ea-b60c-f832e48a5c0e"
                            },
                            {
                                "id": "edit",
                                "on_click": "693be033-1fdf-11ea-8eaf-f832e48a5c0e",
                                "title": "Edit",
                                "type": "TableRowAction",
                                "uuid": "693be034-1fdf-11ea-8c64-f832e48a5c0e"
                            }
                        ],
                        "table_actions": [
                            {
                                "link_to": "/new_item",
                                "on_click": "693be035-1fdf-11ea-8f32-f832e48a5c0e",
                                "style": "primary",
                                "title": "New",
                                "type": "Button",
                                "uuid": "693be036-1fdf-11ea-8451-f832e48a5c0e"
                            }
                        ],
                        "title": "Example Table",
                        "type": "DataTable",
                        "uuid": "693be037-1fdf-11ea-8c6d-f832e48a5c0e"
                    }
                ],
                "type": "Card",
                "uuid": "693be038-1fdf-11ea-a657-f832e48a5c0e"
            }
        ],
        "name": "Table"
    },

    'POST /api/page_action': {
        result: 'ok'
    }
};
