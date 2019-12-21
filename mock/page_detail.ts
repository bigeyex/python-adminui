export default {
    'GET /api/page_layout/detail': {
        "content": [
            {
                "content": [
                    {
                        "content": [
                            {
                                "title": "Ordre No.",
                                "type": "DetailItem",
                                "uuid": "a42d35ee-23d3-11ea-abb8-f832e48a5c0e",
                                "value": 1100000
                            },
                            {
                                "title": "Status",
                                "type": "DetailItem",
                                "uuid": "a42d35ef-23d3-11ea-bd2c-f832e48a5c0e",
                                "value": "Fetched"
                            },
                            {
                                "title": "Shipping No.",
                                "type": "DetailItem",
                                "uuid": "a42d35f0-23d3-11ea-9867-f832e48a5c0e",
                                "value": 1234567
                            },
                            {
                                "title": "Sub Order",
                                "type": "DetailItem",
                                "uuid": "a42d35f1-23d3-11ea-94ab-f832e48a5c0e",
                                "value": 1135456
                            }
                        ],
                        "title": "Refund Request",
                        "type": "DetailGroup",
                        "uuid": "a42d35f2-23d3-11ea-8c61-f832e48a5c0e"
                    },
                    {
                        "type": "Divider",
                        "uuid": "a42d35f3-23d3-11ea-a926-f832e48a5c0e"
                    },
                    {
                        "content": [
                            {
                                "title": "Name",
                                "type": "DetailItem",
                                "uuid": "a42d35f4-23d3-11ea-9757-f832e48a5c0e",
                                "value": "Alice"
                            },
                            {
                                "title": "Phone",
                                "type": "DetailItem",
                                "uuid": "a42d35f5-23d3-11ea-93d4-f832e48a5c0e",
                                "value": "555-123-4567"
                            },
                            {
                                "title": "Shipping Service",
                                "type": "DetailItem",
                                "uuid": "a42d35f6-23d3-11ea-8324-f832e48a5c0e",
                                "value": "Continent Ex"
                            },
                            {
                                "title": "Address",
                                "type": "DetailItem",
                                "uuid": "a42d35f7-23d3-11ea-b8f0-f832e48a5c0e",
                                "value": "XXX XXXX Dr. XX-XX, XXXXXX NY 12345"
                            },
                            {
                                "title": "Remarks",
                                "type": "DetailItem",
                                "uuid": "a42d35f8-23d3-11ea-a42f-f832e48a5c0e",
                                "value": "None"
                            }
                        ],
                        "title": "User Info",
                        "type": "DetailGroup",
                        "uuid": "a42d35f9-23d3-11ea-b3d6-f832e48a5c0e"
                    },
                    {
                        "type": "Divider",
                        "uuid": "a42d35fa-23d3-11ea-92cc-f832e48a5c0e"
                    },
                    {
                        "level": 1,
                        "text": "Header 1",
                        "type": "Header",
                        "uuid": "a42d35fb-23d3-11ea-87d9-f832e48a5c0e"
                    },
                    {
                        "level": 2,
                        "text": "Header 2",
                        "type": "Header",
                        "uuid": "a42d35fc-23d3-11ea-9a2a-f832e48a5c0e"
                    },
                    {
                        "level": 3,
                        "text": "Header 3",
                        "type": "Header",
                        "uuid": "a42d35fd-23d3-11ea-8d73-f832e48a5c0e"
                    },
                    {
                        "level": 4,
                        "text": "Header 4",
                        "type": "Header",
                        "uuid": "a42d35fe-23d3-11ea-826e-f832e48a5c0e"
                    },
                    {
                        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        "type": "Paragraph",
                        "uuid": "a42d35ff-23d3-11ea-a589-f832e48a5c0e"
                    }
                ],
                "type": "Card",
                "uuid": "a42d3600-23d3-11ea-afaf-f832e48a5c0e"
            }
        ],
        "name": "Detail Page"
    },

    'POST /api/page_action': {
        result: 'ok'
    }
};
