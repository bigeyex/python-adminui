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
                        "data": [
                            {
                                "callNo": 208,
                                "desc": "Description of Operation",
                                "id": 1,
                                "name": "Alpha",
                                "status": 1,
                                "updatedAt": "2019-12-16"
                            },
                            {
                                "callNo": 360,
                                "desc": "Description of Operation",
                                "id": 2,
                                "name": "Alpha",
                                "status": 1,
                                "updatedAt": "2019-12-26"
                            },
                            {
                                "callNo": 232,
                                "desc": "Description of Operation",
                                "id": 3,
                                "name": "Alpha",
                                "status": 2,
                                "updatedAt": "2019-12-3"
                            },
                            {
                                "callNo": 978,
                                "desc": "Description of Operation",
                                "id": 4,
                                "name": "Alpha",
                                "status": 2,
                                "updatedAt": "2019-12-1"
                            },
                            {
                                "callNo": 794,
                                "desc": "Description of Operation",
                                "id": 5,
                                "name": "Alpha",
                                "status": 3,
                                "updatedAt": "2019-12-26"
                            }
                        ],
                        "row_actions": [
                            {
                                "title": "Config",
                                "type": "Link",
                                "uuid": "e0265740-1e7f-11ea-a24d-f832e48a5c0e"
                            },
                            {
                                "title": "Subscribe",
                                "type": "Link",
                                "uuid": "e0265741-1e7f-11ea-b9ac-f832e48a5c0e"
                            }
                        ],
                        "table_actions": [
                            {
                                "style": "primary",
                                "title": "New",
                                "icon": "plus",
                                "type": "Button",
                                "uuid": "e0265742-1e7f-11ea-8e40-f832e48a5c0e"
                            },
                            {
                                "style": "",
                                "title": "New",
                                "icon": "plus",
                                "type": "Button",
                                "uuid": "e0265742-1e7f-11ea-8e40-f832e48a5c0e"
                            }
                        ],
                        "title": "Example Table",
                        "type": "TableList",
                        "uuid": "e0265743-1e7f-11ea-804d-f832e48a5c0e"
                    }
                ],
                "type": "Card",
                "uuid": "e0265744-1e7f-11ea-bfa1-f832e48a5c0e"
            }
        ],
        "name": "table"
    },

    'POST /api/page_action': {
        result: 'ok'
    }
};
